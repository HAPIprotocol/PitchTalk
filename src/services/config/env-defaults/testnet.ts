import { IConfig } from '../config';

export default {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  contract: 'v3.pitchtalk.testnet',
  subServiceContract: 'submission-service-v2.pitchtalk.testnet',
  wrapNearId: 'wrap.testnet',
  jumboApiUrl: 'https://jumbo-ps.stage.hapi.farm',
  serverUrl: 'https://pitchtalk-api.stage.hapi.farm',
  ipfsHostEnd: '.ipfs.dweb.link',
  ipfsHostStart: 'https://',
  setupEventsFormUrl: '',
  pitchtalkUrl: 'https://pitchtalk.stage.hapi.farm/',
} as IConfig;
