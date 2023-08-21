/* eslint-disable no-console */
import { compose } from '@reduxjs/toolkit';

import * as tagsAPI from 'services/api/tagsAPI';
import { setTags } from 'store/slices/tags';
import { AppDispatch } from 'store/store';

export const getTags = () => (dispatch: AppDispatch) =>
  tagsAPI
    .fetchTagsCount()
    .then((amount) =>
      tagsAPI.fetchTags(amount).then(compose(dispatch, setTags))
    )
    .catch(console.error);
