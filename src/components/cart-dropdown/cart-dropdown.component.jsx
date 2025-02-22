import './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.js';
// import {useContext} from 'react';
import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles.jsx';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';
// import { CartContext } from '../../contexts/cart.context';
const CartDropdown = () => {
    const cartItems=useSelector(selectCartItems);
    const navigate=useNavigate();
    const goToCheckoutHandler=()=>{
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>

            <CartItems>
{cartItems.length?(cartItems.map((item)=>(< CartItem key={item.id} cartItem={item}/>))):(<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}   

export default CartDropdown;