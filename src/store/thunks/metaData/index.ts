/* eslint-disable no-console */
import { compose, createAsyncThunk } from '@reduxjs/toolkit';

import * as metaDataAPI from 'services/api/metaDataAPI';
import {
  SLICE_PREFIX,
  setPartners,
  setPitchTalkMetaData,
} from 'store/slices/metaData';

export const getPartners = createAsyncThunk(
  SLICE_PREFIX + '/partners/getPartners',
  (_, { dispatch }) =>
    metaDataAPI
      .fetchPartnersCount()
      .then((amount) =>
        metaDataAPI
          .fetchPartners(amount || 1)
          .then(compose(dispatch, setPartners))
      )
);

export const getPitchTalkMetaData = createAsyncThunk(
  SLICE_PREFIX + '/pitchtalkMetaData/getPitchTalkMetaData',
  (_, { dispatch }) =>
    metaDataAPI
      .fetchPitchTalkMetaData()
      .then(compose(dispatch, setPitchTalkMetaData))
);
