import {
  createRouterMiddleware,
  createRouterReducer,
} from '@lagunovsky/redux-react-router';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CommentsService } from 'services/sockets/CommentsService';

import { commentsMiddleware } from './middleware/comments';
import { closestPitchReducer } from './slices/closestPitch';
import { commentsReducer } from './slices/comments';
import { donationsReducer } from './slices/donations';
import { eventsReducer } from './slices/events';
import { fundsReducer } from './slices/funds';
import { grantsReducer } from './slices/grants';
import { likesReducer } from './slices/likes';
import { metaDataReducer } from './slices/metaData';
import { pitchesReducer } from './slices/pitches';
import { projectsReducer } from './slices/projects';
import { submissionReducer } from './slices/submission';
import { submissionFormReducer } from './slices/submissionForm';
import { tagsReducer } from './slices/tags';
import { tokenPricesReducer } from './slices/tokenPrices';
import { tokensReducer } from './slices/tokens';
import { userReducer } from './slices/user';
import { vestingReducer } from './slices/vesting';

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const rootReducer = combineReducers({
  projects: projectsReducer,
  pitches: pitchesReducer,
  funds: fundsReducer,
  closestPitch: closestPitchReducer,
  tokens: tokensReducer,
  tokenPrices: tokenPricesReducer,
  grants: grantsReducer,
  vesting: vestingReducer,
  donations: donationsReducer,
  submission: submissionReducer,
  submissionForm: persistReducer(
    { key: 'submissionForm', storage },
    submissionFormReducer
  ),
  user: userReducer,
  events: eventsReducer,
  tags: tagsReducer,
  metaData: metaDataReducer,
  likes: likesReducer,
  history: createRouterReducer(history),
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'donations/setDonations',
          'user/setUserInvestments',
          'tokenPrices/setTokenPrices',
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredPaths: ['donations', 'user', 'tokenPrices'],
      },
    }).concat(routerMiddleware, commentsMiddleware(new CommentsService())),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
