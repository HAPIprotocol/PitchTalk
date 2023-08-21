import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  modal: {
    width: '384px',
    zIndex: 100,
    padding: '32px',
    [MAX_WIDTH_767]: {
      width: '340px',
      padding: '32px 16px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  },
  modalHead: {
    marginBlock: '0 32px',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
    marginBlock: '0 12px',
  },
  subTitle: {
    margin: 0,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '140%',
  },
  modalBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
  },
}));
