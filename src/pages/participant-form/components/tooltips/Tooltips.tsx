import React, { memo } from 'react';
import { Tooltip } from 'react-tooltip';

import { TooltipWrapper } from 'pages/project-cabinet/components/Tooltips';
import { EGeneralSettingsTooltips } from 'pages/project-cabinet/constants';

export const Tooltips: React.FC = memo(() => {
  return (
    <>
      <Tooltip id={EGeneralSettingsTooltips.BANNER_IMG_SIZE}>
        <TooltipWrapper
          value="tooltips.generalSettings.bannerImgSize"
          styles={{ maxWidth: 270 }}
        />
      </Tooltip>
      <Tooltip id={EGeneralSettingsTooltips.LOGO_IMG_SIZE}>
        <TooltipWrapper
          value="tooltips.generalSettings.logoImgSize"
          styles={{ maxWidth: 270 }}
        />
      </Tooltip>
      <Tooltip id={EGeneralSettingsTooltips.PROJECT_URL_EXAMPLE}>
        <TooltipWrapper value="tooltips.generalSettings.projectUrlExample" />
      </Tooltip>
    </>
  );
});
