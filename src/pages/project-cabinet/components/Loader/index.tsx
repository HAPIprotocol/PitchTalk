import React from 'react';

import { Loader as LoaderComponent } from 'shared/components/loader/Loader';

import { useStyles } from '../../styles';

export const Loader: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.blurOverlay}>
      <LoaderComponent />
    </div>
  );
};
