import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useRef, useState, useEffect } from 'react';

import { ReactComponent as TriangleIcon } from 'assets/images/icons/triangle-icon.svg';
import { IParticipantFormModel } from 'pages/participant-form/interfaces';
import { DropDownMenu } from 'shared/components/DropdownMenu/DropDownMenu';
import { Tags } from 'shared/components/tags/Tags';
import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectTags } from 'store/slices/tags';

import { useStyles } from './styles';

interface ITagsInformationProps {
  formik: FormikProps<IParticipantFormModel>;
}

export const TagsInformation: React.FC<ITagsInformationProps> = ({
  formik,
}) => {
  const tags = useAppSelector(selectTags);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });

  const classes = useStyles();

  useEffect(() => {
    if (tagsRef.current) {
      setDropDownPosition((prev) => ({
        ...prev,
        top: tagsRef.current?.offsetHeight || 0,
      }));
    }
  }, [formik.values.tags.length]);

  return (
    <>
      <span className={classes.formGroupTitle}>
        <Translate value="projectCabinetPage.tags" />
      </span>
      <div className={classes.content}>
        <DropDownMenu
          list={
            <>
              {tags.map((tag, i) => (
                <div
                  className={classNames(
                    classes.tagListItem,
                    formik.values.tags.includes(tag.id) &&
                      classes.tagListItemDisabled
                  )}
                  onClick={() => {
                    formik.setFieldValue('tags', [
                      ...formik.values.tags,
                      tag.id,
                    ]);
                  }}
                  key={tag.id + i}
                >
                  {tag.name}
                </div>
              ))}
            </>
          }
          position={{ ...dropDownPosition }}
          className={''}
          menuClassName={classes.dropDownMenu}
        >
          <>
            <Tags
              ref={tagsRef}
              tags={formik.values.tags}
              classes={{
                tagsWrapperClass: classes.tagsWrapperClass,
                tagClass: classes.tagClass,
                removeTagIconClass: classes.removeTagIconClass,
                noTagMessageClass: classes.noTagMessageClass,
              }}
              removeItem={(tagId) =>
                formik.setFieldValue(
                  'tags',
                  formik.values.tags.filter((tag) => tag !== tagId)
                )
              }
              noTagsMessage={t('projectCabinetPage.tags')}
            />
            <TriangleIcon className={classes.arrowIcon} />
          </>
        </DropDownMenu>
      </div>
    </>
  );
};
