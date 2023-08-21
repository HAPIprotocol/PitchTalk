import { EPitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';

export enum ProjectPitches {
  INTRO = 'intro_pitch',
  UPDATE = 'update_pitch',
  INVEST = 'investors_pitch',
}

export const STAGE_TO_PITCH_MAP: { [key in EPitchType]: ProjectPitches } = {
  [EPitchType.Initial]: ProjectPitches.INTRO,
  [EPitchType.Intro]: ProjectPitches.INTRO,
  [EPitchType.Update]: ProjectPitches.UPDATE,
  [EPitchType.Investment]: ProjectPitches.INVEST,
};
