import { memo } from 'react';

import { Tags } from 'shared/components/tags/Tags';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectTagsMap } from 'store/slices/tags';

import { useStyles } from './styles';

interface IProjectTagsProps {
  tags: string[];
  events: number[];
}

export const ProjectTags: React.FC<IProjectTagsProps> = memo(
  ({ tags, events }) => {
    const classes = useStyles();
    const tagsMap = useAppSelector(selectTagsMap);

    return (
      <div className={classes.tagsContainer}>
        <div className={classes.projectTagsContainer}>
          {tags?.map((tagId, i) => {
            const tag = tagsMap.get(tagId);
            return tag ? (
              <p className={classes.projectTag} key={i + tagId}>
                #<span className={classes.projectTagSlug}>{tag.slug}</span>
              </p>
            ) : null;
          })}
        </div>
        {!!events?.length && (
          <Tags
            eventsTags={events}
            tags={[]}
            classes={{ tagsWrapperClass: classes.projectEventsContainer }}
          />
        )}
      </div>
    );
  }
);
