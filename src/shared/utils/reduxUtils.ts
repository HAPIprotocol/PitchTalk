import { AsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from 'store/store';

export type ThunkAPIType = { dispatch: AppDispatch; state: RootState };

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, ThunkAPIType>;

export enum ACTION_STATE {
  PENDING = 'pending',
  REJECTED = 'rejected',
  FULFILLED = 'fulfilled',
}

export type PendingAction = ReturnType<GenericAsyncThunk[ACTION_STATE.PENDING]>;
export type RejectedAction = ReturnType<
  GenericAsyncThunk[ACTION_STATE.REJECTED]
>;
export type FulfilledAction = ReturnType<
  GenericAsyncThunk[ACTION_STATE.FULFILLED]
>;

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith('/pending');

export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith('/rejected');

export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => action.type.endsWith('/fulfilled');
