import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

export const ImagesPreviewMeta: React.FC<{
  error?: string | undefined;
  isImageUpdated: boolean;
  isUpdated: boolean;
  isFailed: boolean;
  imageName: 'logo' | 'banner';
}> = ({ error, isImageUpdated, isUpdated, isFailed, imageName }) => {
  const classes = useStyles({isUpdated, isFailed});
  return <>
    {error && (
      <span className={classes.errorMessage}>{error}</span>
    )}
    {!error && isImageUpdated && (isUpdated || isFailed) && (
      <span className={classes.statusMessage}>
        <Translate
          value={
            isUpdated
              ? `placeHolders.${imageName}Processing`
              : `placeHolders.${imageName}Declined`
          }
        />
      </span>
    )}
  </>;
};
