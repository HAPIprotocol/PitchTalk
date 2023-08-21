import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  banner?: string;
  logo?: string;
  isGrant?: boolean;
  isLikes?: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    cardContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      width: '356px',
      height: '475px',
      cursor: 'pointer',
      borderBottom: '3px solid',
      borderBottomColor: ({ isGrant }) =>
        isGrant ? theme.colors.grantBaseColor : 'transparent',
      scrollSnapAlign: 'center',
      [MAX_WIDTH_1439]: {
        width: '316px',
        height: '421px',
      },
      [MAX_WIDTH_1239]: {
        width: '276px',
        height: '391px',
      },
      [MAX_WIDTH_767]: {
        minWidth: 'unset',
        width: '181px',
        height: '165px',
      },
    },
    projectMainInfo: {
      width: '100%',
      height: '229px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '23px 31px',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '229px',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: ({ banner }) => `url(${banner || projectFrame})`,
        filter: 'grayscale(15%) brightness(0.6)',
      },
      [MAX_WIDTH_1439]: {
        height: '203px',
        padding: '21px 31px',
        '&:before': { height: '203px' },
      },
      [MAX_WIDTH_1239]: {
        padding: '17px 25px',
      },
      [MAX_WIDTH_767]: {
        height: '121px',
        padding: '7px',
        '&:before': { height: '121px' },
      },
    },
    projectTitle: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '15px',
      [MAX_WIDTH_1239]: { gap: '10px' },
      [MAX_WIDTH_767]: { justifyContent: 'center', gap: '5px' },
    },
    projectLogo: {
      width: '60px',
      height: '60px',
      minWidth: '60px',
      minHeight: '60px',
      padding: '3px',
      [MAX_WIDTH_1239]: {
        width: '50px',
        height: '50px',
        minWidth: '50px',
        minHeight: '50px',
      },
    },
    projectNameAndStatusWrapper: {
      width: '100%',
    },
    projectName: {
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      fontSize: '1.75rem',
      lineHeight: '1.95rem',
      textDecoration: 'none',
      maxWidth: '172px',
      maxHeight: '200px',
      overflow: 'hidden',
      wordWrap: 'break-word',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      [MAX_WIDTH_1439]: {
        fontSize: '1.57rem',
        lineHeight: '1.73rem',
        maxWidth: '153px',
        maxHeight: '180px',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '1.37rem',
        lineHeight: '1.53rem',
        maxWidth: '143px',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.65rem',
        lineHeight: '0.69rem',
        maxWidth: '98px',
        maxHeight: '42px',
        WebkitLineClamp: 2,
        marginBottom: '11px',
      },
    },
    projectInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    },
    projectLinks: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '185px',
      [MAX_WIDTH_1439]: { width: '140px' },
      [MAX_WIDTH_767]: {
        width: '104px',
        alignSelf: 'flex-end',
        margin: '0 0 0 50px',
      },
    },
    socialLink: {
      width: '20px',
      height: '20px',
      '& path': { fill: 'white' },
      '&.web-icon': { width: 16, height: 16 },
      [MAX_WIDTH_1439]: {
        width: '15px',
        height: '12px',
        '&.web-icon': { width: 13, height: 10 },
      },
      [MAX_WIDTH_767]: {
        width: '9px',
        height: '9px',
        '&.web-icon': { width: '8px', height: '8px' },
      },
    },
    projectDescription: {
      width: '100%',
      height: '123px',
      padding: '29px 36px 29px',
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      background: theme.colors.darkPurple,
      '& h4': {
        margin: 0,
        fontSize: '0.775rem',
        lineHeight: '0.95rem',
        display: '-webkit-box',
        WebkitLineClamp: '4',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      },
      [MAX_WIDTH_1439]: {
        height: '109px',
        padding: '25px 29px 27px',
        '& h4': {
          fontSize: '0.7rem',
          lineHeight: '0.875rem',
        },
      },
      [MAX_WIDTH_767]: {
        display: 'none',
      },
    },
    investments: {
      fontFamily: theme.fonts.Everett.Regular,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
      height: '123px',
      background: theme.colors.darkBlue,
      [MAX_WIDTH_1439]: { height: '109px' },
      [MAX_WIDTH_767]: { height: '45px' },
    },
    verticalLine: {
      width: '0px',
      height: '90%',
      borderRight: ['1px', 'solid', theme.colors.borderGray],
      [MAX_WIDTH_767]: {
        borderWidth: '0.5px',
        height: '80%',
      },
    },
    donationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      '& span': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    investmentContainer: { composes: '$donationContainer' },
    investment: { display: 'flex', flexDirection: 'column' },
    investmentTitle: {
      color: theme.colors.lightGrey,
      fontSize: '0.775rem',
      [MAX_WIDTH_1439]: { fontSize: '0.75rem' },
      [MAX_WIDTH_767]: { fontSize: '0.413rem', marginBottom: '2px' },
    },
    investmentAmount: {
      color: theme.colors.white,
      fontSize: '1.105rem',
      lineHeight: '1.44rem',
      [MAX_WIDTH_1439]: { fontSize: '0.98rem', lineHeight: '1.275rem' },
      [MAX_WIDTH_767]: { fontSize: '0.5rem', lineHeight: '0.65rem' },
    },
    investmentAmountUSN: {
      color: theme.colors.lightGrey,
      fontSize: '0.665rem',
      lineHeight: '0.86rem',
      [MAX_WIDTH_1439]: { fontSize: '0.625rem', lineHeight: '0.81rem' },
      [MAX_WIDTH_1239]: { fontSize: '0.625rem', lineHeight: '0.81rem' },
      [MAX_WIDTH_767]: { display: 'none' },
    },
  })
);
