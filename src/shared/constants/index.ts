import { utils } from '@pitchtalk/contract-api-js';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import Big from 'big.js';

import nearIcon from 'assets/images/icons/near-icon.png';
import usdtIcon from 'assets/images/icons/usdt-icon.png';

export enum EDimensions {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LAPTOP = 'LAPTOP',
  DESKTOP = 'DESKTOP',
  UNKNOWN = 'UNKNOWN',
}
export const NEAR_TOKEN_ID = 'NEAR';

export const USE_JOINED_QUERY = '?joined=true';

export const FT_TRANSFER_GAS: string = utils.format.parseNearAmount(
  '0.00000000003'
) as string;
export const DEFAULT_NEAR_DECIMALS = 24;
export const BASE = 10;

export const DEFAULT_TOKEN_SYMBOL = 'USDT';

// As new Big() is immutable and it always return the new Big value instead of the current instance;
export const ZERO_BIG = new Big(0);
export const ZERO = '0';

export const DESKTOP_WIDTH = 1440;
export const LAPTOP_WIDTH = 1240;
export const TABLET_WIDTH = 768;

export const MAX_WIDTH_1439 = '@media (max-width: 1439px)';
export const MAX_WIDTH_1239 = '@media (max-width: 1239px)';
export const MAX_WIDTH_767 = '@media (max-width: 767px)';
export const MAX_WIDTH_350 = '@media (max-width: 350px)';
export const MAX_WIDTH_320 = '@media (max-width: 320px)';

export const DEBOUNCE_300 = 300;

export const SEARCH_TRIGGER_LENGTH = 2;
export const DEFAULT_PAGINATION_REQUEST = 10;
export const FINANCIAL_PAGINATION_REQUEST = 32;

export const PRECISION_BALANCE = 3;
export const MAX_AMOUNT_PRECISION = 21;

export const TIME_PERIOD = 60;

export const ONE_SECOND_IN_MS = 1000;
export const ONE_MINUTE_IN_MS = TIME_PERIOD * ONE_SECOND_IN_MS;
export const FIFTEEN_SECONDS = 15 * ONE_SECOND_IN_MS;

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const FIVE_MINUTES = ONE_MINUTE_IN_MS * 5;
export const TEN_MINUTES = ONE_MINUTE_IN_MS * 10;
export const THIRTY_SECONDS = ONE_MINUTE_IN_MS / 2;

export const MIN_PITCH_DURATION_MINUTES = 2;
export const MAX_PITCH_DURATION_MINUTES = 120;
export const MIN_PERCENT = 0;
export const MAX_PERCENT = 100;

export const DESCRIPTION_LENGTH = 1000;

export const PREVIEW_PITCH_DELAY = 1000 * 60 * 60;

export const WNEAR_SYMBOL = 'wnear';
export const NEAR_TOKEN_NAME = 'NEAR';
export const USDT_TOKEN_NAME = 'USDT';

export const EMPTY_STRING = '';

export const URL_CONST =
  // eslint-disable-next-line max-len, no-useless-escape
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const MAX_LENGTH = 1000;
export const DEFAULT_TOKEN_DATA = {
  decimals: DEFAULT_NEAR_DECIMALS,
  symbol: DEFAULT_TOKEN_SYMBOL,
};

export type TokenData = {
  decimals: number;
  symbol: string;
  price: Big;
  icon: string;
};

export const DEFAULT_TOKEN: TokenData = {
  ...DEFAULT_TOKEN_DATA,
  icon: usdtIcon,
  price: ZERO_BIG,
};

export const PARTICIPATE_BANNER_SHOWN = 'PARTICIPATE_BANNER_SHOWN';

export const readOnlyOnChange = () => void {};

export const NANO_SEC_IN_MS = 1000000;

export const ACCEPTABLE_DOCS = '.doc,.txt,.pdf';

export const NEAR_METADATA: ITokenMetadata = {
  version: '',
  name: NEAR_TOKEN_ID,
  symbol: NEAR_TOKEN_ID,
  reference: '',
  decimals: DEFAULT_NEAR_DECIMALS,
  icon: nearIcon,
};

export const SUB_FUND_INITIAL = {
  name: EMPTY_STRING,
  logo: EMPTY_STRING,
  site: EMPTY_STRING,
  wallet: EMPTY_STRING,
};

export enum EPromiseStatus {
  FULFILLED = 'fulfilled',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export const PARAMS = {
  PITCH_ID: ':pitchId',
  PROJECT_ID: ':projectId',
  EVENT_ID: ':eventId',
  REFEREE_ID: ':refereeId',
  PARTICIPATION_ID: ':participationId',
  USER_ID: ':userId',
};

export const COMMENTS_MAX_LENGTH = 500;
export const PAGINATION_PAGE = 1;
export const PAGINATION_LIMIT = 10;

export const COMMENT_DELAY = 15 * ONE_SECOND_IN_MS;

export const COMMENTS_REFETCH_TIMEOUT = 30 * ONE_SECOND_IN_MS;
