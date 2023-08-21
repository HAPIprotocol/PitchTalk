import format from 'date-fns/format';
import { t } from 'i18next';

import { ReactComponent as AttentionIcon } from 'assets/images/icons/attention-icon.svg';
import { ONE_DAY } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { selectHackathonAttention } from 'store/selectors/events';

import { useStyles } from './styles';
import { Button } from '../button/Button';

const HIGHLIGHT_DAYS = 3;

const formatDueDate = (date: number, daysLeft: number) => {
  if (daysLeft < HIGHLIGHT_DAYS) {
    return t('events.hackathon.onlyDays', { daysLeft });
  }
  return t('events.hackathon.byDueDate', { dueDate: format(date, 'LLL do') });
};

export const HackathonAttention: React.FC = () => {
  const classes = useStyles();
  const { showModal } = useModalContext();
  const hackathonAttention = useAppSelector(selectHackathonAttention);

  if (!hackathonAttention) return <></>;

  const daysLeft = Math.floor(
    (hackathonAttention.dueDate - Date.now()) / ONE_DAY
  );
  const isHighLighted = daysLeft <= HIGHLIGHT_DAYS;

  const openHackathonSolutionModal = () =>
    showModal(EModals.HACKATHON_PARTICIPATION_MODAL, {
      eventId: hackathonAttention.eventId,
      submissionId: hackathonAttention.submissionId,
      projectType: hackathonAttention.projectType,
      videoUrl: hackathonAttention.videoUrl,
      repoUrl: hackathonAttention.repoUrl,
      projectId: hackathonAttention.projectId,
    });

  return (
    <div className={classes.attentionWrapper}>
      <p className={classes.attentionContent}>
        <AttentionIcon
          className={
            isHighLighted
              ? classes.attentionIconHighLighted
              : classes.attentionIcon
          }
        />
        <span
          className={classes.attentionText}
          dangerouslySetInnerHTML={{
            __html: t('events.hackathon.attention', {
              hackathonName: hackathonAttention.name,
              dueDate: formatDueDate(hackathonAttention.dueDate, daysLeft),
            }),
          }}
        />
      </p>
      <Button
        extraClass={classes.addSolutionBtn}
        label={
          hackathonAttention.repoUrl || hackathonAttention.videoUrl
            ? 'events.hackathon.editSolution'
            : 'events.hackathon.addSolution'
        }
        handleClick={openHackathonSolutionModal}
      />
    </div>
  );
};
