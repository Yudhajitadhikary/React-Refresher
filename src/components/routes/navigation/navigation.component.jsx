import { Fragment,useContext } from 'react';
import { Outlet } from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'; 
import { NavigationContainer,NavLink,NavLinksContainer,LogoContainer} from './navigation.styles.jsx'; 
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import { UserContext } from '../../../contexts/user.context'; 
import { CartContext } from '../../../contexts/cart.context';
const Navigation = () => {
    const {currentUser}=useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser);
    const signOutHandler=async()=>{
        await signOutUser();
        // setCurrentUser(null);
    }

    return (
        <Fragment>
            <NavigationContainer/>
            <LogoContainer  to='/'>
            <CrwnLogo className='logo' />
            </LogoContainer>
            < NavLinksContainer>
                <NavLink to='/shop'>Shop</NavLink>
                {
                    currentUser?
                    <NavLink as='span' onClick={signOutHandler}>SignOut</NavLink>
                    :
                    <NavLink to='/auth'>SignIn</NavLink>
                }
                <CartIcon/>
            </NavLinksContainer>
            {isCartOpen && <CartDropdown/>}
        <Outlet />
        </Fragment>
    )
}
export default Navigation;