import { Fragment,useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'; 
import { NavigationContainer,NavLink,NavLinksContainer,LogoContainer} from './navigation.styles.jsx'; 
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import { UserContext } from '../../../contexts/user.context'; 
import { CartContext } from '../../../contexts/cart.context';
import {selectIsCartOpen} from '../../../store/cart/cart.selector';
import {selectCurrentUser} from '../../../store/user/user.selector';
import { signOutStart } from '../../../store/user/user.action';
const Navigation = () => {
    const dispatch=useDispatch();
    const currentUser=useSelector(selectCurrentUser);
    const isCartOpen=useSelector(selectIsCartOpen);
    const signOutHandler=async()=>{
        dispatch(signOutStart());
    }
    // const {currentUser}=useContext(UserContext);
    // const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser);
    // const signOutHandler=async()=>{
    //     await signOutUser();
    //     // setCurrentUser(null);
    // }

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
                    <>
                    <NavLink as='span' onClick={signOutHandler}>SignOut</NavLink>
                    <div>Hello {currentUser.displayName}</div></>
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