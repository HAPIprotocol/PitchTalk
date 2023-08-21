import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import isEqual from 'lodash/isEqual';
import { useEffect, useRef, useState } from 'react';

import { ReactComponent as TriangleIcon } from 'assets/images/icons/triangle-icon.svg';
import { GeneralInfoBlockState, getCorrectTags } from 'pages/project-cabinet/GeneralInfoBlock/helpers';
import {
  ISubmissionProject,
  ISubmissionSubProject,
} from 'pages/project-cabinet/interfaces';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { DropDownMenu } from 'shared/components/DropdownMenu/DropDownMenu';
import { Tags } from 'shared/components/tags/Tags';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectTags } from 'store/slices/tags';

import { useStyles } from './styles';

type TagsInfoProps = {
  isEdit: boolean;
  formik: FormikProps<GeneralInfoBlockState>;
  project: ISubmissionProject | undefined;
  userProject: ISubmissionSubProject;
};

export const TagsInfo: React.FC<TagsInfoProps> = ({
  formik,
  isEdit,
  project,
  userProject,
}) => {
  const tags = useAppSelector(selectTags);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });

  const projectTags = getCorrectTags(project?.tags || []);
  const userProjectTags = getCorrectTags(userProject.tags || []);

  const isTagsChanged = !isEqual(projectTags, userProjectTags);

  const isProcessing =
    userProject.status === EActionStatus.Updated && isTagsChanged;
  const isFailed = userProject.status === EActionStatus.Failed && isTagsChanged;

  const classes = useStyles({ isProcessing, isFailed, isEdit });

  const infoLabel = inputLabelUtils.labelFunc(isProcessing, isFailed)();

  useEffect(() => {
    if (tagsRef.current) {
      setDropDownPosition((prev) => ({
        ...prev,
        top: tagsRef.current?.offsetHeight || 0,
      }));
    }
  }, [formik.values.tags.length]);

  return (
    <div className={classes.content}>
      <DropDownMenu
        disabled={!isEdit}
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
                  formik.setFieldValue('tags', [...formik.values.tags, tag.id]);
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
            removeItem={
              isEdit
                ? (tagId) =>
                    formik.setFieldValue(
                      'tags',
                      formik.values.tags.filter((tag) => tag !== tagId)
                    )
                : undefined
            }
            noTagsMessage={t('projectCabinetPage.tags')}
          />
          {isEdit && <TriangleIcon className={classes.arrowIcon} />}
          {infoLabel && <p className={classes.infoLabel}>{infoLabel}</p>}
        </>
      </DropDownMenu>
    </div>
  );
};
