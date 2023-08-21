import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

type StyleProps = {
  isProjectActive: boolean;
  isOnChainProject: boolean;
};

export const useStyles = createUseStyles<string, StyleProps, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      marginBottom: '95px',
      [MAX_WIDTH_1439]: { marginBottom: '77px' },
      [MAX_WIDTH_1239]: { marginBottom: '67px' },
      [MAX_WIDTH_767]: { marginBottom: '57px' },
    },
    infoHeader: {
      height: '111px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '112px',
      [MAX_WIDTH_1439]: { height: '85px', marginBottom: '83px' },
      [MAX_WIDTH_1239]: { marginBottom: '65px' },
      [MAX_WIDTH_767]: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 'unset',
        marginBottom: '53px',
      },
    },
    projectLogoWrapper: {
      display: 'flex',
      alignItems: 'center',
      '& h3': {
        color: theme.colors.white,
        maxWidth: '350px',
        fontSize: '3.035rem',
        lineHeight: '3.46rem',
        margin: 0,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        [MAX_WIDTH_1439]: {
          maxWidth: '300px',
          fontSize: '2.45rem',
          lineHeight: '2.8rem',
        },
        [MAX_WIDTH_1239]: {
          maxWidth: '300px',
          fontSize: '2rem',
          lineHeight: '2.45rem',
        },
        [MAX_WIDTH_767]: {
          maxWidth: 'calc(100% - 60px - 40px)',
          fontSize: '1.7rem',
          lineHeight: '2rem',
        },
      },
      [MAX_WIDTH_767]: {
        width: '100%',
        maxWidth: '427px',
        marginBottom: '20px',
      },
    },
    projectLogo: {
      maxWidth: '100px',
      maxHeight: '100px',
      marginRight: '50px',
      padding: '3px',
      [MAX_WIDTH_1439]: {
        maxWidth: '80px',
        maxHeight: '80px',
        marginRight: '40px',
      },
      [MAX_WIDTH_1239]: {
        maxWidth: '70px',
        maxHeight: '70px',
        marginRight: '35px',
      },
      [MAX_WIDTH_767]: {
        maxWidth: '60px',
        maxHeight: '60px',
        marginRight: '30px',
      },
    },
    activationBtn: {
      alignSelf: 'flex-end',
      '& button': {
        width: '275px',
        height: '50px',
        fontSize: '0.875rem',
        lineHeight: '1.14rem',
        fontWeight: 400,
        color: ({ isProjectActive }) =>
          isProjectActive ? theme.colors.lightDark : theme.colors.white,
        background: ({ isProjectActive }) =>
          isProjectActive ? theme.colors.failed : theme.colors.btnSuccess,
        '&:hover, &:active': {
          color: ({ isProjectActive }) =>
            isProjectActive ? theme.colors.lightDark : theme.colors.white,
          background: ({ isProjectActive }) =>
            isProjectActive ? theme.colors.failed : theme.colors.btnSuccess,
        },
      },
      [MAX_WIDTH_1439]: {
        '& button': {
          width: '225px',
          height: '40px',
          fontSize: '0.71rem',
          lineHeight: '0.923rem',
        },
      },
      [MAX_WIDTH_1239]: {
        '& button': {
          width: '190px',
          height: '35px',
          fontSize: '0.65rem',
          lineHeight: '0.85rem',
        },
      },
    },
    blocksContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      [MAX_WIDTH_1239]: { gap: '18px' },
      [MAX_WIDTH_767]: {
        flexWrap: 'wrap',
        gap: 'unset',
      },
    },
    balancesBoxWrapper: {
      width: '440px',
      [MAX_WIDTH_1439]: { width: '357px' },
      [MAX_WIDTH_1239]: { minWidth: '300px' },
      [MAX_WIDTH_767]: { width: '100%' },
    },
    transfersBoxWrapper: {
      marginTop: '96px',
      [MAX_WIDTH_1439]: { marginTop: '77px' },
      [MAX_WIDTH_1239]: { marginTop: '47px' },
    },
    logBoxWrapper: {
      width: ({ isOnChainProject }) => (isOnChainProject ? 'unset' : '100%'),
      [MAX_WIDTH_767]: {
        width: () => '100%',
        marginTop: '47px',
      },
    },
    resetInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.white,
      marginBottom: '50px',
    },
    resetInfo: {
      fontSize: '1.5rem',
      textAlign: 'center',
      [MAX_WIDTH_1239]: {
        fontSize: '1.25rem',
      },
    },
  })
);
