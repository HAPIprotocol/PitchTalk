import { Translate } from 'shared/components/translate/Translate';
import { DEFAULT_TOKEN_DATA, PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import { selectTokens } from 'store/slices/tokens';

import { useStyles } from './styles';

export const TransfersBox: React.FC = () => {
  const tokens = useAppSelector(selectTokens);
  const classes = useStyles();
  // TODO: To implement all functionality it is necessary to have indexer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transfers: any[] = [];

  return (
    <div className={classes.transfersContainer}>
      {!transfers.length ? (
        <h3 className={classes.willAvailableSoon}>
          <Translate value="projectCabinetPage.willBeAvailableSoon" />
        </h3>
      ) : (
        <table className={classes.transfersTable}>
          <thead className={classes.transfersTableHead}>
            <tr>
              <td>
                <Translate value="projectCabinetPage.sum" />
              </td>
              <td>
                <Translate value="projectCabinetPage.tokenName" />
              </td>
              <td>
                <Translate value="projectCabinetPage.balanceFrom" />
              </td>
              <td>
                <Translate value="projectCabinetPage.walletTo" />
              </td>
            </tr>
          </thead>
          <tbody className={classes.transfersTableBody}>
            {transfers.map((transfer, i) => {
              const transferTokenMeta =
                tokens[transfer.token] || DEFAULT_TOKEN_DATA;
              const amount = +getAmountFormatted(
                transfer.amount,
                transferTokenMeta.decimals,
                PRECISION_BALANCE
              );

              return (
                <tr key={i}>
                  <td>{roundToLow(amount, PRECISION_BALANCE)}</td>
                  <td>{transferTokenMeta.symbol}</td>
                  <td className={classes.transferType}>
                    {transfer.type.toLocaleLowerCase()}
                  </td>
                  <td>{transfer.wallet}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
