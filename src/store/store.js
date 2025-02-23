import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {rootReducer} from './root-reducer';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import CreateSagaMIddleware from 'redux-saga';
import {rootSaga} from './root-saga';
const persistConfig={
    key:'root',
    storage,
    blacklist:['cart']
}
const sagaMiddleware=CreateSagaMIddleware();
const persistedReducer=persistReducer(persistConfig,rootReducer);
const middleWares=[process.env.NODE_ENV!=='production' && logger,sagaMiddleware].filter(Boolean);

const composeEnhancer=(process.env.NODE_ENV!=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)||compose;
const composedEnhancers=composeEnhancer(applyMiddleware(...middleWares));
// root-reducer
export const store=createStore(persistedReducer,undefined,composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor=persistStore(store);