import React from 'react';
import './App.css';

import {SideBar} from "./components/SideBar/SideBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Main} from "./components/Main/Main";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <div className='main-area'>
                    <SideBar/>
                    <div className='content-area'>
                        <Route exact path='/' render={Main}/>
                        <Route path='/login' render={Login}/>
                        <Route path='/profile' render={ProfileContainer}/>
                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
