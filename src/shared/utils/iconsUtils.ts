import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239 } from 'shared/constants';

export const useIconStyles = createUseStyles(() => ({
  eventsIcon: { width: '0.9rem', height: '1.25rem' },
  projectsIcon: { width: '1.53rem', height: '1.25rem' },
  calendarIcon: { width: '1.25rem', height: '1.25rem' },
  howToIcon: { cursor: 'pointer', width: '1.25rem', height: '1.25rem' },
  searchIcon: { cursor: 'pointer', width: '1.25rem', height: '1.25rem' },
  [MAX_WIDTH_1239]: {
    eventsIcon: { width: '0.7rem', height: '0.965rem' },
    projectsIcon: { width: '1.185rem', height: '0.965rem' },
    calendarIcon: { width: '0.965rem', height: '0.965rem' },
    howToIcon: { cursor: 'pointer', width: '0.965rem', height: '0.965rem' },
    searchIcon: {
      cursor: 'pointer',
      width: '0.875rem',
      height: '0.875rem',
      marginTop: '4px',
    },
  },
}));
