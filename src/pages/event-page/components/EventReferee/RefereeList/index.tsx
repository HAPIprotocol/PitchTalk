import { memo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useParams } from 'services/router';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectEventRefereeParticipants } from 'store/selectors/events';
import { selectFunds } from 'store/slices/funds';

import { useStyles } from './styles';

interface IRefereeListProps {
  isFullList?: boolean;
  maxBlocks?: number;
}

export const RefereeList: React.FC<IRefereeListProps> = memo(
  ({ isFullList = false, maxBlocks }) => {
    const { eventId } = useParams();
    const classes = useStyles({ isFullList });
    const funds = useAppSelector(selectFunds);
    const judges = useAppSelector((_) =>
      selectEventRefereeParticipants(_, Number(eventId))
    );

    const refereeToRender = Object.entries(judges).slice(
      0,
      isFullList ? Object.keys(judges).length : maxBlocks
    );

    return (
      <>
        {refereeToRender.map(([id], i) => {
          const referee = funds.find((fund) => fund.account_id === id);
          const logo = getCorrectIPFSLinks({ logo: referee?.logo }).logo;

          if (!referee) return null;

          return (
            <a
              href={referee.web_url}
              target="_blank"
              rel="noreferrer noopener"
              className={classes.eventReferee}
              key={id + referee.name + i}
            >
              <div
                className={classes.eventRefereeLogo}
                style={{ backgroundImage: `url(${logo})` }}
              />
              <div className={classes.eventRefereeInfo}>
                <p className={classes.eventRefereeInfoTitleName}>
                  {referee.name}
                </p>
              </div>
            </a>
          );
        })}
      </>
    );
  }
);
