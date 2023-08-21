import { ESocialLinksKeys } from '@pitchtalk/contract-api-js/dist/core';

import { IConfig } from './config';
import development from './env-defaults/development';
import mainnet from './env-defaults/mainnet';
import testnet from './env-defaults/testnet';

enum EEnvironment {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
  DEVELOPMENT = 'development',
}

const environments: { [key in EEnvironment]: IConfig } = {
  [EEnvironment.MAINNET]: mainnet,
  [EEnvironment.TESTNET]: testnet,
  [EEnvironment.DEVELOPMENT]: development,
};

const currentEnvironment: EEnvironment =
  (process.env.REACT_APP_NEAR_ENV as EEnvironment) || EEnvironment.DEVELOPMENT;

export const {
  networkId,
  nodeUrl,
  walletUrl,
  helperUrl,
  explorerUrl,
  contract,
  subServiceContract,
  pitchTalkSocialLinks,
  wrapNearId,
  myNearWalletUrl,
  jumboApiUrl,
  ipfsHostEnd,
  ipfsHostStart,
  ipfsToken,
  serverUrl,
  setupEventsFormUrl,
  pitchtalkUrl,
}: IConfig = {
  ...environments[currentEnvironment],
  pitchTalkSocialLinks: {
    [ESocialLinksKeys.TWITTER]: process.env.REACT_APP_TWITTER_URL || '',
    [ESocialLinksKeys.MEDIUM]: process.env.REACT_APP_MEDIUM_URL || '',
    [ESocialLinksKeys.TELEGRAM]: process.env.REACT_APP_TELEGRAM_URL || '',
    [ESocialLinksKeys.DISCORD]: process.env.REACT_APP_DISCORD_URL || '',
    [ESocialLinksKeys.NEAR_SOCIAL]: process.env.REACT_APP_NEAR_SOCIAL_URL || '',
  },
  myNearWalletUrl:
    environments[currentEnvironment] === environments.mainnet
      ? 'https://app.mynearwallet.com/'
      : 'https://testnet.mynearwallet.com/',
  ipfsToken: process.env.REACT_APP_IPFS_TOKEN || '',
};
