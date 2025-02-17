// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';   
import './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {CartIconContainer,CartItemCount,ShoppingIcon} from './cart-icon.styles.jsx';
const CartIcon = () => {   
    const{ isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);   
    const toogleCartOpen=()=>{
        setIsCartOpen(!isCartOpen);  
    }
return(
    <CartIconContainer onClick={toogleCartOpen}>
        <ShoppingIcon/>
        <CartItemCount>{cartCount}</CartItemCount>
    </CartIconContainer>
)
}
export default CartIcon;