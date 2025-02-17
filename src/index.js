import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <App />
        </CartProvider>
    </CategoriesProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


