import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ProfileReducer} from "./reducers/ProfileReducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {AuthReducer} from "./reducers/AuthReducer";
import {AppReducer} from "./reducers/AppReducer";
import {ProductReducer} from "./reducers/ProductReducer";


let reducers = combineReducers({
    profile: ProfileReducer,
    product: ProductReducer,
    auth: AuthReducer,
    app: AppReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;