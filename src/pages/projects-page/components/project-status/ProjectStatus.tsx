import { memo } from 'react';

import { ReactComponent as LiveIcon } from 'assets/images/icons/live-icon.svg';
import { ITranslationKeys } from 'services/translation';
import { Translate } from 'shared/components/translate/Translate';
import { EProjectStatus } from 'shared/utils/projectUtils';

import { useStyles } from './styles';

export const ProjectStatus: React.FC<{ status: EProjectStatus }> = memo(
  ({ status }) => {
    const classes = useStyles();

    return status !== EProjectStatus.UNKNOWN ? (
      <div className={classes.projectStatusContainer}>
        {status === EProjectStatus.LIVE && (
          <span className={classes.liveIcon}>
            <LiveIcon />
          </span>
        )}
        <label className={classes.projectStatus + ' ' + classes[status]}>
          <Translate value={`projectStatus.${status}` as ITranslationKeys} />
        </label>
      </div>
    ) : (
      <></>
    );
  }
);
