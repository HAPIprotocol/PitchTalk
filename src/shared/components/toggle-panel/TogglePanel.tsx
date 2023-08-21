import { EPitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { Dispatch, SetStateAction } from 'react';

import { EEventsView } from 'pages/calendar-page/constants';
import { ERatingToken, ERatingBy } from 'pages/rating-page/constants';
import {
  EClaimAndVestingView,
  EEventsByTime,
  EInvestmentsView,
  EPitchesType,
  EProjectSettingsState,
  Either,
  IToggleButtonConfig,
} from 'shared/interfaces';

import { Translate } from '../translate/Translate';

interface ITogglePanel<T> {
  buttons: IToggleButtonConfig<T>[];
  containerStyles: string;
  buttonStyles: string;
  handler: Dispatch<SetStateAction<T>>;
  toggleValue: T;
}

type TogglePanelProps = Either<
  ITogglePanel<EPitchType>,
  | ITogglePanel<EEventsView>
  | ITogglePanel<EInvestmentsView>
  | ITogglePanel<EClaimAndVestingView>
  | ITogglePanel<EPitchesType>
  | ITogglePanel<EProjectSettingsState>
  | ITogglePanel<ERatingToken>
  | ITogglePanel<ERatingBy>
  | ITogglePanel<EEventsByTime>
>;

export const TogglePanel: React.FC<TogglePanelProps> = ({
  buttons,
  containerStyles,
  buttonStyles,
  handler,
  toggleValue,
}) => {
  return (
    <div className={containerStyles}>
      {buttons.map(({ label, value }) => {
        return (
          <button
            key={label}
            className={buttonStyles}
            disabled={value === toggleValue}
            onClick={() => handler(value as never)}
          >
            <Translate value={label} />
          </button>
        );
      })}
    </div>
  );
};
