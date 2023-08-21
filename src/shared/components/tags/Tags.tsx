import { forwardRef } from 'react';

import { ReactComponent as CloseIcon } from 'assets/images/icons/close-icon.svg';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectEvents } from 'store/selectors/events';
import { selectTags } from 'store/slices/tags';

import { useStyles } from './styles';

interface ITagsProps {
  tags: string[];
  eventsTags?: number[]; // eventIds
  classes?: {
    tagsWrapperClass?: string;
    tagClass?: string;
    uniqueTagClass?: string;
    removeTagIconClass?: string;
    noTagMessageClass?: string;
  };
  removeItem?: (tagId: string) => void;
  noTagsMessage?: string;
}

export const Tags = forwardRef<HTMLDivElement, ITagsProps>(
  ({ tags, eventsTags, classes, removeItem, noTagsMessage }, ref) => {
    const mainClasses = useStyles();
    const tagsData = useAppSelector(selectTags);
    const events = useAppSelector(selectEvents);

    return (
      <div
        className={classNames(
          mainClasses.tagsWrapper,
          classes?.tagsWrapperClass
        )}
        ref={ref}
      >
        {!!eventsTags?.length &&
          eventsTags.map((eventId) => {
            const event = events[eventId];
            return (
              event && (
                <p
                  className={classNames(
                    mainClasses.uniqTag,
                    classes?.tagClass,
                    classes?.uniqueTagClass
                  )}
                  key={event.event_id}
                >
                  {event.name}
                </p>
              )
            );
          })}
        {tags?.map((tagId) => {
          const tag = tagsData.find((tag) => tag.id === tagId);
          return (
            tag && (
              <p
                className={classNames(mainClasses.tag, classes?.tagClass)}
                key={tag.id}
              >
                {tag.name}
                {removeItem && (
                  <CloseIcon
                    className={classNames(
                      mainClasses.removeTagIcon,
                      classes?.removeTagIconClass
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeItem(tag.id);
                    }}
                  />
                )}
              </p>
            )
          );
        })}
        {!tags?.length && noTagsMessage && (
          <p
            className={classNames(
              mainClasses.noTagMessage,
              classes?.noTagMessageClass
            )}
          >
            {noTagsMessage}
          </p>
        )}
      </div>
    );
  }
);
