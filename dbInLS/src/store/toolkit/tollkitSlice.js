import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {},
    reducers: {
        addData(state, action) {
            if (!localStorage.getItem("list")) {
                localStorage.setItem("list", [])
                state.data = []
            } else {
                state.data = JSON.parse(localStorage.getItem("list"))
            }
            state.data.push(action.payload)
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        setStatus(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.map(datum => {
                if (datum.name === action.payload.name) {
                    datum.status = "Online"
                } else {
                    datum.status = "Offline"
                }
            })
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        loginOut(state) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.map(datum => {
                datum.status = "Offline"
            })
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        addNewCategory(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.map(data => {
                    if (data.status === "Online") {
                        if (!data.category) {
                            data.category = [];
                        }

                        data.category.push({
                            id: data.category.length >= 1 ? (data.category[data.category.length - 1].id + 1) : (0),
                            name: action.payload.name,
                            data: []
                        })
                    }
                }
            )
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        removeCategory(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            let newCategoryList = state.data.find(datum => datum.status === "Online").category.filter(data => data.id !== action.payload.categoryId)
            state.data.find(datum => datum.status === "Online").category = newCategoryList

            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        addNewSubCategory(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.find(datum => datum.status === "Online").category.map((datum) => {
                if (datum.id === action.payload.id){
                    datum.data.push({id: datum.data.length >= 1? (datum.data[datum.data.length - 1].id + 1): (0), name: action.payload.name, about: action.payload.about})
                }
            })
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        removeSubcategory(state, action){
            state.data = JSON.parse(localStorage.getItem("list"))
            let newSubcategoryList = state.data.find(datum => datum.status === "Online"
            ).category.find(datum => datum.id === action.payload.categoryId).data.filter(data => data.id !== action.payload.subcategoryId)
            state.data.find(datum => datum.status === "Online"
            ).category.find(datum => datum.id === action.payload.categoryId).data = newSubcategoryList


            window.localStorage.setItem("list", JSON.stringify(state.data))
        }

    }
})

export default toolkitSlice.reducer
export const {addData, setStatus, loginOut, addNewCategory, removeCategory, addNewSubCategory, removeSubcategory} = toolkitSlice.actions