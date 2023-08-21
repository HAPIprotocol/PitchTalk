import { Documents } from '@pitchtalk/contract-api-js/dist/core';
import { memo } from 'react';

import { ProjectDocument } from 'shared/components/project-document/ProjectDocument';

import { useStyles } from './styles';

const getDocuments = (documents: Documents) =>
  Object.keys(documents).map((key) => ({ ...documents[key], id: key }));

interface IProjectDocumentsProps {
  documents: Documents;
}

export const ProjectDocuments: React.FC<IProjectDocumentsProps> = memo(
  ({ documents }) => {
    const classes = useStyles();
    const docs = getDocuments(documents);

    return (
      <div className={classes.documents}>
        {docs.map((document) => (
          <ProjectDocument documentData={document} key={document.id} />
        ))}
      </div>
    );
  }
);
