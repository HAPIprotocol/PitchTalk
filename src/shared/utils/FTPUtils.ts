import { FungibleTokenService } from '@pitchtalk/contract-api-js';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';

import DefaultTokenIcon from 'assets/images/icons/defaultToken-icon.svg';
import wNearIcon from 'assets/images/icons/wNear-icon.svg';
import { WNEAR_SYMBOL } from 'shared/constants';

export const getTokensMeta = async (
  tokenIds: string[],
  FTService: FungibleTokenService
): Promise<{ [key: string]: ITokenMetadata }> => {
  const tokensMetadataResponse = await Promise.allSettled(
    tokenIds.filter(Boolean).map(async (id) => {
      const metadata = await FTService.getMetadata(id);
      if (metadata) {
        if (metadata.symbol.toLowerCase() === WNEAR_SYMBOL)
          metadata.icon = wNearIcon;
        if (!metadata?.icon) metadata.icon = DefaultTokenIcon;
        return metadata ? { id, metadata } : false;
      }
    })
  );
  const tokenMetadata = tokensMetadataResponse
    .map((metadata) => {
      if (metadata.status === 'fulfilled') return metadata.value;
      return null;
    })
    .filter((v) => !!v);
  return tokenMetadata.reduce(
    (acc, curr) => (curr ? { ...acc, [curr.id]: curr.metadata } : acc),
    {}
  );
};
