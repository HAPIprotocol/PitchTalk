import { useEffect, useState } from 'react';

import { ONE_SECOND_IN_MS } from 'shared/constants';

export const useConditionInterval = (
  condition: () => boolean,
  timeout = 5 * ONE_SECOND_IN_MS,
  timeoutToStartInterval = 0
) => {
  const [isIntervalEnded, setIsIntervalEnded] = useState(condition());

  useEffect(() => {
    if (isIntervalEnded) return;
    let checkInterVal: NodeJS.Timer;

    const timeoutVal = setTimeout(() => {
      checkInterVal = setInterval(() => {
        if (condition()) {
          setIsIntervalEnded(true);
          clearInterval(checkInterVal);
        }
      }, timeout);
    }, timeoutToStartInterval);

    return () => {
      checkInterVal && clearInterval(checkInterVal);
      clearTimeout(timeoutVal);
    };
  }, []);

  return isIntervalEnded;
};
