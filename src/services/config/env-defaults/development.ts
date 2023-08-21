import { IConfig } from '../config';

export default {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  // contract: 'r-pt.rkonoval.testnet',
  // subServiceContract: 'ss-pt.rkonoval.testnet',
  contract: 'dev-1690550042298-26477616437711',
  subServiceContract: 'dev-1683830040036-42246149866806',
  wrapNearId: 'wrap.testnet',
  jumboApiUrl: 'https://jumbo-ps.stage.hapi.farm',
  serverUrl: 'http://localhost:3000',
  ipfsHostEnd: '.ipfs.dweb.link',
  ipfsHostStart: 'https://',
  setupEventsFormUrl: '',
  pitchtalkUrl: 'https://pitchtalk.stage.hapi.farm/',
} as IConfig;
