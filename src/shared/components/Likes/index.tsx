import { ReactComponent as LikeIconFilled } from 'assets/images/icons/thumb-up-filled.svg';
import { ReactComponent as LikeIcon } from 'assets/images/icons/thumb-up.svg';

import { useStyles } from './styles';

export interface ILikesProps {
  amount: number;
  isLiked: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Likes: React.FC<ILikesProps> = ({ amount, isLiked, onClick }) => {
  const amountFormater = Intl.NumberFormat('en', { notation: 'compact' });
  const classes = useStyles();

  const onButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (
    <>
      <div
        className={classes.likesBtnWrapper}
        onClick={onButtonClick}
        data-tooltip-id="like-btn"
      >
        {isLiked ? (
          <LikeIconFilled className={classes.likesIconFilled} />
        ) : (
          <LikeIcon className={classes.likesIcon} />
        )}
        <span className={classes.likesAmount}>
          {amountFormater.format(amount)}
        </span>
      </div>
    </>
  );
};
