import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { cartReducer } from './CartReducer';
import { contohReducer } from './contohReducer';

export default combineReducers({
    auth: authReducer,
    Cart: cartReducer,
    contoh: contohReducer
})
