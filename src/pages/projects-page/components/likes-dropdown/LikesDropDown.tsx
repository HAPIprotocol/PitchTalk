import { memo } from 'react';

import { DropDownMenu } from 'shared/components/DropdownMenu/DropDownMenu';
import { LikeCountLabel } from 'shared/components/LikesCountLabel/LikeCountLabel';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectFunds } from 'store/slices/funds';

import { useStyles } from './styles';

interface ILikesDropDownProps {
  projectLikes: string[];
  projectId: number;
  isGrant: boolean;
  isLikes: boolean;
}

export const LikesDropDown: React.FC<ILikesDropDownProps> = memo(
  ({ projectLikes, projectId, isGrant, isLikes }) => {
    const classes = useStyles({ isGrant, isLikes });
    const funds = useAppSelector(selectFunds);

    return (
      <DropDownMenu
        list={
          <>
            {projectLikes.map((likeAccount, ind) => {
              const fund = funds?.find(
                (fund) => fund.account_id === likeAccount
              );
              return (
                <div
                  className={classes.likesDropDownItem}
                  key={likeAccount + ind}
                >
                  <img src={fund?.logo ?? ''} loading="lazy" />
                  {fund?.name ?? ''}
                </div>
              );
            })}
          </>
        }
        disabled={!projectLikes?.length}
        position={{ top: '110%', left: 'calc(50% - 73px)' }}
        className={classes.likesDropDownWrapper}
        menuClassName={classes.likesDropDownMenu}
      >
        <LikeCountLabel
          projectId={projectId}
          likes={projectLikes}
          showLikes={!!projectLikes?.length}
          extraClasses={{
            mainWrapper: classes.likesLabelWrapper,
            likesCountWrapper: classes.likesCountWrapper,
          }}
        />
      </DropDownMenu>
    );
  },
  ({ projectLikes: prevLikes }, { projectLikes: nextLikes }) =>
    prevLikes.length !== nextLikes.length
);
