import { CSSProperties, memo } from 'react';
import { Trans } from 'react-i18next';
import { Tooltip } from 'react-tooltip';

import {
  EGeneralSettingsTooltips,
  EVestingSettingsTooltips,
} from 'pages/project-cabinet/constants';
import { ProjectPitches } from 'pages/project-page/constants';
import { ITranslationKeys } from 'services/translation';

const tooltipStyles: CSSProperties = {
  maxWidth: '240px',
  whiteSpace: 'pre-line',
  padding: '2px 0px',
};

export const TooltipWrapper: React.FC<{
  value: ITranslationKeys;
  styles?: CSSProperties;
}> = ({ value, styles }) => {
  return (
    <div style={{ ...tooltipStyles, ...styles }}>
      <Trans i18nKey={value} />
    </div>
  );
};

export const ToolTips: React.FC = memo(() => (
  <>
    {/* Information block */}
    <Tooltip id="currentBalances">
      <TooltipWrapper value="tooltips.currentBalances" />
    </Tooltip>
    <Tooltip id="logBox">
      <TooltipWrapper value="tooltips.logBox" />
    </Tooltip>
    <Tooltip id="listOfTransfers">
      <TooltipWrapper value="tooltips.listOfTransfers" />
    </Tooltip>
    {/* General information */}
    <Tooltip id="projectInfo">
      <TooltipWrapper value="tooltips.projectInfo" />
    </Tooltip>
    <Tooltip id="social">
      <TooltipWrapper value="tooltips.social" />
    </Tooltip>
    <Tooltip id="documentation">
      <TooltipWrapper value="tooltips.documentation" />
    </Tooltip>
    {/* Financial information */}
    <Tooltip id="ftToken">
      <TooltipWrapper value="tooltips.ftToken" />
    </Tooltip>
    <Tooltip id="investmentsSettings">
      <TooltipWrapper value="tooltips.investmentsSettings" />
    </Tooltip>
    <Tooltip id="vesting">
      <TooltipWrapper value="tooltips.vesting" />
    </Tooltip>
    {/* Pitches */}
    <Tooltip id={ProjectPitches.INTRO}>
      <TooltipWrapper value="tooltips.intro-pitch" />
    </Tooltip>
    <Tooltip id={ProjectPitches.UPDATE}>
      <TooltipWrapper value="tooltips.update-pitch" />
    </Tooltip>
    <Tooltip id={ProjectPitches.INVEST}>
      <TooltipWrapper value="tooltips.invest-pitch" />
    </Tooltip>
    {/* Vesting */}
    <Tooltip id={EVestingSettingsTooltips.TYPE}>
      <TooltipWrapper value="tooltips.vestingSettings.vestingType" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.START_DATE}>
      <TooltipWrapper value="tooltips.vestingSettings.startVestingDate" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.END_DATE}>
      <TooltipWrapper value="tooltips.vestingSettings.endVestingDate" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.PRICE}>
      <TooltipWrapper value="tooltips.vestingSettings.price" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.INVEST_END_DATE}>
      <TooltipWrapper value="tooltips.vestingSettings.investEndDate" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.INVESTMENT_MIN}>
      <TooltipWrapper value="tooltips.vestingSettings.investMin" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.INVESTMENT_MAX}>
      <TooltipWrapper value="tooltips.vestingSettings.investMax" />
    </Tooltip>
    <Tooltip id={EVestingSettingsTooltips.INVESTMENT_TOTAL}>
      <TooltipWrapper value="tooltips.vestingSettings.investTotal" />
    </Tooltip>
    {/* General Settings Tooltips */}
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
));
