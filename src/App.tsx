import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { FungibleTokensProvider } from 'providers/FTProvider';
import { PitchTalkServiceProvider } from 'providers/PitchTalkServiceProvider';
import { WalletSelectorContextProvider } from 'providers/WalletProvider';
import { AppRoutes } from 'routes';
import ErrorBoundary from 'shared/components/error-boundary/ErrorBoundary';
import { Loader } from 'shared/components/loader/Loader';
import { ModalProvider } from 'shared/providers/ModalsProvider';
import { PitchTalkTheme } from 'shared/styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import '@near-wallet-selector/modal-ui/styles.css';
import { PithTalkDataLoaderWrapper } from 'store/PitchTalkDataLoaderWrapper';

import { persistor, store } from './store/store';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={PitchTalkTheme}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <ModalProvider>
              <WalletSelectorContextProvider>
                <FungibleTokensProvider>
                  <PitchTalkServiceProvider>
                    <PithTalkDataLoaderWrapper>
                      <AppRoutes />
                    </PithTalkDataLoaderWrapper>
                  </PitchTalkServiceProvider>
                </FungibleTokensProvider>
              </WalletSelectorContextProvider>
            </ModalProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
