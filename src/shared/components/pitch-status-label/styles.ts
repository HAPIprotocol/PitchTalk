import { EPitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { getPitchStatusColor, IAppTheme } from 'shared/styles/theme';

interface IPitchStatusLabel {
  stage: EPitchType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyles = createUseStyles<any, IPitchStatusLabel, IAppTheme>(
  () => ({
    pitchStatusLabel: {
      height: '18px',
      padding: '2px 6px',
      borderRadius: '4px',
      width: 'fit-content',
      background: ({ stage }) => getPitchStatusColor[stage],
      color: 'white',
      fontSize: '0.725rem',
      fontFamily: 'Everett-Medium',
      [MAX_WIDTH_767]: {
        height: '14px',
        padding: '2px 4px',
        marginTop: '1px',
        fontSize: '0.525rem',
        marginLeft: '8px',
      },
    },
  })
);
