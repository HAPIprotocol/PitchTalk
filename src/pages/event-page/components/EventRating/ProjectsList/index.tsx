import { EventTypes, IEvent } from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import { ToastType } from 'services/toast/constants';
import { Button } from 'shared/components/button/Button';
import { Likes } from 'shared/components/Likes';
import { EAuthModalType } from 'shared/components/modals/auth-modal/types';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { isEventStarted, isEventVoteEnded } from 'shared/utils/eventsUtils';
import {
  isGrantsAvailable,
  isOffChainProject,
} from 'shared/utils/projectUtils';
import {
  selectEventProjectsParticipants,
  selectEventProjectsSubmissions,
  selectEventRefereeParticipants,
} from 'store/selectors/events';
import { selectProjectsMap } from 'store/selectors/projects';
import { selectFundAccount, selectIsGrantUser } from 'store/slices/funds';
import { selectUserOffChainId } from 'store/slices/user';
import { likeProject } from 'store/thunks/likes';

import { useStyles } from './styles';
import { HackathonParticipant } from '../../HackathonParticipant';

interface IProjectsListProps {
  event: IEvent;
  isFullList?: boolean;
  maxParticipantsBlocks?: number;
}

export const ProjectsList: React.FC<IProjectsListProps> = ({
  event,
  isFullList = false,
  maxParticipantsBlocks = 3,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { showModal } = useModalContext();
  const { openModal } = useWalletSelector();
  const { makeGrant, voteProject } = usePitchTalkServiceContext();
  const { isGrantUserActive } = useAppSelector(selectIsGrantUser);
  const projectsMap = useAppSelector(selectProjectsMap);
  const projects = useAppSelector((_) =>
    selectEventProjectsParticipants(_, event.event_id)
  );
  const judges = useAppSelector((_) =>
    selectEventRefereeParticipants(_, event.event_id)
  );
  const submissions = useAppSelector((_) =>
    selectEventProjectsSubmissions(_, event.event_id)
  );
  const userId = useAppSelector(selectUserOffChainId);

  const userFund = useAppSelector(selectFundAccount);
  const isUserJudge =
    userFund && Object.keys(judges).includes(userFund.account_id);

  const isVoteBtn =
    event && isUserJudge && isEventStarted(event) && !isEventVoteEnded(event);
  const showRank = isEventStarted(event);

  const openVoteModal = (projectId: number | string) =>
    voteProject(event.event_id, projectId);

  const openGrantModal = (projectId: number) =>
    makeGrant(projectId, isGrantUserActive, isGrantsAvailable, event.event_id);

  const openAuthModal = () =>
    showModal(EModals.AUTH_MODAL, {
      title: EAuthModalType.Like,
      signInWithOnChain: openModal,
    });

  const projectsToRender = Object.entries(projects)
    .sort(
      ([, { total_votes: votes1 }], [, { total_votes: votes2 }]) =>
        votes2 - votes1
    )
    .slice(
      0,
      isFullList ? Object.keys(projects).length : maxParticipantsBlocks
    );

  const [, judgeMeta] = Object.entries(event?.judges || {}).find(
    ([judgeId]) => judgeId === userFund?.account_id
  ) ?? ['', {}];
  const votesLeft = (event?.vote_limit || 0) - (judgeMeta.votes_given || 0);

  return (
    <>
      {projectsToRender.map(([id, { total_votes }], i) => {
        const project = projectsMap.get(id);
        const projectSubmission = submissions.get(id);

        const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;

        if (!project) return null;

        const team = Object.keys(project.team).length;

        const isLiked = userId
          ? !!projectSubmission?.likes?.includes(userId)
          : false;

        return (
          <NavLink
            className={classes.eventProject}
            key={id + project.name}
            to={APP_ROUTES.PROJECTS + '/' + id}
          >
            <div
              className={classes.eventProjectLogo}
              style={{ backgroundImage: `url(${logo})` }}
            />
            <div className={classes.eventProjectInfo}>
              <div className={classes.eventProjectMainInfo}>
                <p className={classes.eventProjectTitle}>{project.name}</p>
                <p className={classes.eventProjectDescription}>
                  {project.description}
                </p>
                {event.event_type === EventTypes.HACKATHON && (
                  <div className={classes.eventProjectHackathonInfo}>
                    <HackathonParticipant
                      videoUrl={projectSubmission?.video_url}
                      repoUrl={projectSubmission?.repo_url}
                    />
                  </div>
                )}
              </div>
              <div className={classes.eventProjectMetaInfo}>
                {showRank && (
                  <div className={classes.eventProjectRankInfoContainer}>
                    <div className={classes.eventProjectRankInfo}>
                      <p>#{i + 1}</p>
                      <p>
                        <Translate value="events.rank" />
                      </p>
                    </div>
                    <div className={classes.eventProjectRankInfo}>
                      <p>{total_votes}</p>
                      <p>
                        <Translate value="events.votes" />
                      </p>
                    </div>
                    <div className={classes.eventProjectRankInfo}>
                      <p>{team}</p>
                      <p>
                        <Translate value="events.teamMembers" />
                      </p>
                    </div>
                  </div>
                )}
                <div className={classes.eventControls}>
                  <Likes
                    amount={projectSubmission?.likes?.length || 0}
                    isLiked={isLiked}
                    onClick={(e: React.SyntheticEvent<HTMLDivElement>) => {
                      e.preventDefault();
                      if (!projectSubmission)
                        return ToastLink(
                          EMPTY_STRING,
                          t('projectsError.eventSubmissionError'),
                          ToastType.Error
                        );

                      userId
                        ? dispatch(
                            likeProject(
                              projectSubmission.project_id.toString(),
                              projectSubmission.project_type,
                              isLiked,
                              projectSubmission.id,
                              event.event_id
                            )
                          )
                        : openAuthModal();
                    }}
                  />
                  {isVoteBtn && (
                    <div className={classes.grantsControls}>
                      {!!votesLeft && (
                        <Button
                          extraClass={classes.eventControlButton}
                          label="events.vote"
                          handleClick={(
                            e: React.SyntheticEvent<HTMLButtonElement>
                          ) => {
                            e.preventDefault();
                            openVoteModal(
                              isOffChainProject(project)
                                ? project.id
                                : project.project_id
                            );
                          }}
                        />
                      )}
                      {!isOffChainProject(project) && (
                        <Button
                          extraClass={classes.eventControlButton}
                          label="events.grant"
                          handleClick={(
                            e: React.SyntheticEvent<HTMLButtonElement>
                          ) => {
                            e.preventDefault();
                            openGrantModal(project.project_id);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </>
  );
};
