import React, {useEffect} from 'react';
import './App.css';
import {SideBar} from "./components/SideBar/SideBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Main} from "./components/Main/Main";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Footer} from "./components/Footer/Footer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Loading from "./components/Common/Loading/Loading";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/AppReducer";

const App = (props) => {

    useEffect(() => {
        props.initializeApp();
    }, [props.isAuthed]);

    if (!props.initialized) {
        return <Loading/>
    }
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <div className='main-area'>
                    <SideBar/>
                    <div className='content-area'>
                        <Route exact path='/' component={Main}/>
                        <Route path='/login' component={LoginContainer}/>
                        <Route path='/profile/:userId?' component={ProfileContainer}/>
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


// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className='app-wrapper'>
//                 <HeaderContainer/>
//                 <div className='main-area'>
//                     <SideBar/>
//                     <div className='content-area'>
//                         <Route exact path='/' component={Main}/>
//                         <Route path='/login' component={LoginContainer}/>
//                         <Route path='/profile/:userId?' component={ProfileContainer}/>
//                     </div>
//                 </div>
//                 <Footer/>
//             </div>
//         </BrowserRouter>
//     );
// };
//
// export default App;