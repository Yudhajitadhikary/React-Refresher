import React from 'react';
import ReactDOM from 'react-dom/client';
// import { UserProvider } from './contexts/user.context';
// import { CategoriesProvider } from './contexts/products.context';
// import { CartProvider } from './contexts/cart.context';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import {Elements} from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';
import {store,persistor} from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter> 
    {/* <UserProvider> */}
      {/* <CategoriesProvider> */}
        {/* <CartProvider> */}
        <Elements stripe={stripePromise}>
          <App />
          </Elements>
        {/* </CartProvider> */}
    {/* </CategoriesProvider> */}
    {/* </UserProvider> */}
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


