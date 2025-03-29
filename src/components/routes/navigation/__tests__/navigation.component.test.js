import {screen,fireEvent} from '@testing-library/react';
import * as reactRedux from 'react-redux';
import Navigation from '../navigation.component';
import {renderWithProviders} from '../../../../utils/test/test.utils';

describe('Navigation tests', () => {
   test('It should render a Sign in link if there is no currentUser',()=>{
        renderWithProviders(
                <Navigation/>, {
                    preloadedState: {
                        user: {
                            currentUser: null
                        }
                    },
                }
        );
        const SignInLink = screen.getByText('Sign in');
        expect(SignInLink).toBeInTheDocument();
   })
   test('It should render a Sign out link if there is a currentUser',()=>{
        renderWithProviders(
                <Navigation/>, {
                    preloadedState: {
                        user: {
                            currentUser: {
                                displayName: 'Test User'
                            }
                        }
                    },
                }
        );
        const SignOutLink = screen.getByText('Sign out');
        expect(SignOutLink).toBeInTheDocument();
        const signInLinkElement = screen.queryByText('Sign in');
        expect(signInLinkElement).not.toBeNull();
   })
   test('It should render a cart dropdown if isCartHidden is false',()=>{
        renderWithProviders(
                <Navigation/>, {
                    preloadedState: {
                        cart: {
                            isCartOpen:false,
                            cartItems: []
                        }
                    },
                }
        );
        const dropdownTextElement= screen.queryByText(/Your cart is empty/i);
        expect(dropdownTextElement).not.toBeNull();
   }
   )
   test('It should render a cart dropdown if isCartHidden is true',()=>{
        renderWithProviders(
                <Navigation/>, {
                    preloadedState: {
                        cart: {
                            isCartOpen:true,
                            cartItems: []
                        }
                    },
                }
        );
        const CartDropdown = screen.getByText(/your cart is empty/i);
        expect(CartDropdown).toBeInTheDocument();
   })
   
}); 