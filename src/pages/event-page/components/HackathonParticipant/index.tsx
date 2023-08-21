import { ReactComponent as RepoLinkIcon } from 'assets/images/icons/repo-link-icon.svg';
import { ReactComponent as WatchLinkIcon } from 'assets/images/icons/watch-link-icon.svg';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';

import { useStyles } from './styles';

interface IHackathonParticipantProps {
  repoUrl?: string | null;
  videoUrl?: string | null;
}

export const HackathonParticipant: React.FC<IHackathonParticipantProps> = ({
  repoUrl,
  videoUrl,
}) => {
  const classes = useStyles();

  const openLink = (link: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!link) return;
    window.open(link, '_blank', 'noopener noreferrer');
  };

  return (
    <div className={classes.hackathonParticipantButtonsWrapper}>
      <button
        className={classes.hackathonParticipantButtonRepo}
        onClick={openLink(repoUrl || EMPTY_STRING)}
        disabled={!repoUrl}
        aria-disabled={!repoUrl}
      >
        <span>
          <Translate value="events.repo" />
        </span>
        <RepoLinkIcon />
      </button>
      <button
        className={classes.hackathonParticipantButton}
        onClick={openLink(videoUrl || EMPTY_STRING)}
        disabled={!videoUrl}
      >
        <span>
          <Translate value="events.watch" />
        </span>
        <WatchLinkIcon />
      </button>
    </div>
  );
};
