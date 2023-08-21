import { format } from 'date-fns';
import { CSSProperties, memo } from 'react';
import { areEqual } from 'react-window';

import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import defaultTokenIcon from 'assets/images/icons/defaultToken-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { PitchStatusLabel } from 'shared/components/pitch-status-label/PitchStatusLabel';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { DEFAULT_TOKEN_SYMBOL } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { PitchWithProjectData } from 'shared/interfaces';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';
import { selectTokens } from 'store/slices/tokens';

import { useStyles } from './styles';

export const PitchesCard: React.FC<{
  data: PitchWithProjectData[];
  index: number;
  style: CSSProperties;
}> = memo(({ data, index, style }) => {
  const pitch = data?.[index] || {};
  const { banner } = getCorrectIPFSLinks({ banner: pitch?.project?.banner });
  const classes = useStyles({ banner });
  const tokens = useAppSelector(selectTokens);

  const { icon, symbol } = tokens?.[pitch?.project?.ft_token_id] || {
    icon: defaultTokenIcon,
    symbol: pitch?.project?.ft_token_id || DEFAULT_TOKEN_SYMBOL,
  };

  const startDate = pitch && format(pitch.starts_on, 'PP p');

  const navigate = useNavigate();

  const redirectToProject = () =>
    navigate(
      `${APP_ROUTES.PROJECTS}/${pitch?.project?.project_id}?stage=${pitch.stage}`
    );

  return (
    <div style={{ ...style, width: '99%' }} key={index}>
      <div className={classes.container} onClick={redirectToProject}>
        <div className={classes.titleRow}>
          <div className={classes.eventTitle}>
            <abbr className={classes.eventName} title={pitch.name}>
              {pitch.name}
            </abbr>
            <abbr className={classes.speakerName} title={pitch.speaker_name}>
              {pitch.speaker_name}
            </abbr>
          </div>
          <PitchStatusLabel
            stage={pitch.stage}
            extraClasses={classes.statusTag}
          />
        </div>
        <div className={classes.footerRaw}>
          <div className={classes.eventDate}>
            <CalendarIcon />
            {startDate}
          </div>
          <div className={classes.eventToken}>
            {pitch?.project?.ft_token_id ? (
              <>
                <img src={icon} loading="lazy" />
                <span>{symbol}</span>
              </>
            ) : null}
          </div>
          <div className={classes.eventSocials}>
            <SocialLink
              link={['web_url', pitch.project.project_url || '']}
              styles={classes.socialLink + ' web-icon'}
            />
            {pitch?.project?.social_links &&
              Object.entries(normalizeIcons(pitch.project.social_links)).map(
                (link: [string, string], ind) => (
                  <SocialLink
                    key={ind}
                    link={link}
                    styles={classes.socialLink}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}, areEqual);
