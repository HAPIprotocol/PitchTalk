import { FungibleTokenService } from '@pitchtalk/contract-api-js';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { nodeUrl } from 'services/config';
import {
  DEFAULT_TOKEN_SYMBOL,
  DEFAULT_NEAR_DECIMALS,
  ZERO,
} from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { getTokensMeta } from 'shared/utils/FTPUtils';
import { getAmountFormatted } from 'shared/utils/near';
import { selectTokens, setToken, setTokens } from 'store/slices/tokens';
import { selectAccountId } from 'store/slices/user';

export interface ITokenBalance {
  balance: string;
  symbol: string;
  decimals: number;
}

interface IFungibleTokensContext {
  FTService: FungibleTokenService | null;
  getBalance: (tokenId: string) => Promise<ITokenBalance>;
  addToken: (tokenId: string) => Promise<void>;
  addTokens: (tokenIds: string[]) => Promise<void>;
}

export const emptyBalance: ITokenBalance = {
  balance: ZERO,
  symbol: DEFAULT_TOKEN_SYMBOL,
  decimals: DEFAULT_NEAR_DECIMALS,
};

const initialState: IFungibleTokensContext = {
  FTService: null,
  getBalance: async () => emptyBalance,
  addToken: async () => undefined,
  addTokens: async () => undefined,
};

const FungibleTokensContext =
  createContext<IFungibleTokensContext>(initialState);

export const useFungibleTokensContext = () => useContext(FungibleTokensContext);

export const FungibleTokensProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const accountId = useAppSelector(selectAccountId);
  const [FTService, setFTService] = useState<FungibleTokenService | null>(null);

  useEffect(() => {
    const instance = new FungibleTokenService(nodeUrl);
    setFTService(instance);
  }, []);

  const addTokens = useCallback(
    async (tokenIds: string[]) => {
      try {
        if (!FTService) return;
        const tokens = await getTokensMeta(tokenIds, FTService);
        dispatch(setTokens(tokens));
      } catch (error) {
        console.warn('Error during fetching tokens metadata: ' + error);
      }
    },
    [FTService, dispatch]
  );

  const addToken = useCallback(
    async (tokenId: string) => {
      try {
        if (!FTService) return;

        const tokenMetadata = await FTService.getMetadata(tokenId);
        if (!tokenMetadata) {
          console.warn(`Can't resolve metadata for current token - ${tokenId}`);
          return;
        }

        dispatch(setToken({ tokenId, ...tokenMetadata }));
      } catch (error) {
        console.warn(
          `Error during fetching token metadata for '${tokenId}': ${error}`
        );
      }
    },
    [FTService, dispatch]
  );

  const getBalance = useCallback(
    async (tokenId: string): Promise<ITokenBalance> => {
      try {
        if (!FTService) return { ...emptyBalance, symbol: tokenId };

        const tokenMetadata = tokens?.[tokenId];
        if (!tokenMetadata) {
          await addToken(tokenId);
          return {
            ...emptyBalance,
            symbol: tokenId,
            decimals: DEFAULT_NEAR_DECIMALS,
          };
        }
        const balance = await FTService.getBalanceOf({
          accountId,
          ftTokenId: tokenId,
        });
        const balanceWithDecimals = getAmountFormatted(
          balance || '0',
          tokenMetadata.decimals,
          tokenMetadata.decimals
        );

        return {
          balance: balanceWithDecimals,
          symbol: tokenMetadata.symbol || tokenId,
          decimals: tokenMetadata.decimals,
        };
      } catch (error) {
        console.warn(error);
        return emptyBalance;
      }
    },
    [FTService, tokens, accountId, addToken]
  );

  const contextValue: IFungibleTokensContext = useMemo(
    () => ({
      FTService,
      getBalance,
      addToken,
      addTokens,
    }),
    [getBalance, addToken, addTokens, FTService]
  );

  return (
    <FungibleTokensContext.Provider value={contextValue}>
      {children}
    </FungibleTokensContext.Provider>
  );
};
