import { ReactComponent as LinkIcon } from 'assets/images/icons/link-icon.svg';
import { ReactComponent as StarIcon } from 'assets/images/icons/star-icon.svg';
import i18n from 'services/translation';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectProjectGrants } from 'store/slices/grants';

import { useStyles } from './styles';

interface ILikeCountLabelProps {
  projectId: number;
  likes: string[];
  onClick?: () => void;
  showLikes?: boolean;
  extraClasses?: {
    mainWrapper?: string;
    likesCountWrapper?: string;
  };
}

export const LikeCountLabel: React.FC<ILikeCountLabelProps> = ({
  projectId,
  likes = [],
  onClick,
  showLikes,
  extraClasses,
}) => {
  const grantsData = useAppSelector((state) =>
    selectProjectGrants(state, projectId)
  );
  const isGrant = !!grantsData.length;
  const isLikes = !!(likes.length && showLikes);
  const classes = useStyles({ isGrant, isLikes });

  return (
    <div
      className={classNames(
        classes.likesCountWrapper,
        extraClasses?.mainWrapper
      )}
      onClick={onClick}>
      <div className={classes.starWrapper}>
        <StarIcon />
      </div>
      {showLikes && (
        <div
          className={classNames(
            classes.countWrapper,
            extraClasses?.likesCountWrapper
          )}>
          <LinkIcon />
          <span className={classes.likesCount}>
            {`${i18n.t(
              likes.length === 1 ? 'likesLabel.like' : 'likesLabel.likes',
              {
                amount: likes.length,
              }
            )}`}
          </span>
        </div>
      )}
    </div>
  );
};
