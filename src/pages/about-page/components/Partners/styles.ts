import { createUseStyles } from 'react-jss';

import { textWithGradient } from 'pages/about-page/styles';
import {
  EDimensions,
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

const IMAGE_WIDTH_TO_DIMENSION_PX: { [key in EDimensions]: number } = {
  [EDimensions.DESKTOP]: 120,
  [EDimensions.LAPTOP]: 100,
  [EDimensions.MEDIUM]: 80,
  [EDimensions.SMALL]: 80,
  [EDimensions.UNKNOWN]: 80,
};

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100vw',
    marginBlock: '0px 40px',
  },
  title: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    fontWeight: '500',
    fontFamily: theme.fonts.Everett.Regular,
    textTransform: 'uppercase',
    textAlign: 'center',
    userSelect: 'none',
    margin: '100px auto 60px',
    maxWidth: '1130px',
    ...textWithGradient,
    [MAX_WIDTH_1439]: {
      fontSize: '4.631rem',
      lineHeight: '4.313rem',
      maxWidth: '875px',
      marginBlock: '77px 46px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '2.746rem',
      lineHeight: '2.575rem',
      maxWidth: '520px',
      marginBlock: '48px 28px',
    },
    [MAX_WIDTH_767]: { maxWidth: '280px' },
  },
  partnersContainer: {
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: 'repeat(19, 1fr)',
    width: '100%',
    [MAX_WIDTH_767]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
    },
  },
  partnerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    border: ['1px', 'solid', theme.colors.lightGrey],
    // FIRST ROW
    '&:nth-child(1)': { gridColumn: '1 / 4', borderLeft: 'unset' },
    '&:nth-child(2)': { gridColumn: '4 / 8' },
    '&:nth-child(3)': { gridColumn: '8 / 12' },
    '&:nth-child(4)': { gridColumn: '12 / 16' },
    '&:nth-child(5)': { gridColumn: '16 / 20', borderRight: 'unset' },
    // SECOND ROW
    '&:nth-child(6)': { gridColumn: '1 / 5', borderLeft: 'unset' },
    '&:nth-child(7)': { gridColumn: '5 / 10' },
    '&:nth-child(8)': { gridColumn: '10 / 15' },
    '&:nth-child(9)': { gridColumn: '15 / 20', borderRight: 'unset' },
    [MAX_WIDTH_767]: {
      '&:nth-child(1n)': {
        gridColumn: 'unset',
        border: ['0.25px', 'solid', theme.colors.lightGrey],
      },
      '&:nth-child(3n)': { borderRight: 'unset' },
      '&:nth-child(1), &:nth-child(4), &:nth-child(7)': { borderLeft: 'unset' },

      '&:nth-child(5)': {
        borderRight: ['0.25px', 'solid', theme.colors.lightGrey],
      },
      '&:nth-child(6)': {
        borderLeft: ['0.25px', 'solid', theme.colors.lightGrey],
      },
    },
  },
  partnerItemImg: {
    width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.DESKTOP],
    height: 130,
    marginBlock: '15px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [MAX_WIDTH_1439]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.LAPTOP],
      height: 110,
      marginBlock: '10px',
    },
    [MAX_WIDTH_1239]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.MEDIUM],
      height: 100,
    },

    [MAX_WIDTH_767]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.SMALL],
      height: 90,
    },
  },
}));
