import React from "react"

import Main from "./component/Main"
import Login from "./component/Login"
import ResetPassword from "./component/ResetPassword"
import SignUp from "./component/SignUp"
import Room from "./component/Room"
import Course from "./component/Course"
import Contact from "./component/Contact"
// import CourseRessources from "./component/Course/Ressources"
import Training from "./component/Training"
import CompleteInfo from "./component/CompleteInfo"
import ProfileClient from "./component/ProfileClient"
import ProfileTrainer from "./component/ProfileTrainer"
import Admin from "./component/Admin"
import Videos from "./component/Course/paid/Ressources/Videos"
import {Accept,Refuse} from "./component/Payment"

import { Link, Route, Routes, Navigate } from "react-router-dom";
// import axios from "axios";
// import React, { useEffect, useState } from "react";





function App() {
    var user=""
    if (localStorage.getItem("user")!=null){

         user = JSON.parse(localStorage.getItem("user"))
    }

    return ( 
        <div className = "App">
            <Routes>
                <Route exact path = "/" element = { < Main /> }/> 
                <Route exact path = "/login" element = { < Login /> }/> 
                <Route exact path = "/ResetPassword" element = { < ResetPassword /> }/> 
                <Route exact path = "/signup"element = { < SignUp /> }/>
                <Route exact path = "/Contact"element = { < Contact /> }/>
                <Route exact path = "/successPayment/:id"element = { < Accept /> }/>
                <Route exact path = "/cancelPayment"element = { < Refuse /> }/>

                <Route exact path = "/Course/:id"element = { < Course /> }/> 
                <Route exact path = "/Course/:id/Videos"element = { < Videos /> }/> 
                <Route exact path = "/Training/:id"element = { < Training /> }/>
                    { /* <Route exact path="/Course/Ressources/:id" element={<CourseRessources/>} /> */ } 
                <Route exact path = "/Training/Ressources/:id" element = { < Training /> }/> 
                <Route exact path = "/completeInfo" element = { < CompleteInfo /> }/>
                <Route exact path = "/room/:url" element = { < Room /> }/>

                    {
                        user &&
                            <React.Fragment >
                                <Route exact path = "/admin" element = { < Admin /> }/>

                                {
                                    user.userType === "Trainer" ?
                                        <Route exact path = "/profile"element = { < ProfileTrainer /> } />
                                        :
                                        <Route exact path = "/profile" element = { < ProfileClient /> }/>
                                } 
                            
                        </React.Fragment>
                    } 
                
            </Routes> 
        </div>

    );
}

export default App;