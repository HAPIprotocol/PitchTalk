import {
  IOffChainProject,
  EProjectType,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';

import { EMPTY_STRING } from 'shared/constants';
import { EModals } from 'shared/interfaces';
import { ModalProps } from 'shared/providers/ModalsProvider';
import { IAppTheme } from 'shared/styles/theme';
import { findPitchByKey } from 'shared/utils/pitchUtils';
import { ESTORAGE_KEYS, getItem } from 'shared/utils/storage';

import { ISubmissionProject, ISubmissionSubProject } from './interfaces';

// HIGHLIGHT FIELDS UTILS
export const getInputInfoLabelStyles = (theme: IAppTheme) => ({
  ['processing-color']: { color: theme.colors.processingColor },
  ['processing-border']: {
    border: ['1px', 'solid', theme.colors.processingColor],
  },
  ['declined-color']: { color: theme.colors.declinedColor },
  ['declined-border']: { border: ['1px', 'solid', theme.colors.declinedColor] },
});

const stylesFunc =
  (isUpdated: boolean, isFailed: boolean, classes: Record<string, string>) =>
  (style: 'border' | 'color') =>
    isUpdated
      ? classes[`processing-${style}`]
      : isFailed
      ? classes[`declined-${style}`]
      : EMPTY_STRING;

const labelFunc = (isUpdated: boolean, isFailed: boolean) => () =>
  isUpdated
    ? t('placeHolders.processing')
    : isFailed
    ? t('placeHolders.declined')
    : EMPTY_STRING;

export const inputLabelUtils = { stylesFunc, labelFunc };

export const handleSubInfoModal =
  (showModal: <T extends EModals>(modal: T, props: ModalProps<T>) => void) =>
  (thunkResult?: PayloadAction<unknown>) => {
    if (Object.prototype.hasOwnProperty.call(thunkResult, 'error')) return;
    const doNotShowSubInfoModal = getItem(
      ESTORAGE_KEYS.DO_NOT_SHOW_SUB_INFO_MODAL
    );
    if (!doNotShowSubInfoModal) showModal(EModals.SUB_INFO_MODAL, {});
  };

export const getProjectFromOffChainProject = (
  offChainProject: IOffChainProject | null
): ISubmissionProject | undefined =>
  offChainProject
    ? ({
        ...offChainProject,
        project_id: offChainProject.id,
        team: offChainProject.team.reduce(
          (acc, teamMember) => ({ ...acc, [teamMember.email]: teamMember }),
          {}
        ),
        intro_pitch: offChainProject.pitches?.find(
          findPitchByKey(EPitchType.Intro)
        ),
        update_pitch: offChainProject.pitches?.find(
          findPitchByKey(EPitchType.Update)
        ),
        investors_pitch: offChainProject.pitches?.find(
          findPitchByKey(EPitchType.Investment)
        ),
        documents: offChainProject.documents?.reduce(
          (acc, doc) => ({ ...acc, [doc.doc_type]: doc }),
          {}
        ),
        type: EProjectType.OffChain,
      } as unknown as ISubmissionProject)
    : undefined;

export const getSubProjectFromOffChainProject = (
  offChainProject: IOffChainProject
): ISubmissionSubProject =>
  ({
    ...offChainProject,
    id: offChainProject.id,
    status: offChainProject.submission_status.status,
    comments: offChainProject.submission_status.comments,
    documents: offChainProject.documents?.reduce(
      (acc, doc) => ({ ...acc, [doc.doc_type]: doc }),
      {}
    ),
    intro_pitch: offChainProject.pitches?.find(
      findPitchByKey(EPitchType.Intro)
    ),
    update_pitch: offChainProject.pitches?.find(
      findPitchByKey(EPitchType.Update)
    ),
    investors_pitch: offChainProject.pitches?.find(
      findPitchByKey(EPitchType.Investment)
    ),
    team: offChainProject.team.reduce(
      (acc, teamMember) => ({ ...acc, [teamMember.email]: teamMember }),
      {}
    ),
    type: EProjectType.OffChain,
  } as unknown as ISubmissionSubProject);
