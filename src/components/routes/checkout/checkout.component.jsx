import './checkout.styles.scss';
import {useSelector} from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../../store/cart/cart.selector';
// import { useContext } from 'react';
// import { CartContext } from '../../../contexts/cart.context';
import CheckoutItem from '../../checkout-item/checkout-item.component';
import PaymentForm from '../../payment-form/payment-form.component';
const Checkout = () => {
    // const {cartItems,cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    return (
        <div className='checkout-container'>
            <h1>Checkout</h1>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                    </div>
                <div className='header-block'>
                    <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantity</span>
                    </div>
                    <div className='header-block'>
                        <span>Price</span>
                    </div>
                    <div className='header-block'>
                        <span>Remove</span>
                    </div>

            </div>
            
            <div>
                {cartItems.map(item => {
                    return (
                        <CheckoutItem key={item.id} cartItem={item} />
                    )
                })}
                <span className='total'>Total:${cartTotal}</span>
                <PaymentForm />
            </div>
        </div>
    )
}

export default Checkout