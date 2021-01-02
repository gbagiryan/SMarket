import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Footer} from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Loading from "./components/Common/Loading/Loading";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/AppReducer";
import AuthedUserProfileContainer from "./components/AuthedUserProfile/AuthedUserProfileContainer";
import SideBarContainer from "./components/SideBar/SideBarContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import AddListingContainer from "./components/PostProduct/PostProductContainer";
import ProductContainer from "./components/Product/ProductContainer";
import MainContainer from "./components/Main/MainContainer";
import EditProfileContainer from "./components/EditProfile/EditProfileContainer";
import EditProductContainer from "./components/EditProduct/EditProductContainer";
import {NotFound} from "./components/NotFound/NotFound";
import {getInitialized} from "./redux/selectors/appSelectors";
import {getIsAuthed} from "./redux/selectors/authSelectors";
import Grid from "@material-ui/core/Grid";
import LoginContainer from "./components/Login/LoginContainer";

const App = (props) => {

    useEffect(() => {
        props.initializeApp();
    }, []);

    if (!props.initialized) {
        return <Loading/>
    }
    return (
        <BrowserRouter>
            <Grid container direction={'column'} spacing={1}>
                <Grid item>
                    <HeaderContainer/>
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={1}/>
                    <Grid item xs={2}>
                        <SideBarContainer/>
                    </Grid>
                    <Grid item xs={8}>
                        <Switch>
                            <Route exact path='/' component={MainContainer}/>
                            <Route exact path='/add_new_listing' component={AddListingContainer}/>
                            <Route path='/register' component={RegisterContainer}/>
                            <Route path='/login' component={LoginContainer}/>
                            <Route path='/user/:userId' component={ProfileContainer}/>
                            <Route exact path='/product' redirect to={'/'}>
                                <Redirect to="/"/>
                            </Route>
                            <Route path='/product/:productId' component={ProductContainer}/>
                            <Route exact path='/profile' component={AuthedUserProfileContainer}/>
                            <Route path='/edit_profile' component={EditProfileContainer}/>
                            <Route exact path='/edit_product' redirect to={'/'}>
                                <Redirect to="/"/>
                            </Route>
                            <Route path='/edit_product/:productId' component={EditProductContainer}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Grid>

                    <Grid item xs={1}/>
                </Grid>
                <Grid item>
                    <Footer/>
                </Grid>
            </Grid>
            {/*<div className='app-wrapper'>*/}
            {/*    <HeaderContainer/>*/}
            {/*    <div className='main-area'>*/}
            {/*        <SideBarContainer/>*/}
            {/*        <div className='content-area'>*/}
            {/*            <Switch>*/}
            {/*                <Route exact path='/' component={MainContainer}/>*/}
            {/*                <Route exact path='/add_new_listing' component={AddListingContainer}/>*/}
            {/*                <Route path='/register' component={RegisterContainer}/>*/}
            {/*                <Route path='/user/:userId' component={ProfileContainer}/>*/}
            {/*                <Route exact path='/product' redirect to={'/'}>*/}
            {/*                    <Redirect to="/"/>*/}
            {/*                </Route>*/}
            {/*                <Route path='/product/:productId' component={ProductContainer}/>*/}
            {/*                <Route exact path='/profile' component={AuthedUserProfileContainer}/>*/}
            {/*                <Route path='/edit_profile' component={EditProfileContainer}/>*/}
            {/*                <Route exact path='/edit_product' redirect to={'/'}>*/}
            {/*                    <Redirect to="/"/>*/}
            {/*                </Route>*/}
            {/*                <Route path='/edit_product/:productId' component={EditProductContainer}/>*/}
            {/*                <Route component={NotFound}/>*/}
            {/*            </Switch>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
    initialized: getInitialized(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    initializeApp
};

export default connect(mapStateToProps, actionCreators)(App);