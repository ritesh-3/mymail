// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import emailReducer from './emailSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, emailReducer);

const store = configureStore({
  reducer: {
    email: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
