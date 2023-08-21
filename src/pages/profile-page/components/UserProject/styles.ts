import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

type StylesProps = { banner: string };

export const useStyles = createUseStyles<string, StylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      rowGap: '28px',
      marginBottom: '63px',
      color: theme.colors.white,
      [MAX_WIDTH_1439]: { rowGap: '28px', marginBottom: '53px' },
      [MAX_WIDTH_1239]: { rowGap: '24px', marginBottom: '43px' },
      [MAX_WIDTH_767]: { rowGap: '20px', marginBottom: '33px' },
    },
    title: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.white,
      '& h5': {
        fontSize: '2.25rem',
        lineHeight: '2.7rem',
        margin: 0,
      },
      [MAX_WIDTH_1439]: {
        '& h5': { fontSize: '2.25rem', lineHeight: '2.7rem' },
      },
      [MAX_WIDTH_1239]: {
        '& h5': { fontSize: '1.75rem', lineHeight: '2.1rem' },
      },
      [MAX_WIDTH_767]: {
        '& h5': { fontSize: '1.15rem', lineHeight: '1.65rem' },
      },
    },
    line: {
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: theme.colors.white,
      marginLeft: '63px',
      flex: 1,
      [MAX_WIDTH_1439]: { marginLeft: '53px' },
      [MAX_WIDTH_1239]: { borderWidth: '0.25px', marginLeft: '43px' },
      [MAX_WIDTH_767]: { marginLeft: '33px' },
    },
    bottomLine: {
      composes: '$line',
      display: 'flex',
      width: '100%',
      marginLeft: 0,
    },
    projectContainer: {
      position: 'relative',
      zIndex: 0,
      width: '100%',
      height: '271px',
      padding: '40px 28px',
      [MAX_WIDTH_1439]: { height: '251px', padding: '30px 24px' },
      [MAX_WIDTH_1239]: { height: '201px', padding: '25px 20px' },
      [MAX_WIDTH_767]: { height: '111px', padding: '8px 8px' },
      '&:before': {
        top: '0px',
        left: '0px',
        width: '100%',
        filter: 'grayscale(15%) brightness(0.6)',
        height: '100%',
        content: '""',
        position: 'absolute',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: (props) => `url(${props?.banner})`,
      },
    },
    projectInnerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      columnGap: '100px',
      height: '100%',
      position: 'relative',
      zIndex: '1',
      [MAX_WIDTH_1439]: { columnGap: '80px' },
      [MAX_WIDTH_1239]: { columnGap: '50px' },
      [MAX_WIDTH_767]: { columnGap: '10px' },
    },
    projectInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    projectLogoInfo: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '10px',

      '& > img': {
        maxWidth: '80px',
        maxHeight: '80px',
        minWidth: '80px',
        minHeight: '80px',
        objectFit: 'contain',
      },
      '& > h5': {
        width: '240px',
        margin: 0,
        fontSize: '2.485rem',
        lineHeight: '2.83rem',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 4,
      },
      [MAX_WIDTH_1439]: {
        '& img': {
          maxWidth: '65px',
          maxHeight: '65px',
          minWidth: '65px',
          minHeight: '65px',
        },
        '& h5': { width: '200px', fontSize: '2rem', lineHeight: '2.53rem' },
      },
      [MAX_WIDTH_1239]: {
        '& img': {
          maxWidth: '45px',
          maxHeight: '45px',
          minWidth: '45px',
          minHeight: '45px',
        },
        '& h5': { width: '130px', fontSize: '1.5rem', lineHeight: '2.33rem' },
      },
      [MAX_WIDTH_767]: {
        '& img': {
          maxWidth: '30px',
          maxHeight: '30px',
          minWidth: '30px',
          minHeight: '30px',
        },
        '& h5': {
          width: '174px',
          fontSize: '0.8rem',
          lineHeight: '1.2rem',
          WebkitLineClamp: 1,
        },
      },
    },
    createdAt: {
      color: theme.colors.lightGrey,
      fontSize: '0.81rem',
      lineHeight: '1.055rem',
      [MAX_WIDTH_1439]: { fontSize: '0.71rem', lineHeight: '1.055rem' },
      [MAX_WIDTH_1239]: { fontSize: '0.61rem', lineHeight: '0.9rem' },
      [MAX_WIDTH_767]: {
        fontSize: '0.5rem',
        lineHeight: '0.8rem',
      },
    },
    description: {
      maxWidth: '240px',
      margin: 0,
      fontSize: '0.875rem',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 9,
      [MAX_WIDTH_1439]: {
        maxWidth: '200px',
        fontSize: '0.8rem',
      },
      [MAX_WIDTH_1239]: {
        maxWidth: '120px',
        fontSize: '0.65rem',
        WebkitLineClamp: 6,
      },
      [MAX_WIDTH_767]: {
        maxWidth: '155px',
        WebkitLineClamp: 4,
        fontSize: '0.55rem',
      },
    },
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [MAX_WIDTH_767]: {
        marginBottom: '4px',
      },
    },
    socialLink: {
      margin: '0 5px',
      width: '20px',
      height: '20px',
      '&:last-child': {
        marginRight: 0,
      },
      '&:first-child': {
        marginLeft: 0,
        width: '17px',
        height: '17px',
      },
      '&:hover': {
        '& path': {
          fill: theme.colors.secondaryDark,
        },
        cursor: 'pointer',
      },
      [MAX_WIDTH_1439]: {
        width: '18px',
        height: '18px',
        '&:first-child': {
          width: '16px',
          height: '16px',
        },
      },
      [MAX_WIDTH_1239]: {
        width: '15px',
        height: '15px',
        '&:first-child': {
          width: '13px',
          height: '13px',
        },
      },
      [MAX_WIDTH_767]: {
        margin: '0 4px',
        width: '9px',
        height: '9px',
        '&:first-child': {
          width: '8px',
          height: '8px',
        },
      },
    },
    tokenInfo: {
      '& label': {
        fontSize: '0.875rem',
        lineHeight: '1.225rem',
        marginBottom: '8px',
      },
      [MAX_WIDTH_1439]: {
        '& label': {
          fontSize: '0.8rem',
          lineHeight: '0.975rem',
          marginBottom: '6px',
        },
      },
      [MAX_WIDTH_1239]: {
        '& label': {
          fontSize: '0.65rem',
          lineHeight: '0.75rem',
          marginBottom: '5px',
        },
      },
      [MAX_WIDTH_767]: {
        '& label': {
          fontSize: '0.45rem',
          lineHeight: '0.55rem',
          marginBottom: '4px',
        },
      },
    },
    tokenData: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '1.9rem',
      lineHeight: '2.645rem',
      '& img': { width: '33px', height: '33px', marginLeft: '7px' },
      [MAX_WIDTH_1439]: {
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        '& img': { width: '26px', height: '26px', marginLeft: '5px' },
      },
      [MAX_WIDTH_1239]: {
        fontSize: '1.15rem',
        lineHeight: '1.35rem',
        '& img': { width: '18px', height: '18px', marginLeft: '4px' },
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.8rem',
        lineHeight: '0.8rem',
        '& img': {
          width: '14px',
          height: '14px',
          marginLeft: '4px',
          marginBottom: '2px',
        },
      },
    },
    editBtn: {
      width: '100%',
      '& button': {
        width: '190px',
        height: '46px',
        fontSize: '1.05rem',
      },
      [MAX_WIDTH_1439]: {
        '& button': {
          width: '170px',
          height: '42px',
          fontSize: '0.95rem',
        },
      },
      [MAX_WIDTH_1239]: {
        '& button': {
          width: '150px',
          height: '38px',
          fontSize: '0.85rem',
        },
      },
      [MAX_WIDTH_767]: {
        '& button': {
          width: '100%',
          height: '24px',
          lineHeight: 'unset',
          fontSize: '0.55rem',
          padding: '4px',
        },
      },
    },
    mobileProjectInfo: {
      composes: '$projectInfo',
      width: 'calc(100% - 95px)',
    },
    mobileInfoWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    mobileInfoWrapperSocial: {
      composes: '$mobileInfoWrapper',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '205px',
    },
  })
);
