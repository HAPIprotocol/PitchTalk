import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';

export const useStyles = createUseStyles(() => ({
  tablet: {
    position: 'relative',
    width: 'fit-content',
    height: 'fit-content',
  },
  tabletLeft: {
    composes: '$tablet',
    [MAX_WIDTH_767]: { transform: 'rotate(270deg)' },
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translate(0, -50%)',
    [MAX_WIDTH_1439]: { left: '9px', width: '25px', height: '25px' },
    [MAX_WIDTH_1239]: { left: '9px', width: '18px', height: '18px' },
    [MAX_WIDTH_767]: { left: '9px' },
  },
  tabletContent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px 63px 30px 62px',
    [MAX_WIDTH_1439]: { padding: '19px 47px 25px 48px' },
    [MAX_WIDTH_1239]: { padding: '14px 35px 19px 35px' },
  },
  tabletContentLeft: {
    composes: '$tabletContent',
    [MAX_WIDTH_767]: { padding: '12px 31px 17px 31px' },
  },
  tabletRightImages: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '32px',
    [MAX_WIDTH_1439]: {
      gap: '24px',
      '& > img': { width: '276px', height: '134px' },
    },
    [MAX_WIDTH_1239]: {
      gap: '18px',
      '& > img': { width: '202px', height: '98px' },
    },
    [MAX_WIDTH_767]: {
      gap: '14px',
      '& > img': { width: '164px', height: '79px' },
    },
  },
}));
