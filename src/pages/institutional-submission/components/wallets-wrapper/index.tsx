import { t } from 'i18next';
import React, { ChangeEvent } from 'react';

import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';
import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';

export interface IWalletsModel {
  walletFields: { value: string }[];
  walletError: { [p: string]: boolean };
  handleWalletChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  removeInputFields: (index: number) => void;
  isAccountRegistered: boolean;
}

const WalletsWrapper: React.FC<IWalletsModel> = ({
  walletError,
  walletFields,
  handleWalletChange,
  removeInputFields,
  isAccountRegistered,
}) => {
  const classes = useStyles();
  return (
    <div>
      {walletFields.map((input, index) => {
        const isInputError = !walletError[`key_${index}`] && input.value;
        return (
          <div className={classes.walletWrapper} key={index}>
            <div className={classes.inputItem}>
              <div className={classes.inputRow}>
                <input
                  required
                  className={classNames(
                    classes.formInput,
                    isInputError && classes.errorInput
                  )}
                  placeholder={t('institutionalSubmission.typeAccount')}
                  value={input.value}
                  onChange={(e) => {
                    handleWalletChange(index, e);
                  }}
                  type="text"
                />
                <div
                  className={classes.deleteIcon}
                  onClick={() => removeInputFields(index)}
                >
                  x
                </div>
              </div>
              {!isAccountRegistered && isInputError && (
                <ErrorHandler
                  error={t('institutionalSubmission.errorAccount')}
                />
              )}
              {isAccountRegistered && isInputError && (
                <ErrorHandler
                  error={t(
                    'institutionalSubmission.validation.registeredAccount'
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WalletsWrapper;
