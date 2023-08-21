# PitchTalk

  PitchTalk is a platform for communication between projects, investors, and communities. We help to overcome hurdles and reach the pinnacles of success through open and effective communication in form of Pitch Sessions, DemoDays and Hackathons.

  Being fully on-chain, PitchTalk does its best to provide users with the best experience while using the platform. 
However, being fully onchain causes lots of inconveniences for users from other ecosystems. While growing and building, our team received many compliments and interests from projects in other chains. So, now we are working on creating a crosschain solution for helping any project in any blockchain to:
become a part of our platform;
 - be involved in Events, Pitch Sessions or Hackathons;
 - communicate with funds, receive donations and grants;
 - build a better WEB3 community with a crystal-clear social proof;

We've used Metamask SDK in PitchTalk, so every user of Metamask Wallet in any supported blockchain can: 
 - interact with our platform; 
 - create his own Project and become a part of the community by participating in events; 
 - leave onchain comments and likes, thus building true social proof for the audience and VCs.

## Metamask SDK in code 

The application has internal [WEB3Service](./src/services/web3/index.ts) which is creating for handling connection with metamask and some internal utils. 

The function [`initMetamaskSDK`](src/services/web3/index.ts?plain=50) is responsible for creating MetaMaskSDK instance and provide `ethereum` object in global `window`;

```
 public async initMetamaskSDK() {
    this.metamaskSDK = new MetaMaskSDK({
      injectProvider: true,
      dappMetadata: { name: 'Pitchtalk', url: pitchtalkUrl },
      preferDesktop: false,
      useDeeplink: true,
    });

    return new Promise((res) => setTimeout(res, 300));
  }
```

When user confirms authorization by metamask, he prompted to sign the secret message from the backend and send it.
On the server, auth service compares the signature and if it is ok - returns jwt tokens to the user. 
The core logic handled by redux thunk [`authWithMetamaskSDK`](src/store/thunks/user/index.ts?plain=84)

```
export const authWithMetamaskSDK = () => async (dispatch: AppDispatch) => {
  try {
    if (!window.ethereum) {
      await web3Service.initMetamaskSDK();
    }
    const ethereum = window.ethereum as SDKProvider;
    const addresses = await ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    });
    const address: string = (addresses as any)?.[0] || '';
    if (!address) return;
    const nonce = await authAPI.fetchMetamaskNonce(address);
    const message = web3Service.prepareMessage(nonce);

    const toast = ToastLink(
      '',
      'Confirm your action in Metamask',
      ToastType.Success
    );
    const signed = await ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });

    const { accessToken, refreshToken } = await authAPI.loginWithMetamask(
      address,
      signed as string
    );

    if (accessToken && refreshToken) {
      setItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);
      setItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN, refreshToken);
    }
    const accessTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
    const refreshTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN);
    if (accessTokenStorage && refreshTokenStorage) {
      dispatch(getUserData());
      dispatch(getUserProjects());
    }
  } catch (error) {
    const toast = ToastLink(
      '',
      'Something when wrong. Please, try again',
      ToastType.Error
    );
  }
};
```

## Running localy

```
  npm install
  npm run start
```

Don't forget to create an `.env` file. You might just copy `.env.example` with `REACT_APP_NEAR_ENV=testnet`.