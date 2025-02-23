// import { createContext ,useState,useEffect} from "react";
// import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// export const UserContext=createContext({
// currentUser:null,
// setCurrentUser:()=>null
// });
// export const UserProvider=({children})=>{
//     const [currentUser,setCurrentUser]=useState(null);
//     const value={
//         currentUser,
//         setCurrentUser
//     }
//     useEffect(()=>{
//        const unsubcribe= onAuthStateChangedListener((user)=>{
//         if(user){
//             createUserDocumentFromAuth(user);
//         }
//         setCurrentUser(user);
//        })
//        return unsubcribe
//     },[])   
//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }
import { createContext,useEffect,useReducer} from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
export const UserContext=createContext({
currentUser:null,
setCurrentUser:()=>null
});
export const USER_ACTION_TYPES={
    SET_CURRENT_USER:'SET_CURRENT_USER'
}
const userReducer=(state,action)=>{
    console.log(action)
    console.log('dispathed')
    const {type,payload}=action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }

}
const INITIAL_STATE={currentUser:null}
export const UserProvider=({children})=>{
    const [{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE)
    const setCurrentUser=(user)=>dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
    console.log(currentUser)
    const value={
        currentUser,
        setCurrentUser
    }
    useEffect(()=>{
       const unsubcribe= onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);   
        }
        setCurrentUser(user);
       })
       return unsubcribe
    },[])   
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
/*
const userReducer=(state,action)=>{
    return{
    currentUser:{....}}}
    */
