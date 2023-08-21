import { EventTypes } from '@pitchtalk/contract-api-js/dist/interfaces';
import { useEffect } from 'react';

import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { isEventStarted, isEventVoteEnded } from 'shared/utils/eventsUtils';
import {
  selectEventProjectsParticipants,
  selectEventProjectsSubmissions,
} from 'store/selectors/events';
import { setHackathonAttention } from 'store/slices/events';
import {
  selectUserProjectId,
  selectOffChainUserProject,
} from 'store/slices/user';
import { IEventData } from 'store/types/events';

export const useEventAttention = (event?: IEventData) => {
  const dispatch = useAppDispatch();

  const projects = useAppSelector((_) =>
    selectEventProjectsParticipants(_, Number(event?.event_id))
  );
  const submissions = useAppSelector((_) =>
    selectEventProjectsSubmissions(_, Number(event?.event_id))
  );

  const onChainUserProjectId = useAppSelector(selectUserProjectId);
  const offChainUserProject = useAppSelector(selectOffChainUserProject);

  const userProjectId =
    onChainUserProjectId?.toString() || offChainUserProject?.id.toString();

  const isUserParticipantProject =
    projects &&
    ((userProjectId && Object.keys(projects).includes(userProjectId)) ||
      (userProjectId && Object.keys(projects).includes(userProjectId)));

  useEffect(() => {
    if (
      event?.event_type !== EventTypes.HACKATHON ||
      !userProjectId ||
      !isUserParticipantProject ||
      !isEventStarted(event) ||
      isEventVoteEnded(event)
    ) {
      return;
    }

    const videoUrl = submissions.get(userProjectId)?.video_url;
    const repoUrl = submissions.get(userProjectId)?.repo_url;
    const submissionId = submissions.get(userProjectId)?.id || EMPTY_STRING;
    const projectType = Object.entries(projects).find(
      ([id]) => id === userProjectId
    )?.[1].project_type;

    if (projectType) {
      dispatch(
        setHackathonAttention({
          eventId: event.event_id,
          name: event.name,
          dueDate: event.vote_end_date,
          submissionId,
          projectType,
          videoUrl,
          repoUrl,
        })
      );
    }

    return () => {
      dispatch(setHackathonAttention(null));
    };
  }, [dispatch, event?.serverEvent, isUserParticipantProject, submissions]);
};
