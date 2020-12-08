import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Footer} from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Loading from "./components/Common/Loading/Loading";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/AppReducer";
import AuthedUserProfileContainer from "./components/AuthedUserProfile/AuthedUserProfileContainer";
import SideBarContainer from "./components/SideBar/SideBarContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import AddListingContainer from "./components/AddListing/AddListingContainer";
import ProductContainer from "./components/Product/ProductContainer";
import MainContainer from "./components/Main/MainContainer";

const App = (props) => {

    useEffect(() => {
        props.initializeApp();
    }, []);

    if (!props.initialized) {
        return <Loading/>
    }
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <div className='main-area'>
                    <SideBarContainer/>
                    <div className='content-area'>
                        <Route exact path='/' component={MainContainer}/>
                        <Route exact path='/add_new_listing' component={AddListingContainer}/>
                        <Route path='/register' component={RegisterContainer}/>
                        <Route path='/user/:userId' component={ProfileContainer}/>
                        <Route path='/product/:productId' component={ProductContainer}/>
                        <Route exact path='/profile' component={AuthedUserProfileContainer}/>
                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuthed: state.auth.isAuthed
});

const actionCreators = {
    initializeApp
};

export default connect(mapStateToProps, actionCreators)(App);