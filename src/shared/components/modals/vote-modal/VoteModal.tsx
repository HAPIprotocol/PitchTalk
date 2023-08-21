import { t } from 'i18next';
import { useState } from 'react';

import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { IVoteModal } from 'shared/interfaces';
import { selectEventById } from 'store/selectors/events';
import { selectFundAccount } from 'store/slices/funds';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const VoteModal: React.FC<IVoteModal> = ({
  closeModal,
  eventId,
  handleConfirm,
}) => {
  const classes = useStyles();
  const userFund = useAppSelector(selectFundAccount);
  const event = useAppSelector((_) => selectEventById(_, Number(eventId)));

  const [votes, setVotes] = useState<number>(1);

  if (!event) closeModal();

  const onDecrementClick = () => setVotes((p) => p - 1);
  const onIncrementClick = () => setVotes((p) => p + 1);

  const confirmVote = () => handleConfirm(votes);

  const [, judgeMeta] = Object.entries(event?.judges || {}).find(
    ([judgeId]) => judgeId === userFund?.account_id
  ) ?? ['', {}];

  const votesLeft = (event?.vote_limit || 0) - (judgeMeta.votes_given || 0);
  const votesLeftShow = votesLeft !== 0 ? votesLeft - votes : 0;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= 1 || !value) {
      setVotes(1);
    } else if (value > votesLeft) {
      setVotes(votesLeft);
    } else {
      setVotes(value);
    }
  };

  return (
    <ModalWrapper closeModal={closeModal} modalStyles={classes.modalContainer}>
      <div className={classes.container}>
        <div className={classes.votesModalTitleContainer}>
          <h2 className={classes.votesModalTitle}>
            <Translate value="events.voteModal.title" />
          </h2>
          <p className={classes.votesModalSubTitle}>
            <Translate value="events.voteModal.subTitle" />
          </p>
        </div>
        <div className={classes.votesControls}>
          <p className={classes.votesLeft}>
            {`${t('events.voteModal.left', { votes: votesLeftShow })}`}
          </p>
          <div className={classes.voteInputControls}>
            <button
              onClick={onDecrementClick}
              className={classes.voteInputDec}
              disabled={votes <= 1}
            />
            <input
              value={votes}
              className={classes.voteInput}
              onChange={onInputChange}
            />
            <button
              onClick={onIncrementClick}
              className={classes.voteInputInc}
              disabled={votesLeftShow === 0}
            />
          </div>
          <Button
            disabled={!votesLeft}
            extraClass={classes.voteButton}
            label="events.vote"
            handleClick={confirmVote}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
