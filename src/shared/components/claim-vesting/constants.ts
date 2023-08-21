import { EClaimAndVestingView, IToggleButtonConfig } from 'shared/interfaces';

export const claimAndVestingConfig: IToggleButtonConfig<EClaimAndVestingView>[] =
  [
    {
      label: 'claim.claimBtn',
      value: EClaimAndVestingView.CLAIM,
    },
    {
      label: 'vesting.vestingBtn',
      value: EClaimAndVestingView.VESTING,
    },
  ];
