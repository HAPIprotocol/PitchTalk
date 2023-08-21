import { useEffect, useMemo, useState } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Announcements } from 'shared/components/announcements/Announcements';
import { Button } from 'shared/components/button/Button';
import { ParticipatedEvents } from 'shared/components/participated-events/ParticipatedEvents';
import { ProfileSummary } from 'shared/components/profile-summary/ProfileSummary';
import { TranslationTitle } from 'shared/components/translation-title/TranslationTitle';
import { VideoPlayer } from 'shared/components/video-player/VideoPlayer';
import { EDimensions, PRECISION_BALANCE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { useProjectUpdate } from 'shared/hooks/useProjectUpdate';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { EPreviewType } from 'shared/interfaces';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import { isInvestmentsAvailable } from 'shared/utils/pitchUtils';
import { selectClosestEvent } from 'store/selectors/events';
import { selectParticipation } from 'store/selectors/selectParticipations';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectClosestPitch } from 'store/slices/closestPitch';
import { selectIsGrantUser } from 'store/slices/funds';
import { selectPitches } from 'store/slices/pitches';
import { selectProjectVesting } from 'store/slices/vesting';
import { getClosestEvent } from 'store/thunks/events';

import { UserProject } from './components';
import { FundNavigation } from './components/FundNavigation';
import { IssuedGrants } from './components/IssuedGrants/IssuedGrants';
import { useStyles } from './styles';
import { useFundsUpdate } from '../../shared/hooks/useFundsUpdate';

const previewType = EPreviewType.EVENT as EPreviewType;

const ProfilePage: React.FC = () => {
  const [isOverlay, setIsOverlay] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const pitchesList = useAppSelector(selectPitches);
  const participatedEvents = useAppSelector(selectParticipation);
  const { pitch, status: pitchStatus } = useAppSelector(selectClosestPitch);
  const closestEvent = useAppSelector(selectClosestEvent);

  const { ft_token_id, project_id, total_donations, total_investments } =
    pitch?.project || {};
  const { isGrantUser } = useAppSelector(selectIsGrantUser);

  const vesting = useAppSelector((state) =>
    selectProjectVesting(state, project_id)
  );
  const { donate, invest } = usePitchTalkServiceContext();

  const { decimals, symbol, icon } = useAppSelector((state) =>
    selectTokenData(state, ft_token_id)
  );

  const dimension = useWindowDimensions();

  const announcements = useMemo(() => {
    const now = Date.now();
    return pitchesList.filter(
      (pitch) => pitch.starts_on + pitch.duration > now
    );
  }, [pitchesList]);

  // Project auto refresh
  useProjectUpdate(pitch.project?.project_id);

  const { investmentsAvailable, donationsAvailable } = isInvestmentsAvailable(
    pitch.project,
    Number(vesting?.amount) > 0
  );

  const donates = useMemo(
    () => getAmountFormatted(total_donations, decimals),
    [total_donations, decimals]
  );
  const investments = useMemo(
    () => getAmountFormatted(total_investments, decimals),
    [total_investments, decimals]
  );

  useFundsUpdate();
  useEffect(() => {
    dispatch(getClosestEvent());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <ProfileSummary />
        <FundNavigation />
        {isGrantUser && <IssuedGrants />}
        <ParticipatedEvents projects={participatedEvents} />
        <UserProject />
        <div className={classes.broadcastWrapper}>
          <div className={classes.broadcast}>
            <TranslationTitle
              titleStatus={
                previewType === EPreviewType.PITCH
                  ? pitchStatus
                  : closestEvent?.status
              }
              item={previewType === EPreviewType.PITCH ? pitch : closestEvent}
            />
            <div className={classes.playerHolder}>
              <VideoPlayer
                item={previewType === EPreviewType.PITCH ? pitch : closestEvent}
                isOverlay={isOverlay}
                isPlaying={isPlaying}
                handleChangeIsPlaying={setIsPlaying}
                handleChangeIsOverlay={setIsOverlay}
              />
            </div>
          </div>
          {(dimension === EDimensions.MEDIUM ||
            dimension === EDimensions.SMALL) && (
            <div className={classes.investPanel}>
              <div className={classes.investBlock}>
                <span className={classes.investInfo}>
                  <div className={classes.investAmount}>
                    {roundToLow(+donates, PRECISION_BALANCE)}
                  </div>
                  <div className={classes.investCurrency}>
                    {icon && <img src={icon} loading="lazy" />}
                    <span>{symbol}</span>
                  </div>
                </span>
                <Button
                  disabled={!donationsAvailable.available}
                  label={'investPanel.donate'}
                  handleClick={() =>
                    donate(pitch.project.project_id, ft_token_id)
                  }
                  extraClass={classes.button}
                  tooltipText={donationsAvailable.reason}
                />
              </div>
              <div className={classes.verticalLine} />
              <div className={classes.investBlock}>
                <span className={classes.investInfo}>
                  <div className={classes.investAmount}>
                    {roundToLow(+investments, PRECISION_BALANCE)}
                  </div>
                  <div className={classes.investCurrency}>
                    {icon && <img src={icon} loading="lazy" />}
                    <span>{symbol}</span>
                  </div>
                </span>
                <Button
                  label={'investPanel.invest'}
                  disabled={!investmentsAvailable.available}
                  extraClass={classes.button}
                  handleClick={() => invest(pitch.project)}
                  tooltipText={investmentsAvailable.reason}
                />
              </div>
            </div>
          )}
          <div className={classes.announcementWrapper}>
            <Announcements announcements={announcements} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
