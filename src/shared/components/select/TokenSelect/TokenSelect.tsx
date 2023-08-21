import React, { useRef, useState } from 'react';

import { ReactComponent as TriangleIcon } from 'assets/images/icons/triangle-icon.svg';
import { DEFAULT_TOKEN } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import { classNames } from 'shared/styles/theme';
import { selectTokens } from 'store/slices/tokens';

import useStyles from './styles';

type TokenSelectProps = {
  selectedToken: string;
  selectToken: (token: string) => void;
  readOnly?: boolean;
  infoLabel?: string;
  infoLabelExtraClass?: string;
  selectExtraClass?: string;
};

export const TokenSelect: React.FC<TokenSelectProps> = ({
  selectedToken,
  selectToken,
  readOnly,
  infoLabel = '',
  infoLabelExtraClass = '',
  selectExtraClass = '',
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tokens = useAppSelector(selectTokens);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSelectMonth = (token: string) => {
    selectToken(token);
    setIsOpen(false);
  };
  const selectedTokenData = Object.keys(tokens).length
    ? tokens[selectedToken] || tokens[0]
    : { ...DEFAULT_TOKEN };

  useOutsideClick(dropDownRef, () => setIsOpen(false));

  return (
    <div
      className={classNames(
        classes.select,
        readOnly && 'readOnly',
        selectExtraClass
      )}
      ref={dropDownRef}
    >
      <div
        className={classes.selectWrapper}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
      >
        <label className={classes.selectValue}>
          <span>{selectedTokenData.symbol}</span>
          <img src={selectedTokenData?.icon} />
        </label>
        <TriangleIcon
          className={isOpen ? classes.selectIconRotate : classes.selectIcon}
        />
        {infoLabel && (
          <label className={classNames(classes.infoLabel, infoLabelExtraClass)}>
            {infoLabel}
          </label>
        )}
      </div>
      {isOpen && tokens && (
        <div className={classes.dropDownOpened}>
          {Object.entries(tokens).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleSelectMonth(key)}
              className={classes.tokenInfo}
              disabled={selectedTokenData.symbol === data.symbol}
            >
              {data.symbol}
              <img src={data.icon} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
