import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { APP_ROUTES } from 'routes';
import i18n from 'services/translation';
import { EClosestItemStatus, PitchWithProjectData } from 'shared/interfaces';
import { IClosestEventData } from 'store/types/events';

import { useStyles } from './styles';
import { Button } from '../button/Button';
import { PitchStatusLabel } from '../pitch-status-label/PitchStatusLabel';

interface ITranslationTitle {
  titleStatus: EClosestItemStatus | undefined;
  item: PitchWithProjectData | (IClosestEventData | null);
}

const PITCH_TITLE: { [key in EClosestItemStatus]?: string } = {
  [EClosestItemStatus.LIVE]: `${i18n.t('currentPitchTitle.live')}`,
  [EClosestItemStatus.CLOSEST_PAST]: `${i18n.t('currentPitchTitle.recent')}`,
  [EClosestItemStatus.CLOSEST_UPCOMING]: `${i18n.t(
    'currentPitchTitle.upcoming'
  )}`,
  [EClosestItemStatus.EMPTY]: `${i18n.t('error.message')}`,
};

const isPitchType = (
  item: PitchWithProjectData | (IClosestEventData | null)
): item is PitchWithProjectData => !!(item as PitchWithProjectData)?.project;

export const TranslationTitle: React.FC<ITranslationTitle> = ({
  titleStatus,
  item,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { project, ...pitchData } = isPitchType(item)
    ? item
    : ({} as PitchWithProjectData);

  if (
    !item ||
    (!!isPitchType(item) && (!pitchData || !project)) ||
    !Object.keys(item).length
  )
    return <></>;

  const goToProjectPage = () =>
    isPitchType(item)
      ? navigate(`${APP_ROUTES.PROJECTS}/${project.project_id}`)
      : navigate(`${APP_ROUTES.EVENTS}/${item.on_chain_id}`);

  const itemStart = isPitchType(item)
    ? item.starts_on
    : new Date(item.start_date).valueOf();
  const itemEnd = isPitchType(item)
    ? item.starts_on + item.duration
    : new Date(item.end_date).valueOf();

  const showDate = !isToday(itemStart);
  const startTime = format(itemStart || 0, showDate ? 'PP p' : 'p');
  const endTime = format(itemEnd || 0, 'p');
  const pitchDate = format(itemStart, 'PP');

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>
            {PITCH_TITLE[titleStatus || EClosestItemStatus.EMPTY]}
          </span>
          {titleStatus !== EClosestItemStatus.CLOSEST_PAST ? (
            <span className={classes.time}>
              {startTime} - {endTime}
            </span>
          ) : (
            <span className={classes.time}>{pitchDate}</span>
          )}
        </div>
      </div>
      <div className={classes.subHeading}>
        <div className={classes.subtitleWrapper}>
          {isPitchType(item) ? <PitchStatusLabel stage={item.stage} /> : <></>}
          <abbr
            className={classes.subtitle}
            title={isPitchType(item) ? project.name : item.name}
          >
            {isPitchType(item) ? project.name : item.name}
          </abbr>
        </div>
        <div className={classes.goToProjectWrapper}>
          <Button
            label={`navigation.${
              isPitchType(item) ? 'goToProject' : 'goToEvent'
            }`}
            handleClick={goToProjectPage}
          />
        </div>
      </div>
    </div>
  );
};
