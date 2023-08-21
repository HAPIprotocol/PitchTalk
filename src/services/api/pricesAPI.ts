/* eslint-disable no-console */
import axios from 'axios';
import { BigSource } from 'big.js';

import { jumboApiUrl } from 'services/config';

import { parseData } from './index';

export const fetchTokenPricesFromJumbo = () =>
  axios
    .get<{ id: string; price?: BigSource }[]>(`${jumboApiUrl}/token-prices`)
    .then(parseData);
