import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    loginOut,
    addNewCategory,
    setStatus,
    removeCategory,
    addNewSubCategory,
    removeSubcategory
} from "../store/toolkit/tollkitSlice";
import Modal from "react-modal"
import _ from "lodash"
import {Button, Card, Form, InputGroup} from "react-bootstrap";

function Home(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [controllerModal, setControllerModal] = useState(false);
    const [newCategory, setNewCategory] = useState({})
    const [errors, setErrors] = useState({})
    const data = JSON.parse(localStorage.getItem("list")).find(data => data.status === "Online")
    const [reRender, setReRender] = useState("")
    const [controllerModalSubcategory, setControllerModalSubcategory] = useState(false)
    const [newSubcategory, setNewSubcategory] = useState({})

    const customStyles = {
        content: {
            top: '50%',
            width: "40%",
            height: "auto",
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("list")).find(data => data.status === "Online")) {
            navigate("/login", {replace: true})
        }
    }, [dispatch])

    const handelLoginOutClick = useCallback(() => {
        dispatch(loginOut())
        navigate("/login", {replace: true})
    }, [])

    const handelCategoryNameChange = useCallback((key, value) => {
        newCategory[key] = value
        setNewCategory(newCategory)
    }, [newCategory])

    const handelReadyModalClick = useCallback(() => {
        const errorList = {};
        /^[A-Z][A-Za-z0-9.` ]+$/.test(newCategory.name) ? (delete errorList.name) : (errorList.name = "Not valid category name");
        if (!_.isEmpty(errorList)) {
            setErrors(errorList)
        } else {
            setErrors(errorList)
            dispatch(addNewCategory({name: newCategory.name}))
            setControllerModal(false)
            newCategory.name = ""
            setNewCategory(newCategory)
        }
    }, [])

    const handelDeleteCategoryClick = useCallback((id) => {
        dispatch(removeCategory({categoryId: id}))
        setReRender(_.uniqueId())
    }, [])


    const handelModal = useCallback(() => {
        if (controllerModal) {
            setControllerModal(false)
        } else {
            setControllerModal(true)
        }
    }, [controllerModal])

    const handelSubCategoryModalClick = useCallback((category) => {
        if (controllerModalSubcategory) {
            setControllerModalSubcategory(false)
        } else {
            setControllerModalSubcategory(true)
            newSubcategory.category = category
            setNewSubcategory(newSubcategory)
        }
    }, [controllerModalSubcategory])

    const handelReadySubcategory = useCallback(() => {
        let errorList = {};
        /^[A-Z][A-Za-z0-9.` ]+$/.test(newSubcategory.name) ? (delete errorList.nameSubcategory) : (errorList.nameSubcategory = "Not valid subcategory name");
        if (!_.isEmpty(errorList)) {
            setErrors(errorList)
        } else {
            setErrors(errorList)
            dispatch(addNewSubCategory({
                id: newSubcategory.category,
                name: newSubcategory.name,
                about: newSubcategory.about
            }))
            setControllerModalSubcategory(false)
            setNewSubcategory({})
        }
    }, [])

    const handelSubcategoryNameChange = useCallback((key, value) => {
        newSubcategory[key] = value
        setNewSubcategory(newCategory)
    }, [])

    const handelDeleteSubcategoryClick = useCallback((categoryId, subcategoryId) => {
        dispatch(removeSubcategory({categoryId: categoryId, subcategoryId: subcategoryId}))
        setReRender(_.uniqueId())
    },[])

    return (
        <>
            <div className="container" style={{marginTop: "3%", marginBottom: "2%"}}>
                {data.category?.map(data => {
                    return (<div key={_.uniqueId()}>
                            <div style={{display: "flex"}}>
                                <h3 style={{marginRight: "1%"}}>{data.name}</h3>
                                <Button variant="outline-primary loginButton"
                                        onClick={() => handelDeleteCategoryClick(data.id)}>Delete {data.name} category</Button>
                            </div>
                            <div>
                                {data.data?.map(datum => {
                                    return (
                                        <Card border="dark" style={{
                                            width: 'calc(100%/5)',
                                            marginRight: "1%",
                                            marginBottom: "1%",
                                            display: "inline-block"
                                        }} key={_.uniqueId()}>
                                            <Card.Header>Category name: {data.name}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Subcategory name: {datum.name}</Card.Title>
                                                <Card.Text>
                                                    About: {datum.about}
                                                </Card.Text>
                                            </Card.Body>
                                            <Button variant="outline-primary loginButton"
                                                    onClick={() => handelDeleteSubcategoryClick(data.id, datum.id)} style={{width: "100%"}}>Delete
                                                Subcategory {datum.name}</Button>
                                        </Card>
                                    )
                                })}
                            </div>
                            <div>
                                <Button variant="outline-primary loginButton"
                                        onClick={() => handelSubCategoryModalClick(data.id)}>Add new
                                    Subcategory {data.name}</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Modal
                isOpen={controllerModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <InputGroup className="mb-3 userNameInput">
                    <InputGroup.Text id="basic-addon1">👤</InputGroup.Text>
                    <Form.Control
                        placeholder="Write your category name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => {
                            handelCategoryNameChange("name", ev.target.value)
                        }}
                    />
                </InputGroup>
                {errors.name ? (<p style={{textAlign: "center"}}>{errors.name}</p>) : ("")}

                <div style={{textAlign: "center"}}>
                    <Button variant="outline-primary loginButton" style={{marginRight: "2%"}}
                            onClick={handelReadyModalClick}>Ready</Button>
                    <Button variant="outline-primary loginButton" onClick={() => handelModal(false)}>Close</Button>
                </div>
            </Modal>

            <Modal
                isOpen={controllerModalSubcategory}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div style={{textAlign: "center"}}>
                    <InputGroup className="mb-3 userNameInput">
                        <InputGroup.Text id="basic-addon1">👤</InputGroup.Text>
                        <Form.Control
                            placeholder="Write your Subcategory name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(ev) => {
                                handelSubcategoryNameChange("name", ev.target.value)
                            }}
                        />
                    </InputGroup>
                    {errors.nameSubcategory ? (<p style={{textAlign: "center"}}>{errors.nameSubcategory}</p>) : ("")}
                    <InputGroup className="mb-3 userNameInput">
                        <InputGroup.Text id="basic-addon1">©</InputGroup.Text>
                        <Form.Control
                            placeholder="Write your Subcategory about"
                            aria-label="About"
                            aria-describedby="basic-addon1"
                            onChange={(ev) => {
                                handelSubcategoryNameChange("about", ev.target.value)
                            }}
                        />
                    </InputGroup>
                    {errors.aboutSubcategory ? (<p style={{textAlign: "center"}}>{errors.aboutSubcategory}</p>) : ("")}
                </div>
                <hr/>
                <div style={{textAlign: "center"}}>
                    <Button variant="outline-primary loginButton" style={{marginRight: "2%"}}
                            onClick={handelReadySubcategory}>Ready</Button>
                    <Button variant="outline-primary loginButton"
                            onClick={() => handelSubCategoryModalClick(false)}>Close</Button>
                </div>
            </Modal>

            <div style={{textAlign: "center"}}>
                <Button variant="outline-primary loginButton" onClick={handelModal}>Add New Category</Button>
                <Button variant="outline-primary loginButton" onClick={handelLoginOutClick}>Login Out</Button>
            </div>
        </>
    )
        ;
}

export default Home;