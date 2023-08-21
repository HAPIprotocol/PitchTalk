import { Filelike, PutOptions, Web3Storage } from 'web3.storage';

import { ipfsToken } from 'services/config';

interface IIPFSService {
  uploadFile: (
    file: Iterable<Filelike>,
    options?: PutOptions
  ) => Promise<string>;
}

class IPFSService implements IIPFSService {
  private _storage: Web3Storage;

  constructor(token: string) {
    this._storage = new Web3Storage({ token });
  }

  public async uploadFile(
    file: Iterable<Filelike>,
    options?: PutOptions
  ): Promise<string> {
    try {
      const cid = await this._storage.put(file, {
        maxRetries: 3,
        wrapWithDirectory: false,
        ...options,
      });
      return cid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const ipfsService = new IPFSService(ipfsToken);
