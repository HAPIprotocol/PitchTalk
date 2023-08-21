import { DocumentType, Document } from '@pitchtalk/contract-api-js/dist/core';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { FormikProps } from 'formik';

import { GeneralInfoBlockState } from 'pages/project-cabinet/GeneralInfoBlock/helpers';
import {
  ISubmissionProject,
  ISubmissionSubProject,
} from 'pages/project-cabinet/interfaces';
import { handleSubInfoModal } from 'pages/project-cabinet/utils';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { useModalContext } from 'shared/providers/ModalsProvider';
import {
  removeProjectAttachments,
  updateProjectAttachments,
} from 'store/thunks/user/project';

import { DocumentUpload } from './DocumentUpload';
import { useStyles } from './styles';

type DocumentationInfoProps = {
  isEdit: boolean;
  formik: FormikProps<GeneralInfoBlockState>;
  project: ISubmissionProject | undefined;
  userProject: ISubmissionSubProject;
};

const DOCS_MAP = {
  tokenomics: DocumentType.Tokenomics,
  pitchdeck: DocumentType.Diagram,
  whitepaper: DocumentType.Whitepaper,
};

export const DocumentationInfo: React.FC<DocumentationInfoProps> = ({
  isEdit,
  project,
  userProject,
}) => {
  const isOnChainProject = project?.type === EProjectType.OnChain;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { showModal } = useModalContext();
  const { subServiceActions } = usePitchTalkServiceContext();

  const saveProjectAttachment = (
    docId: keyof typeof DocumentType | string, // DocumentType | offChain docId | EMPTY_STRING
    document: Document
  ) => {
    const projectId = (userProject?.id || EMPTY_STRING).toString();

    if (isOnChainProject) {
      subServiceActions.addAttachments({ [docId]: document });
    } else {
      dispatch(
        updateProjectAttachments({
          projectId,
          attachments: [{ id: docId || undefined, ...document }],
        })
      ).then(handleSubInfoModal(showModal));
    }
  };

  const removeProjectAttachment = (
    docId: keyof typeof DocumentType | string // DocumentType | offChain docId | EMPTY_STRING
  ) => {
    const projectId = (userProject?.id || EMPTY_STRING).toString();

    if (isOnChainProject) {
      subServiceActions.removeAttachments([docId]);
    } else {
      dispatch(
        removeProjectAttachments({ projectId, attachmentIds: [docId] })
      ).then(handleSubInfoModal(showModal));
    }
  };

  return (
    <div className={classes.content}>
      {Object.entries(DOCS_MAP).map((docs) => {
        const [docName, docType] = docs;

        return (
          <DocumentUpload
            key={docName}
            isActive={userProject?.is_active}
            isEdit={isEdit}
            projectDoc={
              project?.documents?.[isOnChainProject ? docName : docType] ?? null
            }
            userProjectDoc={
              userProject?.documents?.[isOnChainProject ? docName : docType] ??
              null
            }
            docId={
              userProject.type === EProjectType.OffChain
                ? userProject?.documents?.[docType]?.id || EMPTY_STRING
                : EMPTY_STRING
            }
            docName={docName}
            docType={docType}
            saveProjectAttachment={saveProjectAttachment}
            removeProjectAttachment={removeProjectAttachment}
            userProjectName={userProject.name}
            isOnChainProject={isOnChainProject}
          />
        );
      })}
    </div>
  );
};
