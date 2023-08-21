import { CSSProperties } from 'react';

import { PitchTalkTheme, IAppTheme } from 'shared/styles/theme';

import { useStyles } from './styles';


export const Loader: React.FC<{ 
  styles?: CSSProperties,
  loaderColor?: keyof IAppTheme['colors'],
  backgroundColor?: keyof IAppTheme['colors'],
}> = ({ 
  styles,
  loaderColor = 'secondaryDark',
  backgroundColor = 'black'
 }) => {
  const classes = useStyles({loaderColor, backgroundColor});
  return <div className={classes.loader} style={{ ...styles }} />;
};
