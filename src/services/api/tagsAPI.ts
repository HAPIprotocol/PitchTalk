import { ITag } from '@pitchtalk/contract-api-js/dist/interfaces';

import { API_ROUTES } from './config';
import { fetchAPI, parseData } from './index';

export const fetchTags = (limit: number) =>
  fetchAPI.get<ITag[]>(`${API_ROUTES.tags}?limit=${limit}`).then(parseData);

export const fetchTagsCount = () =>
  fetchAPI.get<number>(API_ROUTES.tagsCount).then(parseData);
