// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';   
import './cart-icon.styles.jsx';
import { useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen} from '../../store/cart/cart.action.js';
import { CartContext } from '../../contexts/cart.context';
import {CartIconContainer,CartItemCount,ShoppingIcon} from './cart-icon.styles.jsx';
const CartIcon = () => {   
    // const{ isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);   
    const dispatch=useDispatch();
    const cartCount=useSelector(selectCartCount);
    const isCartOpen=useSelector(selectIsCartOpen);
    const toogleCartOpen=()=>{
            dispatch(setIsCartOpen(!isCartOpen));
        
    }
    // const cartCount=useSelector(selectCartCount);
    //     const toogleCartOpen=()=>{       
        // setIsCartOpen(!isCartOpen);  
    
return(
    <CartIconContainer onClick={toogleCartOpen}>
        <ShoppingIcon/>
        <CartItemCount>{cartCount}</CartItemCount>
    </CartIconContainer>
)
}
export default CartIcon;