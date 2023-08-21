import { Document, DocumentType } from '@pitchtalk/contract-api-js';

import { ReactComponent as DocumentationIcon } from 'assets/images/documents-icons/documentation-icon.svg';
import { ReactComponent as PitchdeckIcon } from 'assets/images/documents-icons/pitchdeck-icon.svg';
import { ReactComponent as TokenomicsIcon } from 'assets/images/documents-icons/tokenomics-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import i18n from 'services/translation';

import { useStyles } from './styles';

interface IProjectDocument {
  documentData: Document;
}

export const DOCUMENT_ICON_MAP: { [key in DocumentType]: React.FC } = {
  [DocumentType.Tokenomics]: TokenomicsIcon,
  [DocumentType.Whitepaper]: DocumentationIcon,
  [DocumentType.Diagram]: PitchdeckIcon,
  [DocumentType.Other]: DocumentationIcon,
};

export const DOCUMENT_TITLE_MAP: { [key in DocumentType]: string } = {
  [DocumentType.Tokenomics]: `${i18n.t('documents.tokenomics')}`,
  [DocumentType.Whitepaper]: `${i18n.t('documents.whitepaper')}`,
  [DocumentType.Diagram]: `${i18n.t('documents.pitchdeck')}`,
  [DocumentType.Other]: '',
};

export const ProjectDocument: React.FC<IProjectDocument> = ({
  documentData,
}) => {
  const classes = useStyles();

  const correctLink = getCorrectIPFSLinks({url: documentData.url})

  const openDocument = () => {
    window.open(correctLink.url, '_blank', 'noopener noreferrer');
  };

  const Icon = DOCUMENT_ICON_MAP[documentData.doc_type];
  const title = DOCUMENT_TITLE_MAP[documentData.doc_type];

  return documentData.url ? (
    <div className={classes.container} onClick={openDocument}>
      <Icon />
      <span className={classes.title}>{title || documentData.doc_type}</span>
    </div>
  ) : (
    <></>
  );
};
