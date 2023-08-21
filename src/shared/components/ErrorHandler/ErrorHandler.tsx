import { CSSProperties } from 'react';

import { useStyles } from './styles';

interface IErrorModel {
  error: string;
  styles?: CSSProperties;
}

export const ErrorHandler: React.FC<IErrorModel> = ({ error,styles }) => {
  const classes = useStyles();
  return <span style={styles} className={classes.error}>{error}</span>;
};
