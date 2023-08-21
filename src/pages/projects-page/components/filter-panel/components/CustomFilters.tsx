import { t } from 'i18next';
import { Dispatch, SetStateAction, memo } from 'react';

import { Checkbox } from 'shared/components/checkbox/Checkbox';
import {
  IFiltersState,
  setRated,
  setPremium,
  setJoined,
} from 'shared/utils/projectsFiltersUtils';

import { useStyles } from '../styles';

interface ICustomFiltersProps {
  setFilters: Dispatch<SetStateAction<IFiltersState>>;
  filters: IFiltersState;
}

export const CustomFilters: React.FC<ICustomFiltersProps> = memo(
  ({ setFilters, filters }) => {
    const classes = useStyles();

    return (
      <div className={classes.customFiltersWrapper}>
        <Checkbox
          checked={filters.projectsTypes.isRated}
          onChange={() => setFilters(setRated)}
          label={`${t('projectsPage.ratedProjects')}`}
        />
        <Checkbox
          checked={filters.projectsTypes.isPremium}
          onChange={() => setFilters(setPremium)}
          label={`${t('projectsPage.premiumProjects')}`}
          disabled
          disabledReason={`${t('projectsPage.soon')}`}
        />
        <Checkbox
          checked={filters.projectsTypes.isJoined}
          onChange={() => setFilters(setJoined)}
          label={`${t('projectsPage.joinedProjects')}`}
        />
      </div>
    );
  }
);
