
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignInForm from "../../sign-in-form/sign-in-form.component";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
// import {auth,signInWithGooglePopup,createUserDocumentFromAuth} from "../../../utils/firebase/firebase.utils"
import './authentication.styles.scss';
const Authentication = () => {  
    // useEffect(()=>{
    //     async function getRedirectResults(auth){ 
    //         try{
    //             const result=await getRedirectResult(auth);
    //             if(result){
    //                 createUserDocumentFromAuth(result);
    //             }
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }
    // //    const response=  await getRedirectResult(auth);
    //      getRedirectResults(auth);
    //     },[]);
    
    return (
        <div className="authentication-container">
            <SignInForm/>
            {/* <button onClick={logGoogleUser}>SignIn with Google</button> */}
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>SignIn with Google Redirect</button> */}
        </div>
    )
}   
export default Authentication