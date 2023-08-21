import React from 'react';

import { useStyles } from './styles';
import { Translate } from '../../../../shared/components/translate/Translate';
import { getCorrectIPFSLinks } from '../../../participant-form/helpers';
import { IPreviewLogoModel } from '../../../participant-form/interfaces';

export interface IPreviewLogo {
  image: string;
}
const PreviewLogo: React.FC<IPreviewLogo> = ({ image }) => {
  const correctImages = getCorrectIPFSLinks<IPreviewLogoModel>({
    logo: image,
  });
  const classes = useStyles({ previewImage: image });
  return (
    <div className={classes.container}>
      {image && (
        <img
          className={classes.logo}
          src={correctImages.logo}
          onError={(e) => {
            (e.target as HTMLInputElement).onerror = null;
            (e.target as HTMLInputElement).src = '';
          }}
          alt="image logo"
        />
      )}
      <div className={classes.emptyImageText}>
        <Translate value="institutionalSubmission.uploadPreviewLogo" />
      </div>
    </div>
  );
};

export default PreviewLogo;
