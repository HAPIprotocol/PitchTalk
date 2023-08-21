import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyles = createUseStyles<any, { banner?: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      display: 'flex',
      flex: 1,
      position: 'relative',
      padding: '32px 42px 42px',
      minHeight: '306px',
      maxHeight: '306px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: (props) =>
          props?.banner ? `url(${props?.banner})` : `url(${projectFrame})`,
        filter: 'grayscale(15%) brightness(0.6)',
      },

      [MAX_WIDTH_1439]: {
        padding: '30px 42px 38px 38px',
        minHeight: '271px',
        maxHeight: '271px',
      },
      [MAX_WIDTH_1239]: {
        padding: '20px 24px 25px 20px',
        minHeight: '181px',
        maxHeight: '181px',
      },
      [MAX_WIDTH_767]: {
        padding: '14px 14px 14px 16px',
        minHeight: '130px',
        maxHeight: '306px',
      },
    },

    titleRow: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      '& > label': { cursor: 'pointer' },
    },
    eventTitle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: 'calc(100% - 200px)',
      [MAX_WIDTH_1439]: {
        maxWidth: 'calc(100% - 178px)',
      },
      [MAX_WIDTH_1239]: {
        maxWidth: 'calc(100% - 102px)',
      },
      [MAX_WIDTH_767]: {
        maxWidth: 'calc(100% - 60px)',
      },
    },
    eventName: {
      width: '100%',
      fontSize: '2.75rem',
      marginBottom: '1.125rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      [MAX_WIDTH_1439]: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '1.75rem',
        marginBottom: '0.65rem',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.75rem',
        marginBottom: '0.25rem',
      },
    },
    speakerName: {
      width: '100%',
      fontSize: '1.25rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      [MAX_WIDTH_1439]: {
        fontSize: '1.125rem',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.75rem',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.375rem',
      },
    },
    status: {
      alignSelf: 'flex-start',
    },

    statusTag: {
      height: '52px',
      width: '190px',
      padding: '14px',
      fontSize: '1.125rem',
      textAlign: 'center',
      [MAX_WIDTH_1439]: {
        height: '46px',
        width: '168px',
        padding: '13px',
        fontSize: '1rem',
      },
      [MAX_WIDTH_1239]: {
        height: '30px',
        width: '92px',
        padding: '9px',
        fontSize: '0.75rem',
      },
      [MAX_WIDTH_767]: {
        height: '16px',
        width: '42px',
        padding: '3px',
        fontSize: '0.5rem',
      },
    },

    footerRaw: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      position: 'relative',
      [MAX_WIDTH_767]: {
        flexWrap: 'wrap',
      },
    },
    eventDate: {
      width: '50%',
      fontSize: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        width: '46px',
        height: '46px',
        marginRight: 32,
      },
      [MAX_WIDTH_1439]: {
        fontSize: '1.125rem',
        '& svg': {
          width: '41px',
          height: '41px',
          marginRight: 30,
        },
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.625rem',
        '& svg': {
          width: '22px',
          height: '22px',
          marginRight: 16,
        },
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.375rem',
        '& svg': {
          width: '8px',
          height: '8px',
          marginRight: 9,
        },
      },
    },
    eventToken: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.125rem',
      width: '50%',
      [MAX_WIDTH_1439]: {
        fontSize: '1.875rem',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '1rem',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.75rem',
      },
      '& img': {
        width: '38px',
        height: '38px',
        marginRight: '8px',
        [MAX_WIDTH_1439]: {
          width: '33px',
          height: '33px',
          marginRight: '7px',
        },
        [MAX_WIDTH_1239]: {
          width: '18px',
          height: '18px',
          marginRight: '4px',
        },
        [MAX_WIDTH_767]: {
          width: '14px',
          height: '14px',
          marginRight: '3px',
        },
      },
    },
    eventSocials: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      [MAX_WIDTH_767]: {
        justifyContent: 'flex-start',
        marginTop: 28,
      },
    },
    socialLink: {
      width: '26px',
      height: '26px',
      marginRight: 30,
      cursor: 'pointer',
      '&:hover': {
        '& path': {
          fill: theme.colors.secondaryDark,
        },
      },
      '&.web-icon': { width: 23, height: 23 },
      [MAX_WIDTH_1439]: {
        marginRight: 26,
        width: '23px',
        height: '23px',
        '&.web-icon': { width: 21, height: 21 },
      },
      [MAX_WIDTH_1239]: {
        marginRight: 20,
        width: '17px',
        height: '17px',
        '&.web-icon': { width: 15, height: 15 },
      },
      [MAX_WIDTH_767]: {
        marginRight: 12,
        width: '10px',
        height: '10px',
        '&.web-icon': { width: 9, height: 9 },
      },
    },
  })
);
