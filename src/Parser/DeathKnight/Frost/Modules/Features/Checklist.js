import React from 'react';

import SPELLS from 'common/SPELLS';

import SpellLink from 'common/SpellLink';

import CoreChecklist, { Rule, Requirement } from 'Parser/Core/Modules/Features/Checklist';
import Abilities from 'Parser/Core/Modules/Abilities';
import { PreparationRule } from 'Parser/Core/Modules/Features/Checklist/Rules';
import { GenericCastEfficiencyRequirement } from 'Parser/Core/Modules/Features/Checklist/Requirements';
import CastEfficiency from 'Parser/Core/Modules/CastEfficiency';
import PrePotion from 'Parser/Core/Modules/Items/PrePotion';
import EnchantChecker from 'Parser/Core/Modules/Items/EnchantChecker';

import AlwaysBeCasting from './AlwaysBeCasting';
import RunicPowerDetails from '../RunicPower/RunicPowerDetails';
import RuneTracker from './RuneTracker';

class Checklist extends CoreChecklist {
  static dependencies = {
    abilities: Abilities,
    castEfficiency: CastEfficiency,
    prePotion: PrePotion,
    alwaysBeCasting: AlwaysBeCasting,
    enchantChecker: EnchantChecker,
    runicPowerDetails: RunicPowerDetails,
    runeTracker: RuneTracker,
  };

  rules = [
    new Rule({
      name: 'Use cooldowns as often as possible',
      description: 'You should aim to use your cooldowns as often as you can to maximize your damage output',
      requirements: () => {
        const combatant = this.selectedCombatant;
        return [
            new GenericCastEfficiencyRequirement({
              spell: SPELLS.PILLAR_OF_FROST,
            }),
            new GenericCastEfficiencyRequirement({
              spell: SPELLS.BREATH_OF_SINDRAGOSA_TALENT,
              when: combatant.hasTalent(SPELLS.BREATH_OF_SINDRAGOSA_TALENT.id),
            }),
            new GenericCastEfficiencyRequirement({
              spell: SPELLS.EMPOWER_RUNE_WEAPON,
            }),
          ];
      },
    }),
    new Rule({
      name: 'Try to avoid being inactive for a large portion of the fight',
      description: <React.Fragment>While some downtime is inevitable in fights with movement, you should aim to reduce downtime to prevent capping Runes.  In a worst case scenario, you can cast <SpellLink id={SPELLS.HOWLING_BLAST.id} /> to prevent Rune capping</React.Fragment>,
      requirements: () => {
        return [
          new Requirement({
            name: 'Downtime',
            check: () => this.alwaysBeCasting.downtimeSuggestionThresholds,
          }),
        ];
      },
    }),
    new Rule({
      name: 'Avoid capping Runic Power',
      description: <React.Fragment>Death Knights are a resource based class, relying on Runes and Runic Power to cast core abilities.  Cast <SpellLink id={SPELLS.FROST_STRIKE_CAST.id} /> when you have 80 or more Runic Power to avoid overcapping.</React.Fragment>,
      requirements: () => {
        return [
          new Requirement({
            name: 'Runic Power Efficiency',
            check: () => this.runicPowerDetails.efficiencySuggestionThresholds,
          }),
        ];
      },
    }),
    new Rule({
      name: 'Avoid capping Runes',
      description: 'Death Knights are a resource based class, relying on Runes and Runic Power to cast core abilities.  You can have up to three runes recharging at once.  You want to dump runes whenever you have 4 or more runes to make sure none are wasted',
      requirements: () => {
        return [
          new Requirement({
            name: 'Rune Efficiency',
            check: () => this.runeTracker.suggestionThresholdsEfficiency,
          }),
        ];
      },
    }),
    new PreparationRule(),
  ]
}

export default Checklist;
