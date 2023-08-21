import React from 'react';

import { ReactComponent as CloseIcon } from 'assets/images/icons/close-icon.svg';

import { useStyles } from './styles';

interface ICloseBtnProps {
  onClick: () => void;
}

export const CloseBtn: React.FC<ICloseBtnProps> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.closeBtnContainer} onClick={onClick}>
      <CloseIcon className={classes.closeBtnIcon} />
    </div>
  );
};
