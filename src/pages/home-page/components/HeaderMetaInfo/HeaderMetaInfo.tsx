import { memo } from 'react';

import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  selectOffChainProjects,
  selectProjects,
} from 'store/selectors/projects';
import { selectPitchtalkMetaData } from 'store/slices/metaData';

import { useStyles } from './styles';

export const HeaderMetaInfo: React.FC = memo(() => {
  const classes = useStyles();
  const offChainProjects = useAppSelector(selectOffChainProjects);
  const onChainProjects = useAppSelector(selectProjects);
  const meta = useAppSelector(selectPitchtalkMetaData);

  const projectsCount = [...offChainProjects, ...onChainProjects].length;
  const funded = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  })
    .format(meta?.funded || 0)
    .replace('USD', '')
    .trim();

  return (
    <div className={classes.metaContainer}>
      <div className={classes.metaWrapper}>
        <p className={classes.metaBlock}>
          <span className={classes.metaLabel}>
            <Translate value="mainPage.meta.projects" />
          </span>
          <span className={classes.metaAmount}>{projectsCount}</span>
        </p>
        <p className={classes.metaBlock}>
          <span className={classes.metaLabel}>
            <Translate value="mainPage.meta.hackers" />
          </span>
          <span className={classes.metaAmount}>{meta?.hackers || 0}</span>
        </p>
        <p className={classes.metaBlock}>
          <span className={classes.metaLabel}>
            <Translate value="mainPage.meta.vcsAndAngles" />
          </span>
          <span className={classes.metaAmount}>{meta?.investors || 0}</span>
        </p>
        <p className={classes.metaBlock}>
          <span className={classes.metaLabel}>
            <Translate value="mainPage.meta.funded" />
          </span>
          <span className={classes.metaAmount}>$ {funded}</span>
        </p>
      </div>
    </div>
  );
});
