import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/home" element={<Home />}/>
                {/*<Route path="/home/:userId" element={<Home />}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;