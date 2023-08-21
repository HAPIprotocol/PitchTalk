import { memo, useEffect, useState } from 'react';

import { ONE_SECOND_IN_MS } from 'shared/constants';
import { formatTimeAgo } from 'shared/utils/dateUtils';

import { useStyles } from '../Comment/styles';

interface ICommentDateProps {
  date: number;
}

export const CommentDate: React.FC<ICommentDateProps> = memo(({ date }) => {
  const classes = useStyles();
  const [time, setTime] = useState(formatTimeAgo(date));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTimeAgo(date));
    }, ONE_SECOND_IN_MS);

    return () => {
      clearInterval(id);
    };
  }, [date]);

  return <span className={classes.commentDate}>{time}</span>;
});
