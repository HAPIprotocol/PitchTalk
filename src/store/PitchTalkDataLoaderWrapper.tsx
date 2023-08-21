/* eslint-disable no-console */
import { IProjectRes } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import Big from 'big.js';
import secToMs from 'date-fns/secondsToMilliseconds';
import { isEqual, uniq } from 'lodash';
import { PropsWithChildren, useEffect } from 'react';

import { useFungibleTokensContext } from 'providers/FTProvider';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { fetchTokenPricesFromJumbo } from 'services/api/pricesAPI';
import { wrapNearId } from 'services/config';
import { FIVE_MINUTES, THIRTY_SECONDS, ZERO } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import {
  getPaginationArray,
  getTheClosestPitch,
} from 'shared/utils/pitchUtils';

import { selectProjects } from './selectors/projects';
import { selectClosestPitch, setClosestPitch } from './slices/closestPitch';
import { selectIsGrantUser, setFunds } from './slices/funds';
import { setGrants } from './slices/grants';
import { selectPitches } from './slices/pitches';
import {
  setSubmissionFunds,
  setSubmissionMetadata,
  setSubmissionProjects,
} from './slices/submission';
import { setTokenPrices } from './slices/tokenPrices';
import { selectTokens } from './slices/tokens';
import {
  selectAccountId,
  setIssuedGrants,
  setUserProject,
} from './slices/user';
import { setVesting } from './slices/vesting';
import { getPartners, getPitchTalkMetaData } from './thunks/metaData';
import { getProjects, getProjectsDonations } from './thunks/projects';
import { getTags } from './thunks/tags';

