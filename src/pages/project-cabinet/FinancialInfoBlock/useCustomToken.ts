import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import { useFungibleTokensContext } from 'providers/FTProvider';
import { ONE_SECOND_IN_MS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectTokens } from 'store/slices/tokens';

export const useCustomToken = () => {
  const tokens = useAppSelector(selectTokens);
  const { FTService, addToken } = useFungibleTokensContext();
  const [tokenLink, setTokenLink] = useState<string | undefined>(undefined);
  const [tokenMeta, setTokenMeta] = useState<ITokenMetadata | undefined>();

  const fetchTokenMeta = useCallback(
    debounce(async (tokenId: string) => {
      if (!FTService) return;
      const data = await FTService.getMetadata(tokenId);
      setTokenMeta(data || undefined);
      if (
        data &&
        Object.keys(tokens).length &&
        !Object.keys(tokens).includes(tokenId)
      ) {
        addToken(tokenId);
      }
    }, ONE_SECOND_IN_MS),
    []
  );

  const onTokenLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tokenId = e.target.value;
    fetchTokenMeta(tokenId);
    setTokenLink(tokenId);
  };
  return {
    tokenLink,
    tokenMeta,
    onTokenLinkChange,
  };
};
