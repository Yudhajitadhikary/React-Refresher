import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { googleSignInStart,emailSignInStart } from '../../store/user/user.action';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import Button,{BUTTON_TYPES_CLASSES} from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';    
// import { signInWithGooglePopup,signInAuthUserWithEmailAndPassword, } from '../../utils/firebase/firebase.utils';
const defaultFormFeilds={
       
    email: '',                              
    password: '', 
}
const SignInForm = () => {
    const dispatch=useDispatch();
    const [formFields,setFormFields]=useState(defaultFormFeilds);
    const {email,password}=formFields;
    // const {setCurrentUser}=useContext(UserContext);
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});
    }
    const signinWithGoogle= async()=>{ 
        // await signInWithGooglePopup();
        dispatch(googleSignInStart());
        // setCurrentUser(user);
        // console.log(response);
        
    }
    const resetFormFields=()=>{
        setFormFields(defaultFormFeilds);
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email,password));
    //    await signInAuthUserWithEmailAndPassword(email,password);
        // setCurrentUser(user);
    //    console.log(response);   
resetFormFields();
        }
        catch(error){
            switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break
            case 'auth/user-not-found':
                    alert('no user found with this email');
                    break;
                    default:
                        console.log(error);
            }
        }
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' onChange={handleChange} required value={email} />
                <FormInput label='Password' type='password' name='password' onChange={handleChange} required value={password} />
                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google}  onClick={signinWithGoogle}>Google sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm