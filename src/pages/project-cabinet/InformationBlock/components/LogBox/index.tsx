import { Comment } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { Trans } from 'react-i18next';

import { Translate } from 'shared/components/translate/Translate';
import { getValidCreatedAt } from 'shared/utils/dateUtils';

import { useStyles } from './styles';

type LogBoxProps = {
  logs: Comment[];
  isOnChainProject: boolean;
};

export const LogBox: React.FC<LogBoxProps> = ({ logs, isOnChainProject }) => {
  const classes = useStyles({ isOnChainProject });
  const logsArr = logs?.length > 1 ? [...logs].reverse() : [];

  return (
    <div className={classes.logsContainer}>
      {logsArr.length ? (
        logsArr.map((log, i) => (
          <div className={classes.logItem} key={i}>
            <div className={classes.info}>
              <span className={classes.action}>
                <Translate value={`submissionStatuses.${log.action}`} />
                {` - ${getValidCreatedAt(
                  !isOnChainProject ? new Date(log.created_at) : log.created_at
                )}`}
              </span>
              <span className={classes.comment}>{log.comment}</span>
              <span className={classes.date}>{log.account_id}</span>
            </div>
          </div>
        ))
      ) : (
        <h3 className={classes.noLogs}>
          <Trans i18nKey="projectCabinetPage.noLogs" />
        </h3>
      )}
    </div>
  );
};
