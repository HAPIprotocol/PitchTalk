import memoize from 'memoize-one';
import { useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { Loader } from 'shared/components/loader/Loader';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions, SEARCH_TRIGGER_LENGTH } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import {
  EClosestItemStatus,
  EPitchesType,
  IToggleButtonConfig,
  PitchWithProjectData,
} from 'shared/interfaces';
import { selectClosestPitch } from 'store/slices/closestPitch';
import { selectPitches } from 'store/slices/pitches';

import { useStyles } from './styles';
import { PitchesCard } from '../pitches-card/PitchesCard';
import { SearchInput } from '../search-input/SearchInput';
import { WatchLiveButton } from '../watch-live-button/WatchLiveButton';

const pitchesListToggleConfig: IToggleButtonConfig<EPitchesType>[] = [
  {
    label: 'events.upcoming',
    value: EPitchesType.UPCOMING,
  },
  {
    label: 'events.past',
    value: EPitchesType.PAST,
  },
];

const getNoEventsTitle = (search: string, eventsToggle: EPitchesType) => {
  if (search.length >= SEARCH_TRIGGER_LENGTH) return 'events.noEventsBySearch';
  if (eventsToggle === EPitchesType.UPCOMING) return 'events.noEventsUpcoming';
  return 'events.noPitchesDefault';
};

const createItemData = memoize((items) => items);

export const PITCH_ROW_HEIGHTS: { [dimension in EDimensions]: number } = {
  [EDimensions.DESKTOP]: 328,
  [EDimensions.LAPTOP]: 293,
  [EDimensions.MEDIUM]: 203,
  [EDimensions.SMALL]: 152,
  [EDimensions.UNKNOWN]: 328,
};

export const PitchesList: React.FC = () => {
  const classes = useStyles();
  const dimension = useWindowDimensions();

  const pitchesList = useAppSelector(selectPitches);
  const { status: pitchStatus, pitch: closestPitch } =
    useAppSelector(selectClosestPitch);

  const [eventsToggle, setEventsToggle] = useState<EPitchesType>(
    EPitchesType.UPCOMING
  );
  const [search, setSearch] = useState<string>('');

  const [pitchesByTimeLane, setPitchesByTimeLane] = useState<
    PitchWithProjectData[]
  >([]);

  useEffect(() => {
    if (!pitchesList.length) return;

    const now = Date.now();
    const filteredPitches = pitchesList.filter((pitch) =>
      eventsToggle === EPitchesType.UPCOMING
        ? pitch.starts_on > now
        : pitch.starts_on < now
    );

    setPitchesByTimeLane(
      eventsToggle === EPitchesType.UPCOMING
        ? filteredPitches
        : filteredPitches.reverse()
    );
  }, [pitchesList, eventsToggle]);

  const pitchesToRender =
    search.length < SEARCH_TRIGGER_LENGTH
      ? pitchesByTimeLane
      : pitchesByTimeLane.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        );
  const showLive =
    closestPitch.is_active && pitchStatus === EClosestItemStatus.LIVE;
  const navigate = useNavigate();

  const redirectToLiveProject = () =>
    navigate(
      `${APP_ROUTES.PROJECTS}/${closestPitch?.project?.project_id}?stage=${closestPitch.stage}`
    );

  const noEventsTitle = getNoEventsTitle(search, eventsToggle);
  const itemsToRender = createItemData(pitchesToRender);

  return (
    <>
      <div className={classes.pageHeading}>
        <TogglePanel
          buttons={pitchesListToggleConfig}
          containerStyles={classes.eventsToggle}
          buttonStyles={classes.eventsToggleButton}
          handler={setEventsToggle}
          toggleValue={eventsToggle}
        />
        <div className={classes.inputAndLiveContainer}>
          <SearchInput value={search} changeValue={setSearch} />
          {showLive && (
            <WatchLiveButton
              redirectToLivePitch={redirectToLiveProject}
              startOn={closestPitch?.starts_on}
              duration={closestPitch?.duration}
            />
          )}
        </div>
      </div>
      <div
        className={
          classes.pitchesList + (!pitchesToRender.length ? ' noEvents' : '')
        }
      >
        {!pitchesList.length ? (
          <Loader />
        ) : (
          <>
            {!pitchesToRender.length ? (
              <span className={classes.noEvents}>
                <Translate value={noEventsTitle} />
              </span>
            ) : (
              <AutoSizer style={{ height: '100%', width: '100%' }}>
                {({ height, width }: { height: number; width: number }) => (
                  <List
                    height={height}
                    width={width}
                    style={{
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'none',
                    }}
                    itemCount={itemsToRender.length}
                    itemSize={PITCH_ROW_HEIGHTS[dimension]}
                    itemData={itemsToRender}
                  >
                    {PitchesCard}
                  </List>
                )}
              </AutoSizer>
            )}
          </>
        )}
      </div>
    </>
  );
};
