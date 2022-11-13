import React, {useCallback, useEffect, useState} from 'react';
import {addData} from "../store/toolkit/tollkitSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {InputGroup, Form, Button} from "react-bootstrap";
import _ from "lodash";

function Register(props) {
    const dispatch = useDispatch();
    const [regInfo, setRegInfo] = useState({email: "", password: "", name: "", baseType: ""})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("list"))?.find(data => data.status === "Online")){
            navigate("/home", {replace: true})
        }
    }, [dispatch])

    const handelChange = useCallback((key, value) => {
        regInfo[key] = value
        setRegInfo(regInfo)
    }, [regInfo])

    const handelAddNewBase = useCallback(() => {
        const errorList = {};
        /[A-Z][a-z0-9\-.@+]{3,}/.test(regInfo.name) ? (delete errorList.name) : (errorList.name = "Not valid user name");
        /[a-z0-9\-.@+A-Z]{6,}/.test(regInfo.password) ? (delete errorList.password) : (errorList.password = "Not valid password");
        /[A-Za-z0-9\-.]{4,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/.test(regInfo.email) ? (delete errorList.email) : (errorList.email = "Not valid email");
        regInfo.baseType === ""? (errorList.baseType = "Need select base type"):(delete errorList.baseType);
        if (!_.isEmpty(errorList)){
            setErrors(errorList)
        } else{
            dispatch(addData(regInfo))
            navigate("/login", {replace: true})
        }
    }, [])

    return (
        <div className="backgroundRegisterPage">
            <div className="container addContainerStyle">
                <h2>Add new Base</h2>
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
                <InputGroup className="mb-3 userNameInput">
                    <InputGroup.Text id="basic-addon1">✉</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelChange("email", ev.target.value)
                        }}
                    />
                </InputGroup>
                {errors.email ? (<p>{errors.email}</p>) : ("")}
                <InputGroup className="mb-3 userNameInput">
                    <InputGroup.Text id="basic-addon1">🔐</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your password"
                        aria-label="Password"
                        type="Password"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelChange("password", ev.target.value)
                        }}
                    />
                </InputGroup>
                {errors.password ? (<p>{errors.password}</p>) : ("")}
                <InputGroup className="mb-3 userNameInput">
                    <InputGroup.Text id="basic-addon1">🔗</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your base type"
                        aria-label="Type"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelChange("baseType", ev.target.value)
                        }}
                    />
                </InputGroup>
                {errors.baseType ? (<p>{errors.baseType}</p>) : ("")}
                <h3>Have you done everything?</h3>
                <Button variant="outline-primary loginButton" onClick={handelAddNewBase}>Ready</Button>
            </div>
        </div>
    );
}

export default Register;