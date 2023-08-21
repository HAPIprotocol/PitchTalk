import { t } from 'i18next';
import { memo } from 'react';

import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useParams } from 'services/router';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectEventHackathonTasks } from 'store/selectors/events';

import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

export const HackathonTasks: React.FC = memo(() => {
  const { eventId } = useParams();
  const classes = useStyles();
  const tasks = useAppSelector((_) =>
    selectEventHackathonTasks(_, Number(eventId))
  );

  if (!tasks?.length) return null;

  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.tasks')} />
      <div className={classes.tasksWrapper}>
        {sortedTasks.map((task) => (
          <div className={classes.taskItem} key={task.id}>
            <div className={classes.taskTitleWrapper}>
              <div className={classes.taskImgBg}>
                <img
                  className={classes.taskImg}
                  src={getCorrectIPFSLinks({ logo: task.logo }).logo}
                  alt="Task img"
                />
              </div>
              <h4 className={classes.taskTitle}>{task.title}</h4>
            </div>
            <p
              className={classes.taskDescription}
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
            {task.url && (
              <a
                className={classes.taskDocument}
                href={task.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>{`${t('events.hackathon.details')}`}</span>
                <ArrowRightIcon className={classes.taskDocumentIcon} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
