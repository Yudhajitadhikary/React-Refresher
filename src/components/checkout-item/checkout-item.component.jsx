import './checkout-item.styles.scss';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useSelector,useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart,addItemToCart,removeItemToCart } from '../../store/cart/cart.action';
const CheckoutItem = ({ cartItem }) => {        

    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch=useDispatch();
    const cartItems = useSelector(selectCartItems);
    // const { clearItemFromCart,addItemToCart,removeItemToCart } = useContext(CartContext);
    const clearItemHandler = () => {
        dispatch(clearItemFromCart(cartItems,cartItem));
    }
    const addItemToCartHandler = () => {
        dispatch(addItemToCart(cartItems,cartItem));
    }
    const removeItemToCartHandler = () => { 
        dispatch(removeItemToCart(cartItems,cartItem));
    }
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>    
            <div className='arrow'>
                <span onClick={removeItemToCartHandler}>&#10094;</span>   
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow'>
                <span onClick={addItemToCartHandler}>&#10095;</span>   
            </div> 
            </span> 
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    )
}
export default CheckoutItem;