export const PithTalkDataLoaderWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const pitches = useAppSelector(selectPitches);
  const closestPitch = useAppSelector(selectClosestPitch);
  const tokens = useAppSelector(selectTokens);
  const accountId = useAppSelector(selectAccountId);
  const { isGrantUser } = useAppSelector(selectIsGrantUser);

  const { addTokens } = useFungibleTokensContext();
  const {
    pitchTalkService,
    submissionService,
    subServiceActions,
    fetchUserInvestmentsData,
  } = usePitchTalkServiceContext();

  useEffect(() => {
    const getUserProject = async () => {
      if (!submissionService || !accountId) return;
      try {
        const isUserRegistered = await submissionService.isAccountRegistered(
          accountId
        );
        if (isUserRegistered) {
          const userProject = await submissionService.getProject(accountId);
          dispatch(setUserProject(userProject));
        } else {
          dispatch(setUserProject(null));
        }
      } catch (error) {
        console.warn(error);
        dispatch(setUserProject(null));
      }
    };

    getUserProject();
  }, [submissionService, accountId, dispatch]);

  useEffect(() => {
    const getSubmissionMetadata = async () => {
      if (!submissionService) return;
      try {
        const userMetadata = await submissionService.getMetadata();
        dispatch(setSubmissionMetadata(userMetadata));
      } catch (error) {
        console.warn(error);
        dispatch(setSubmissionMetadata(null));
      }
    };
    getSubmissionMetadata();
  }, [submissionService, dispatch]);

  useEffect(() => {
    const getSubmissionProjects = async () => {
      if (!submissionService) return;
      try {
        const count = (await submissionService.getProjectsCount()) || 0;
        const paginationArray = getPaginationArray(count);

        const projectsResponse = await Promise.allSettled(
          paginationArray.map(({ fromIndex, limit }) =>
            submissionService.getProjects(fromIndex, limit)
          )
        ).then((projectsResponse) => {
          const newProjects = projectsResponse
            .flatMap((response) =>
              response.status === 'fulfilled' ? response.value : null
            )
            .filter(Boolean) as IProjectRes[];

          if (newProjects?.length) {
            return newProjects;
          }
        });

        dispatch(setSubmissionProjects(projectsResponse || []));
      } catch (error) {
        console.warn(error);
        dispatch(setSubmissionProjects([]));
      }
    };
    getSubmissionProjects();
  }, [submissionService, dispatch]);

  useEffect(() => {
    const getPrices = async () => {
      try {
        const prices = await fetchTokenPricesFromJumbo();
        const mappedPrices = prices.reduce((acc, current) => {
          return {
            ...acc,
            [current?.id]: new Big(current?.price || ZERO),
          };
        }, {});
        dispatch(setTokenPrices(mappedPrices));
      } catch (error) {
        console.warn('Error during fetching tokens prices: ' + error);
        dispatch(setTokenPrices({}));
      }
    };

    getPrices();
    const intervalId = setInterval(getPrices, THIRTY_SECONDS);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (!pitchTalkService || !projects.length) return;

    const fetchGrantsData = async () => {
      try {
        const projectsIDs = projects.map(({ project_id }) => project_id);

        const grantsResponse = await Promise.allSettled(
          projectsIDs.map((id) => pitchTalkService.totalGrantsForProject(id))
        );

        const grants = grantsResponse.map((response) =>
          response.status === 'fulfilled' ? response.value : null
        );
        const grantsWithProjectIds = Object.fromEntries(
          projectsIDs.map((id, i) => [id, grants?.[i] || []])
        );
        dispatch(setGrants(grantsWithProjectIds));
      } catch (error) {
        console.warn(error);
        setGrants({});
      }
    };

    fetchGrantsData();
  }, [projects.length, pitchTalkService, dispatch]);

  useEffect(() => {
    if (!isGrantUser || !accountId || !pitchTalkService) return;
    const fetchUserGrants = async () => {
      const userGrants = await pitchTalkService.getTotalGrantsByFundId(
        accountId
      );

      if (!userGrants?.length) return;

      dispatch(setIssuedGrants(userGrants));
    };

    fetchUserGrants();
  }, [isGrantUser, accountId, pitchTalkService, dispatch]);

  useEffect(() => {
    if (!pitchTalkService || !projects.length) return;

    const fetchVestingData = async () => {
      try {
        const projectsIDs = projects.map(({ project_id }) => project_id);

        const vestingsResponse = await Promise.allSettled(
          projectsIDs.map((id) => pitchTalkService.getVesting(id))
        );
        const vestings = vestingsResponse.flatMap((response) =>
          response.status === 'fulfilled' ? response.value : null
        );

        const newTokens: string[] = [];
        const normalizedVesting = vestings.map((vesting) => {
          if (vesting) {
            if (!Object.keys(tokens).includes(vesting.ft_token_id)) {
              newTokens.push(vesting.ft_token_id);
            }
            return { ...vesting, start_sec: secToMs(vesting.start_sec) };
          }
        });

        const vestingsWithProjectId = Object.fromEntries(
          projectsIDs.map((id, i) => [id, normalizedVesting?.[i] || null])
        );

        if (newTokens.length > 0) await addTokens(newTokens);
        dispatch(setVesting(vestingsWithProjectId));
      } catch (error) {
        console.warn(error);
        dispatch(setVesting({}));
      }
    };

    fetchVestingData();
  }, [projects.length, pitchTalkService, addTokens, dispatch, tokens]);

  useEffect(() => {
    fetchUserInvestmentsData();
  }, [fetchUserInvestmentsData]);

  useEffect(() => {
    if (!pitches.length) return;

    const checkNewClosestPitch = () => {
      const newClosestPitch = getTheClosestPitch(pitches);
      if (!closestPitch?.pitch || !isEqual(newClosestPitch, closestPitch)) {
        dispatch(setClosestPitch(newClosestPitch));
      }
    };

    checkNewClosestPitch();
    const intervalId = setInterval(checkNewClosestPitch, FIVE_MINUTES);
    return clearInterval(intervalId);
  }, [pitches, dispatch, closestPitch]);

  useEffect(() => {
    if (!pitchTalkService) return;

    const retrieveCurrencyListWithMeta = async () => {
      try {
        const whiteListTokens = await pitchTalkService.getWhiteListTokens();
        await addTokens(uniq([wrapNearId, ...Object.keys(whiteListTokens)]));
      } catch (error) {
        console.warn(error);
      }
    };
    retrieveCurrencyListWithMeta();
  }, [pitchTalkService, addTokens]);

  useEffect(() => {
    if (!pitchTalkService) return;

    const retrieveFundsList = async () => {
      try {
        const result = await pitchTalkService.getFunds();
        if (result && result.length) dispatch(setFunds(result));
      } catch (error) {
        console.warn(error);
      }
    };
    retrieveFundsList();
  }, [pitchTalkService, dispatch]);

  useEffect(() => {
    const retrieveSubmissionFundsList = async () => {
      const subFunds = await subServiceActions.getSubmissionFunds();
      if (subFunds && subFunds.length) dispatch(setSubmissionFunds(subFunds));
    };
    retrieveSubmissionFundsList();
  }, [dispatch, subServiceActions, submissionService]);

  useEffect(() => {
    if (!pitchTalkService) return;
    dispatch(getProjects(pitchTalkService));
    dispatch(getProjectsDonations(pitchTalkService));
  }, [pitchTalkService, dispatch]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getPartners());
    dispatch(getPitchTalkMetaData());
  }, [dispatch]);

  return <>{children}</>;
};
