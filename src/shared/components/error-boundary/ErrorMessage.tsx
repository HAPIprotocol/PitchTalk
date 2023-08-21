import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { Button } from '../button/Button';
import { Translate } from '../translate/Translate';

const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
    background: 'black',
  },
  message: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
  },
}));

export const ErrorMessage = () => {
  const classes = useStyles();
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.message}>
        <Translate value={'error.message'} />
      </h1>
      <Button handleClick={reloadPage} label="error.button" />
    </div>
  );
};
