import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  participateButtonsWrapper: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '10px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      marginBlock: '10px',
    },
  },
  participateBtn: {
    '& button': {
      width: '180px',
      height: '50px',
      fontSize: '0.875rem',
      padding: '0px 22px',
      '& span': { fontFamily: theme.fonts.Everett.Light },
    },
    [MAX_WIDTH_1439]: {
      '& button': {
        padding: '0px 19px',
        width: '160px',
        height: '50px',
        fontSize: '0.85rem',
      },
    },
    [MAX_WIDTH_1239]: {
      '& button': {
        padding: '0px 12px',
        width: '130px',
        height: '40px',
        fontSize: '0.775rem',
      },
    },
    [MAX_WIDTH_767]: {
      '& button': {
        padding: '0px 10px',
        width: '120px',
        height: '35px',
        fontSize: '0.725rem',
      },
    },
  },
  participateBtnReferee: {
    composes: '$participateBtn',
    '& button': {
      background: 'transparent',
      border: ['1px', 'solid', theme.colors.secondaryDark],
      '&:hover, &:active': {
        background: 'transparent',
      },
      '&:disabled': {
        border: 'none',
      },
    },
  },
  participated: {
    composes: '$participateBtn',

    '& button': {
      cursor: 'default',
      background: 'transparent',
      border: ['1px', 'solid', theme.colors.secondaryDark],
      '&:hover, &:active': {
        background: 'transparent',
        scale: 1,
      },
      width: '200px',
    },
  },
}));
