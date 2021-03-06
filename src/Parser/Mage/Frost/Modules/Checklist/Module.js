import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';
import CastEfficiency from 'Parser/Core/Modules/CastEfficiency';
import Combatants from 'Parser/Core/Modules/Combatants';
import PreparationRuleAnalyzer from 'Parser/Core/Modules/Features/Checklist2/PreparationRuleAnalyzer';

import BoneChilling from '../Features/BoneChilling';
import BrainFreeze from '../Features/BrainFreeze';
import GlacialSpike from '../Features/GlacialSpike';
import IceLance from '../Features/IceLance';
import ThermalVoid from '../Features/ThermalVoid';
import WintersChill from '../Features/WintersChill';
import WintersReach from '../Traits/WintersReach';
import AlwaysBeCasting from '../Features/AlwaysBeCasting';
import ArcaneIntellect from '../../../Shared/Modules/Features/ArcaneIntellect';
import CancelledCasts from '../../../Shared/Modules/Features/CancelledCasts';
import RuneOfPower from '../../../Shared/Modules/Features/RuneOfPower';

import Component from './Component';

class Checklist extends Analyzer {
  static dependencies = {
    combatants: Combatants,
    castEfficiency: CastEfficiency,
    boneChilling: BoneChilling,
    brainFreeze: BrainFreeze,
    glacialSpike: GlacialSpike,
    iceLance: IceLance,
    thermalVoid: ThermalVoid,
    wintersChill: WintersChill,
    wintersReach: WintersReach,
    arcaneIntellect: ArcaneIntellect,
    cancelledCasts: CancelledCasts,
    runeOfPower: RuneOfPower,
    alwaysBeCasting: AlwaysBeCasting,
    preparationRuleAnalyzer: PreparationRuleAnalyzer,
  };

  render() {
    return (
      <Component
        combatant={this.combatants.selected}
        castEfficiency={this.castEfficiency}
        thresholds={{
          ...this.preparationRuleAnalyzer.thresholds,
          
          downtimeSuggestionThresholds: this.alwaysBeCasting.downtimeSuggestionThresholds,
          boneChillingUptime: this.boneChilling.suggestionThresholds,
          brainFreezeUtilization: this.brainFreeze.utilSuggestionThresholds,
          brainFreezeOverwrites: this.brainFreeze.overwriteSuggestionThresholds,
          brainFreezeGlacialOverwrite: this.brainFreeze.glacialSpikeOverwriteSuggestionThresholds,
          brainFreezeExpired: this.brainFreeze.expiredSuggestionThresholds,
          brainFreezeUnbuffedFlurry: this.brainFreeze.flurryWithoutProcSuggestionThresholds,
          glacialSpikeUtilization: this.glacialSpike.utilSuggestionThresholds,
          fingersOfFrostUtilization: this.iceLance.fingersUtilSuggestionThresholds,
          iceLanceNotShattered: this.iceLance.nonShatteredSuggestionThresholds,
          thermalVoidDuration: this.thermalVoid.suggestionThresholds,
          wintersChillIceLance: this.wintersChill.iceLanceUtilSuggestionThresholds,
          wintersChillHardCasts: this.wintersChill.hardcastUtilSuggestionThresholds,
          wintersReachUtilization: this.wintersReach.procUtilizationThresholds,
          arcaneIntellectUptime: this.arcaneIntellect.suggestionThresholds,
          cancelledCasts: this.cancelledCasts.suggestionThresholds,
          runeOfPowerBuffUptime: this.runeOfPower.roundedSecondsSuggestionThresholds,
        }}
      />
    );
  }
}

export default Checklist;