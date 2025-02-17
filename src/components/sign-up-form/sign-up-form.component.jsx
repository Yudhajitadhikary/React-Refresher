import { useState} from 'react'
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const defaultFormFeilds={
    displayName: '',    
    email: '',                              
    password: '',
    confirmPassword: '' 
}
const SignUpForm = () => {
    const [formFields,setFormFields]=useState(defaultFormFeilds);
    const {displayName,email,password,confirmPassword}=formFields;
    // const {setCurrentUser}=useContext(UserContext);
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});
    }
    const resetFormFields=()=>{
        setFormFields(defaultFormFeilds);
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            alert('passwords do not match');
            return;
        }

        try{
            const {user}= await createAuthUserWithEmailAndPassword(email,password);
            // setCurrentUser(user)
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('email already in use');
            }
            else{
                console.log(error);
            }
            console.log(error);
        }
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' onChange={handleChange} required  value={displayName}/>
                <FormInput label='Email' type='email' name='email' onChange={handleChange} required value={email} />
                <FormInput label='Password' type='password' name='password' onChange={handleChange} required value={password} />
                <FormInput label='Confirm Password' type='password' name='confirmPassword' onChange={handleChange} required value={confirmPassword} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm