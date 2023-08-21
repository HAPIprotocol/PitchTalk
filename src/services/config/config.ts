export interface IConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
  contract: string;
  subServiceContract: string;
  wrapNearId: string;
  jumboApiUrl: string;
  ipfsHostEnd: string;
  ipfsHostStart: string;
  ipfsToken: string;
  pitchTalkSocialLinks: {
    twitter: string;
    medium: string;
    telegram: string;
    discord: string;
    near_social: string;
  };
  myNearWalletUrl: string;
  serverUrl: string;
  setupEventsFormUrl: string;
  pitchtalkUrl: string;
}
