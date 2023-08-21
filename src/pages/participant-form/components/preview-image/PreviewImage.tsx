import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { Logo } from 'shared/components/Logo';
import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';
import { IPreviewImageModel } from '../../interfaces';

export interface IPreviewImage {
  values: {
    project_name: string;
    project_logo: string;
    project_banner: string;
  };
  previewImage: IPreviewImageModel;
}

export const PreviewImage: React.FC<IPreviewImage> = ({
  values: { project_name, project_logo, project_banner },
  previewImage,
}) => {
  const correctImages = getCorrectIPFSLinks<IPreviewImageModel>(previewImage);
  const classes = useStyles({ previewImage: correctImages.banner });
  const isProjectMedia = project_logo || project_name || project_banner;

  return (
    <div className={classes.projectLogo}>
      {!isProjectMedia && (
        <span className={classes.emptyImageText}>
          <Translate value="participantForm.uploadImage" />
        </span>
      )}
      {project_banner && <div className={classes.previewImage} />}
      {isProjectMedia && (
        <div className={classes.previewTitlesWrapper}>
          <Logo
            logo={previewImage.logo}
            logoContainerStyle={classes.imageLogo}
            alt="Image logo"
          />
          {project_name && (
            <div className={classes.previewName}>
              <p className={classes.previewTitle}>{project_name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
