// import { createContext,useState ,useEffect} from "react";
// const addCartItem=(cartItems,productToAdd)=>{
//     const existingCartItem=cartItems.find((cartItem)=>cartItem.id===productToAdd.id);
//     if(existingCartItem){
//         return cartItems.map((cartItem)=>cartItem.id===productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem)
//     }
//     return [...cartItems,{...productToAdd,quantity:1}]
// }
// const removeCartItem=(cartItems,cartItemToRemove)=>{
//     const existingCartItem=cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id);
//     if(existingCartItem.quantity===1){
//         return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
//     }
    
//         return cartItems.map((cartItem)=>cartItem.id===cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}:cartItem)
    
// }
// const clearCartItem=(cartItems,cartItemToRemove)=>{

//     return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
// }

// export const CartContext= createContext({   
//     isCartOpen:false,
//     setIsCartOpen:()=>{},
//     cartItems:[],
//     addItemToCart:()=>{},
//     removeItemFromCart:()=>{},
//     clearItemFromCart:()=>{},
//     cartCount:0,
//     cartTotal:0
// })
// export const CartProvider=({children})=>{
//     const [isCartOpen,setIsCartOpen]=useState(false);
//     const [cartItems,setCartItems]=useState([]);
//     const [cartCount,setCartCount]=useState(0);
//     const [cartTotal,setCartTotal]=useState(0);
//     useEffect(()=>{
//         const newCartCount=cartItems.reduce((acc,cartItem)=>acc+cartItem.quantity,0);
//         setCartCount(newCartCount);
//     },[cartItems])
//     useEffect(()=>{
//         const newCartTotal=cartItems.reduce((acc,cartItem)=>acc+cartItem.quantity*cartItem.price,0);
//         setCartTotal(newCartTotal);
//     },[cartItems])
//     const addItemToCart=(productToAdd)=>{   
//     setCartItems(addCartItem(cartItems,productToAdd));
//     }
//     const removeItemToCart=(cartItemToRemove)=>{   
//         setCartItems(removeCartItem(cartItems,cartItemToRemove));
//         }
//         const clearItemFromCart=(cartItemToRemove)=>{   
//             setCartItems(clearCartItem(cartItems,cartItemToRemove));
//             }
//     const value={
//         isCartOpen,
//         setIsCartOpen,
//         cartItems,
//         addItemToCart,
//         removeItemToCart,
//         clearItemFromCart,
//         cartCount,
//         cartTotal

//     }
//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }


import { createContext,useReducer} from "react";
import createAction from "../utils/reducer/reducer.utils";
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

export const CartContext= createContext({   
    isCartOpen:true,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    clearItemFromCart:()=>{},
    cartCount:0,
    cartTotal:0
})
const INITIAL_STATE={
    isCartOpen:false,
    cartItems:[],
    cartCount:0,
    cartTotal:0
}
const cartReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case 'SET_CART_ITEMS':
            return{
                ...state,
                ...payload
                
            }
        case 'SET_IS_CART_OPEN':
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}
export const CartProvider=({children})=>{
    const [{isCartOpen,cartItems,cartCount,cartTotal},dispatch]=useReducer(cartReducer,INITIAL_STATE)
    // const [isCartOpen,setIsCartOpen]=useState(false);
    // const [cartItems,setCartItems]=useState([]);
    // const [cartCount,setCartCount]=useState(0);
    // const [cartTotal,setCartTotal]=useState(0);
    // useEffect(()=>{
    //     const newCartCount=cartItems.reduce((acc,cartItem)=>acc+cartItem.quantity,0);
    //     setCartCount(newCartCount);
    // },[cartItems])
    // useEffect(()=>{
    //     const newCartTotal=cartItems.reduce((acc,cartItem)=>acc+cartItem.quantity*cartItem.price,0);
    //     setCartTotal(newCartTotal);
    // },[cartItems])
    const addItemToCart=(productToAdd)=>{   
    const newCartItems = addCartItem(cartItems,productToAdd);
    updateCartItemsReducer(newCartItems)
    }
    const removeItemToCart=(cartItemToRemove)=>{
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);    
        updateCartItemsReducer(newCartItems)
    }
    const clearItemFromCart=(cartItemToRemove)=>{
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);    
        updateCartItemsReducer(newCartItems)
    }
    const updateCartItemsReducer=(newCartItems)=>{
        const newCartCount=newCartItems.reduce((acc,cartItem)=>acc+cartItem.quantity,0);
        const newCartTotal=newCartItems.reduce((acc,cartItem)=>acc+cartItem.quantity*cartItem.price,0);
        dispatch(
            createAction('SET_CART_ITEMS',{
                cartItems:newCartItems,
                cartCount:newCartCount,
                cartTotal:newCartTotal
            }))
        
    }
    const setIsCartOpen=(bool)=>{
        dispatch(
        createAction(
            'SET_IS_CART_OPEN',
            bool
        ))
    }
   
        
    const value={
        isCartOpen,
        cartItems,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartCount,
        cartTotal

    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}