import { serverUrl } from 'services/config';
import { PARAMS } from 'shared/constants';

export const BASE_URL = serverUrl + '/v1/api/';
export const WS_URL = serverUrl;

export const API_ROUTES = {
  // AUTH
  authGoogle: 'auth/google',
  authWeb3: 'auth/web3',
  authNear: 'auth/near',
  authWeb3Nonce: 'auth/web3-nonce',
  authRefresh: 'auth/tokens',
  // USER
  userData: 'users/me',
  userProjects: 'projects/my',
  userDisplayName: 'users/displayName',
  // EVENTS
  event: 'event',
  eventLive: 'event/live',
  eventsSlider: 'event/slider',
  eventsLast: 'event/lastEvents',
  eventsHasEvents: 'event/hasEvents',
  eventCount: 'event/count',
  eventOnChain: 'event/onChainId',
  eventSchedule: `event/${PARAMS.EVENT_ID}/schedule`,
  eventHackathon: `hackathon/event/${PARAMS.EVENT_ID}`,
  eventReferee: 'event/referee',
  eventParticipation: 'event/participation',
  // PROJECT EVENT SUBMISSION
  refereeSubmissions: `referee/event/${PARAMS.EVENT_ID}`,
  participationSubmissions: `participation/event/${PARAMS.EVENT_ID}`,
  submissionById: `participation/${PARAMS.PARTICIPATION_ID}`,
  projectSubmissions: `participation/project/${PARAMS.PROJECT_ID}`,
  updateOnChainSubmission: `participation/onChain/${PARAMS.PARTICIPATION_ID}`,
  updateOffChainSubmission: `participation/offChain/${PARAMS.PARTICIPATION_ID}`,
  nearestSubmission: `participation/nearestEnd/${PARAMS.PROJECT_ID}`,
  // PROJECTS
  projects: 'projects',
  projectsSlug: 'projects/slug',
  projectsCount: 'projects/count',
  projectSubmissionNew: 'submissions/new',
  projectSubmissionUpdate: `submissions/${PARAMS.PROJECT_ID}/update`,
  projectSubmissionDocumentsUpdate: `submissions/documents/${PARAMS.PROJECT_ID}`,
  projectSubmissionPitchAdd: `submissions/pitch/${PARAMS.PROJECT_ID}`, // POST
  projectSubmissionPitchUpdate: `submissions/pitch/${PARAMS.PITCH_ID}`, // PATCH
  projectSubmissionPitchDelete: `submissions/pitch/${PARAMS.PITCH_ID}`, // DELETE
  projectSubmissionPitchStatusUpdate: `submissions/pitchStatus/${PARAMS.PITCH_ID}`, // PATCH
  projectSubmissionTeamUpdate: `submissions/team/${PARAMS.PROJECT_ID}`, // PATCH
  // TAGS
  tags: 'tag',
  tagsCount: 'tag/count',
  // META
  partners: 'partners',
  partnersCount: 'partners/count',
  metaData: 'metaData',
  // LIKES
  likesUser: `likes/user/${PARAMS.USER_ID}`,
  likesOnChainProject: `likes/onChainProject/${PARAMS.PROJECT_ID}`,
  likesOffChainProject: `likes/offChainProject/${PARAMS.PROJECT_ID}`,
  likesEvent: `likes/offChainProject/${PARAMS.PROJECT_ID}`,
  likePitch: `pitch/like/${PARAMS.PITCH_ID}`,
  likeProject: `projects/like/${PARAMS.PROJECT_ID}`,
  likeEvent: `event/like/${PARAMS.EVENT_ID}`,
  // COMMENTS
  comments: 'comments',
  eventComments: `comments/event/${PARAMS.EVENT_ID}`,
  eventCommentsCount: `comments/count/${PARAMS.EVENT_ID}`,
};

export const WS_ROUTES = {
  comments: '/event/comments',
};
