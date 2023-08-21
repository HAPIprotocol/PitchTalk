import {
  IPartner,
  IPitchtalkMetadata,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const SLICE_PREFIX = 'metaData';

export interface IPartnersData {
  partners: IPartner[];
  pitchTalkMetaData: IPitchtalkMetadata | null;
  isLoading: boolean;
}

const initialState: IPartnersData = {
  partners: [] as IPartner[],
  pitchTalkMetaData: { hackers: 0, investors: 0, funded: 0 },
  isLoading: false,
};

const metaDataSlice = createSlice({
  name: SLICE_PREFIX,
  initialState,
  reducers: {
    setPartners: (state, { payload }: PayloadAction<IPartner[]>) => {
      state.partners = payload;
    },
    setPitchTalkMetaData: (
      state,
      { payload }: PayloadAction<IPitchtalkMetadata | null>
    ) => {
      state.pitchTalkMetaData = payload;
    },
  },
});

export const { setPartners, setPitchTalkMetaData } = metaDataSlice.actions;

export const selectPartners = (state: RootState) => state.metaData.partners;

export const selectPitchtalkMetaData = (state: RootState) =>
  state.metaData.pitchTalkMetaData;

export const selectMetaDataIsLoading = (state: RootState) =>
  state.metaData.isLoading;

export const metaDataReducer = metaDataSlice.reducer;
