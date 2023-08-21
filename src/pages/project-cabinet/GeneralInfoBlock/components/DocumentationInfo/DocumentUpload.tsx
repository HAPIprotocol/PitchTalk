import { Document, DocumentType } from '@pitchtalk/contract-api-js/dist/core';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useRef, useState } from 'react';

import { ReactComponent as CloseIcon } from 'assets/images/icons/close-icon.svg';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { ipfsService } from 'services/ipfs';
import { Button } from 'shared/components/button/Button';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Loader } from 'shared/components/loader/Loader';
import {
  DOCUMENT_ICON_MAP,
  DOCUMENT_TITLE_MAP,
} from 'shared/components/project-document/ProjectDocument';
import { ACCEPTABLE_DOCS, EMPTY_STRING } from 'shared/constants';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { classNames } from 'shared/styles/theme';
import YUP from 'shared/utils/yupUtils';

import { useStyles } from './styles';

type IDocumentUploadProps = {
  isEdit: boolean;
  isActive: boolean;
  projectDoc: Document | null;
  userProjectDoc:
    | (Document & {
        status: EActionStatus;
      })
    | null;
  docName: string;
  docType: DocumentType;
  saveProjectAttachment: (
    docId: keyof typeof DocumentType | string,
    value: Document
  ) => void;
  removeProjectAttachment: (docId: keyof typeof DocumentType | string) => void;
  userProjectName: string;
  docId: string;
  isOnChainProject: boolean;
};

const DOCUMENT = 'document';
const schema = YUP.object({
  document: YUP.string().startWithHTTP().url(t('validation.incorrectURL')),
});

export const DocumentUpload: React.FC<IDocumentUploadProps> = ({
  isEdit,
  isActive,
  saveProjectAttachment,
  removeProjectAttachment,
  projectDoc,
  userProjectDoc,
  userProjectName,
  docName,
  docType,
  docId,
  isOnChainProject,
}) => {
  const {
    errors: { document: errors },
    touched: { document: touched },
    values: { document: value },
    setFieldValue,
    setFieldTouched,
    resetForm,
    dirty,
  } = useFormik({
    initialValues: { document: userProjectDoc?.url || EMPTY_STRING },
    validateOnBlur: true,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: () => undefined,
  });
  const docRef = useRef<HTMLInputElement | null>(null);
  const classes = useStyles();

  const { showModal, closeModal } = useModalContext();

  const [documentFile, setDocumentFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState(false);

  const Icon = DOCUMENT_ICON_MAP[docType];
  const title = DOCUMENT_TITLE_MAP[docType];

  const inputWrapperClasses = (
    error: string | null,
    touch: boolean | null,
    ...others: string[]
  ) =>
    classNames(
      classes.controlInput,
      ...others,
      error && touch && classes.errorContainer
    );

  const isUpdated =
    userProjectDoc?.status === EActionStatus.Updated ||
    userProjectDoc?.status === EActionStatus.Removed ||
    userProjectDoc?.status === EActionStatus.New;

  const isFailed = userProjectDoc?.status === EActionStatus.Failed;

  const inputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const inputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed)();

  const inputClasses = (error: string | null, touch: boolean | null) => ({
    inputExtraClass: classes.input,
    containerExtraClass: classNames(
      classes.inputContainer,
      error && touch && classes.errorBorder,
      inputLabelStyles('border')
    ),
    errorExtraClass: classes.error,
    infoLabelExtraClass: inputLabelStyles('color'),
  });

  const clearInput = () => {
    setDocumentFile(null);
    docRef?.current?.setAttribute('type', 'text');
    docRef?.current?.setAttribute('type', 'file');
    resetForm();
  };

  const saveAsFile = async () => {
    try {
      if (!documentFile) return;
      setIsLoading(true);
      const cid = await ipfsService.uploadFile([documentFile], {
        name: `${userProjectName} ${docType}`,
      });
      setIsLoading(false);
      await saveProjectAttachment(isOnChainProject ? docName : docId, {
        url: cid,
        doc_type: docType,
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const removeAttachment = () => {
    showModal(EModals.INFO_MODAL, {
      submitAction: async () => {
        closeModal();
        await removeProjectAttachment(isOnChainProject ? docName : docId);
      },
      text: t('documents.confirmDeleteModal', { docName: title }),
      submitButtonText: t('controls.delete'),
    });
  };

  const controls = (
    <>
      {!documentFile ? (
        <>
          <Button
            extraClass={classes.uploadButton}
            label={'controls.uploadFile'}
            handleClick={() => {
              docRef?.current?.click();
              setFieldValue(DOCUMENT, '');
            }}
          />
          <Button
            disabled={(!!errors && touched) || !dirty || !isActive}
            extraClass={classes.saveBtn}
            label={
              projectDoc?.url ? 'controls.editLink' : 'controls.uploadAsLink'
            }
            handleClick={() =>
              saveProjectAttachment(isOnChainProject ? docName : docId, {
                url: value,
                doc_type: docType,
              })
            }
          />
        </>
      ) : (
        <>
          <Button
            disabled={!documentFile}
            extraClass={classes.saveBtn}
            label={'controls.uploadAsFile'}
            handleClick={saveAsFile}
          />
          <Button
            extraClass={classes.clearButton}
            label={'controls.clear'}
            handleClick={clearInput}
          />
        </>
      )}
    </>
  );

  return (
    <div className={inputWrapperClasses(errors ?? null, touched ?? null)}>
      {isLoading && (
        <div className={classes.blurOverlay}>
          <Loader styles={{ width: '4rem', height: '4rem' }} />
        </div>
      )}
      <label>
        <Icon />
        <span>{title}</span>
      </label>
      <div className={classes.inputAndButtonWrapper}>
        <input
          style={{ display: 'none' }}
          type="file"
          name="project-banner"
          accept={ACCEPTABLE_DOCS}
          ref={docRef}
          onChange={() => {
            setDocumentFile(docRef?.current?.files?.[0]);
          }}
        />
        <div className={classes.inputWrapper}>
          <TextInput
            {...inputClasses(errors ?? null, touched ?? null)}
            value={value || ''}
            onChange={(e) => {
              setFieldValue(DOCUMENT, e.target.value.trim());
            }}
            error={(touched && errors) || null}
            readOnly={!isEdit || !!documentFile}
            placeHolder={
              documentFile?.name || t('placeHolders.insertDocumentLink')
            }
            infoLabel={inputInfoLabel}
            inputProps={{
              onClick: () => setFieldTouched(DOCUMENT, true, false),
            }}
          />
          {isEdit && !!userProjectDoc?.url && (
            <CloseIcon onClick={removeAttachment} />
          )}
        </div>
      </div>
      {isEdit && <div className={classes.buttonControls}>{controls}</div>}
    </div>
  );
};
