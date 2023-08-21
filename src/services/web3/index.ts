import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskSDK from '@metamask/sdk';
import { toast } from 'react-toastify';
import Web3 from 'web3';

import { pitchtalkUrl } from 'services/config';
import { errorToastOptions } from 'shared/components/toast-link/ToastLink';

class Web3Service {

  private web3Instance?: Web3;
  private metamaskSDK?: MetaMaskSDK;

  public async getMetamaskAddress(): Promise<string | void> {
    await this.detectMetamask();

    const accounts = await this.web3Instance?.eth.getAccounts();
    const address = accounts?.[0];
    return address;
  }

  public async signMessage(nonce: string, address: string): Promise<string> {
    await this.detectMetamask();

    const message = await (this.web3Instance?.eth as any)
      .personal
      .sign(this.web3Instance?.utils.fromUtf8(nonce), address, '');

    return message;
  }

  private async detectMetamask(): Promise<void> {
    const provider = await detectEthereumProvider({mustBeMetaMask: true});

    if (!provider || !provider.isMetaMask) {
      toast.error('Metamask is not defined', errorToastOptions);
      return;
    }
    await (window as any)?.ethereum?.enable();
    this.web3Instance = new Web3((window as any).ethereum);
    if (!this.web3Instance) throw new Error();
  }

  public prepareMessage(nonce: string): string | undefined {
    this.web3Instance = new Web3((window as any).ethereum);
    const result = this.web3Instance?.utils.fromUtf8(nonce);
    return result
  }

  public async initMetamaskSDK() {
    this.metamaskSDK = new MetaMaskSDK({
      injectProvider: true,
      dappMetadata: { name: 'Pitchtalk', url: pitchtalkUrl },
      preferDesktop: false,
      useDeeplink: true,
    });

    return new Promise((res) => setTimeout(res, 300));
  }
}

const web3Service = new Web3Service();
export default web3Service;