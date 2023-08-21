import {
  EEventSubmissionStatus,
  IEventProjectSubmission,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';
import { memo } from 'react';

import { Events } from './EventInfo/Events';
import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

interface IProjectEventsProps {
  projectId: string | number;
  projectSubmissions: IEventProjectSubmission[];
}

export const ProjectEvents: React.FC<IProjectEventsProps> = memo(
  ({ projectId, projectSubmissions }) => {
    const classes = useStyles();

    if (!projectSubmissions.length) return null;

    const participatedSubmissions = projectSubmissions.filter(
      (submission) => submission.status === EEventSubmissionStatus.APPROVED && submission.event.is_active
    );

    if (!participatedSubmissions.length) return null;

    return (
      <div className={classes.container}>
        <SectionTitle title={t('events.projectEvents')} />
        <div className={classes.eventsContainer}>
          <Events
            projectId={projectId}
            participatedSubmissions={participatedSubmissions}
          />
        </div>
      </div>
    );
  }
);
