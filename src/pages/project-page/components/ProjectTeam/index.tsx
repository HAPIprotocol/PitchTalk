import { ITeam } from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import { memo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { SocialLink } from 'shared/components/social-link/SocialLink';

import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

interface IProjectTeamProps {
  team: ITeam;
}

export const ProjectTeam: React.FC<IProjectTeamProps> = memo(({ team }) => {
  const classes = useStyles();

  if (isEmpty(team)) return null;

  return (
    <div className={classes.container}>
      <SectionTitle title={t('projectCabinetPage.team')} />
      <div className={classes.teamContainer}>
        {Object.entries(team).map(([walletId, user]) => (
          <div className={classes.teamMember} key={walletId + user.logo}>
            <img
              className={classes.memberImg}
              src={getCorrectIPFSLinks({ logo: user.logo }).logo}
            />
            <p className={classes.memberName}>
              {user.first_name + ' ' + user.last_name}
            </p>
            <p className={classes.memberPosition}>{user.position}</p>
            <div className={classes.socialLinks}>
              {Object.entries(user.social_links).map(
                (link: [string, string], ind) =>
                  link[1] ? (
                    <SocialLink
                      width={16}
                      height={16}
                      key={ind}
                      link={link}
                      styles={classes.socialLink}
                    />
                  ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
