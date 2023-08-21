import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, {isUpdated: boolean, isFailed: boolean}, IAppTheme>((theme: IAppTheme) => ({
  statusMessage: {
    color: ({isUpdated, isFailed}) => isUpdated 
      ? theme.colors.processingColor 
      : isFailed 
      ? theme.colors.declinedColor
      : theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    margin: '3px',
    maxWidth: '100%',
  },
  errorMessage: {
    composes: '$statusMessage',
    color: theme.colors.errorPink,
  },
}));