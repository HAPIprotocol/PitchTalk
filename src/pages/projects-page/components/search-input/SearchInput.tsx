import { CSSProperties, memo } from 'react';

import { ReactComponent as SearchIcon } from 'assets/images/icons/search-icon.svg';
import i18n from 'services/translation';

import { useStyles } from './styles';

export const SearchInput: React.FC<{
  value: string;
  changeValue: (s: string) => void;
  inputStyles?: CSSProperties
}> = memo(({ value, changeValue, inputStyles }) => {
  const classes = useStyles();
  return (
    <div className={classes.inputHolder} style={inputStyles}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <input
        placeholder={`${i18n.t('navigation.search')}`}
        className={classes.input}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
});
