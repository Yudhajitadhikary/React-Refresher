import createReducer from '../../utils/reducer/reducer.utils'

const addCartItem=(cartItems,productToAdd)=>{
    const existingCartItem=cartItems.find((cartItem)=>cartItem.id===productToAdd.id);
    if(existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id===productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem)
    }
    return [...cartItems,{...productToAdd,quantity:1}]
}
const removeCartItem=(cartItems,cartItemToRemove)=>{
    const existingCartItem=cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id);
    if(existingCartItem.quantity===1){
        return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
    }
    
        return cartItems.map((cartItem)=>cartItem.id===cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}:cartItem)
    
}
const clearCartItem=(cartItems,cartItemToRemove)=>{

    return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
}
export const addItemToCart=(cartItems,productToAdd)=>{   
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createReducer('SET_CART_ITEMS',newCartItems)
    }
 export const removeItemToCart=(cartItems,cartItemToRemove)=>{
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);    
        return createReducer('SET_CART_ITEMS',newCartItems)
    }
 export const clearItemFromCart=(cartItems,cartItemToRemove)=>{
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);    
        return createReducer('SET_CART_ITEMS',newCartItems)
    }

export const  setIsCartOpen =(boolean)=>createReducer('SET_IS_CART_OPEN',boolean)