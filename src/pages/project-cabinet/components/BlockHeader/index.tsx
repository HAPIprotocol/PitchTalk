import React, { Dispatch, SetStateAction } from 'react';

import { SETTINGS_TOGGLE } from 'pages/project-cabinet/constants';
import { ITranslationKeys } from 'services/translation';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { Translate } from 'shared/components/translate/Translate';
import { EProjectSettingsState } from 'shared/interfaces';

import { useStyles } from './styles';

type BlockHeaderProps = {
  title: ITranslationKeys;
  currentView: EProjectSettingsState;
  setCurrentView: Dispatch<SetStateAction<EProjectSettingsState>>;
  showToggleBtn?: boolean;
};

export const BlockHeader: React.FC<BlockHeaderProps> = ({
  title,
  setCurrentView,
  currentView,
  showToggleBtn = true,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <span className={classes.headerIntro}>
        / <Translate value={title} />
      </span>
      <div className={classes.line} />
      {showToggleBtn && (
        <div>
          <TogglePanel
            buttons={SETTINGS_TOGGLE}
            containerStyles={classes.viewToggle}
            buttonStyles={classes.viewToggleButton}
            handler={setCurrentView}
            toggleValue={currentView}
          />
        </div>
      )}
    </div>
  );
};
