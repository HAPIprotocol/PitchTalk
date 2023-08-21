import {
  IPartner,
  IPitchtalkMetadata,
} from '@pitchtalk/contract-api-js/dist/interfaces';

import { API_ROUTES } from './config';
import { fetchAPI, parseData } from './index';

export const fetchPartners = (limit: number) =>
  fetchAPI
    .get<IPartner[]>(`${API_ROUTES.partners}?limit=${limit}`)
    .then(parseData);

export const fetchPartnersCount = () =>
  fetchAPI.get<number>(API_ROUTES.partnersCount).then(parseData);

export const fetchPitchTalkMetaData = () =>
  fetchAPI.get<IPitchtalkMetadata>(`${API_ROUTES.metaData}`).then(parseData);
