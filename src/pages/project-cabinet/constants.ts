import { MutableRefObject } from 'react';

import { EProjectSettingsState, IToggleButtonConfig } from 'shared/interfaces';

export const SETTINGS_TOGGLE: IToggleButtonConfig<EProjectSettingsState>[] = [
  { label: 'controls.edit', value: EProjectSettingsState.EDIT },
  { label: 'controls.view', value: EProjectSettingsState.VIEW },
];

export enum EVestingSettingsTooltips {
  TYPE = 'VESTING_TYPE',
  START_DATE = 'START_VESTING_DATE',
  END_DATE = 'END_VESTING_DATE',
  PRICE = 'VESTING_PRICE',
  INVEST_END_DATE = 'INVEST_END_DATE',
  INVESTMENT_MIN = 'INVESTMENT_MIN',
  INVESTMENT_MAX = 'INVESTMENT_MAX',
  INVESTMENT_TOTAL = 'INVESTMENT_TOTAL',
}

export enum EGeneralSettingsTooltips {
  BANNER_IMG_SIZE = 'BANNER_IMG_SIZE',
  LOGO_IMG_SIZE = 'LOGO_IMG_SIZE',
  PROJECT_URL_EXAMPLE = 'PROJECT_URL_EXAMPLE',
}

export enum ETeamSettingsTooltips {
  TEAM_MEMBER_LOGO_SIZE = 'TEAM_MEMBER_LOGO_SIZE',
}

export type ProjectCabinetState = {
  generalState: (value: EProjectSettingsState) => void;
  pitchesState: (value: EProjectSettingsState) => void;
  finState: (value: EProjectSettingsState) => void;
  teamState: (values: EProjectSettingsState) => void;
};

export type ProjectCabinetStateRefs = MutableRefObject<ProjectCabinetState>;
