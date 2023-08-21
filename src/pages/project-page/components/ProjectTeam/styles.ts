import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '64px',
    marginBottom: '64px',
    [MAX_WIDTH_767]: {
      width: '100%',
      maxWidth: '320px',
      marginInline: 'auto',
    },
  },
  teamContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    width: '100%',
    [MAX_WIDTH_767]: {
      gap: '12px',
    },
  },
  teamMember: {
    width: '154px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  memberImg: {
    width: '140px',
    height: '140px',
    objectFit: 'contain',
    borderRadius: '50%',
    marginBottom: '12px',
    background: theme.colors.teamMemberBg,
    border: `1px solid ${theme.colors.teamMemberBg}`,
  },
  memberName: {
    marginBlock: '0px',
    fontSize: '1.25rem',
    lineHeight: '1.625rem',
    textAlign: 'center',

    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 2,
  },
  memberPosition: {
    marginBlock: '2px 0px',
    fontSize: '0.75rem',
    lineHeight: '1.05rem',
    color: theme.colors.lightGrey,
    textAlign: 'center',

    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 2,
  },

  socialLinks: {
    marginTop: 'auto',
    paddingTop: '12px',
    justifySelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  socialLink: {
    cursor: 'pointer',
    '& path': { fill: theme.colors.white },
  },
}));
