import { EInvestmentsView, IToggleButtonConfig } from 'shared/interfaces';

export const investmentsToggleConfig: IToggleButtonConfig<EInvestmentsView>[] =
  [
    {
      label: 'investPanel.total',
      value: EInvestmentsView.TOTAL,
    },
    {
      label: 'investPanel.byUser',
      value: EInvestmentsView.BY_USER,
    },
  ];
