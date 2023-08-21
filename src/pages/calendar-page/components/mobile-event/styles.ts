import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

interface IMobileEvent {
  isPitchFinished: boolean;
  isPitchStarted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyles = createUseStyles<any, IMobileEvent, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      backgroundColor: theme.colors.black,
      left: '40px',
      minWidth: '198px',
      width: '100%',
      height: '82px',
      border: ['1px', 'solid', theme.colors.grey],
      borderRadius: '3px',
      display: 'inline-flex',
      marginBottom: '10px',
      '&:hover': {
        border: ['1px', 'solid', theme.colors.secondaryDark],
      },
    },
    content: {
      height: '100%',
      width: '100%',
      borderLeft: ({ isPitchFinished, isPitchStarted }) => {
        if (isPitchFinished) {
          return `22px solid ${theme.colors.grey}`;
        } else if (isPitchStarted) {
          return `22px solid ${theme.colors.white}`;
        } else {
          return `22px solid ${theme.colors.secondaryDark}`;
        }
      },
      background: ({ isPitchFinished, isPitchStarted }) =>
        isPitchStarted && !isPitchFinished
          ? theme.colors.secondaryDark
          : 'transparent',
      flex: 1,
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.625rem',
      color: theme.colors.white,
      padding: '4px 17px 4px 21px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    projectName: {
      fontSize: '1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginBottom: '3px',
    },
    pitchName: {
      fontSize: '0.75rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginBottom: '5px',
    },
    time: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    head: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1px',
        fontSize: '0.625rem',
        padding: '0px',
        width: '66px',
        height: '18px',
      },
    },
  })
);
