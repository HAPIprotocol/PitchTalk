import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IParticipantFormModel } from 'pages/participant-form/interfaces';

import { RootState } from '../store';

const initialState = {
  formData: {} as IParticipantFormModel,
};

const submissionFormSlice = createSlice({
  name: 'submissionForm',
  initialState,
  reducers: {
    setSubmissionFormData: (
      state,
      { payload }: PayloadAction<IParticipantFormModel>
    ) => {
      state.formData = payload;
    },
    clearSubmissionFormData: (state) => {
      state.formData = {} as IParticipantFormModel;
    },
  },
});

export const { setSubmissionFormData, clearSubmissionFormData } =
  submissionFormSlice.actions;

export const selectSubmissionFormData = (state: RootState) =>
  state.submissionForm.formData;

export const submissionFormReducer = submissionFormSlice.reducer;
