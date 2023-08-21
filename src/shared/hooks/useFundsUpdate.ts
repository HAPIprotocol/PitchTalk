import { useEffect } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { setFunds } from 'store/slices/funds';
import { setSubmissionFunds } from 'store/slices/submission';

import { useAppDispatch } from './redux-hooks';

export const useFundsUpdate = () => {
  const { subServiceActions, pitchTalkService } = usePitchTalkServiceContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pitchTalkService) return;
    const updateAllFunds = async () => {
      try {
        const funds = await pitchTalkService.getFunds();
        const subFunds = await subServiceActions.getSubmissionFunds();
        if (funds && funds.length) dispatch(setFunds(funds));
        if (subFunds && subFunds.length) dispatch(setSubmissionFunds(subFunds));
      } catch (e) {
        console.warn(e);
      }
    };
    updateAllFunds();
  }, [dispatch, pitchTalkService, subServiceActions]);
};
