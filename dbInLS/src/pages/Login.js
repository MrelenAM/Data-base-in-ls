import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setStatus} from "../store/toolkit/tollkitSlice";
import _ from "lodash"
import {useNavigate} from "react-router-dom";
import {Button, Form, InputGroup} from "react-bootstrap";

function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginInfo] = useState({name: "", password: ""})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("list"))?.find(data => data.status === "Online")) {
            navigate("/home", {replace: true})
        }
    }, [dispatch])

    const handelChange = useCallback((key, value) => {
        loginData[key] = value
        setLoginInfo(loginData)
    }, [loginData])

    const handelNewCreateBazeClick = useCallback(() => {
        navigate("/register", {replace: true})
    }, [])

    const handelClick = useCallback(() => {
        const errorList = {};
        const data = (JSON.parse(localStorage.getItem("list"))?.find(data => data.name === loginData.name));
        /[A-Z][a-z0-9\-.@+]{3,}/.test(loginData.name) &&
        data !== undefined ? (delete errorList.name) : (errorList.name = "Not valid user name or not true");
            /[a-z0-9\-.@+A-Z]{6,}/.test(loginData.password) &&
            data?.password === loginData.password ? (delete errorList.password) : (errorList.password = "Not valid password or not true");
        if (!_.isEmpty(errorList)) {
            setErrors(errorList)
        } else {
                dispatch(setStatus({name: loginData.name}))
                navigate("/home", {replace: true})
        }

    }, [setErrors])

    return (
        <div className="backgroundLoginPage">
            <div className="container addContainerStyle">
                <h2>Login</h2>
                <InputGroup className="mb-3 userNameInput">
                    <InputGroup.Text id="basic-addon1">👤</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your user name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelChange("name", ev.target.value)
                        }}
                    />
                </InputGroup>
                {errors.name ? (<p>{errors.name}</p>) : ("")}
                <InputGroup className="mb-3 passwordInput">
                    <InputGroup.Text id="basic-addon1">🔐</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your password"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelChange("password", ev.target.value)
                        }}
                        type="password"
                    />
                </InputGroup>
                {errors.password ? (<p>{errors.password}</p>) : ("")}
                <Button variant="outline-primary loginButton" onClick={handelClick}>Ready</Button>
                <h2>Do you want to create a new base?</h2>
                <Button variant="outline-primary registerButton" onClick={handelNewCreateBazeClick}>Create</Button>
            </div>
        </div>
    );
}

export default Login;