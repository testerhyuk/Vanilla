import { configureStore, createSlice } from "@reduxjs/toolkit"

// 상품 데이터
const data = createSlice({
    name : 'data',
    initialState : [],
    reducers : {
        showData(state, action) {
            return action.payload
        }
    }
})

const click_recent = createSlice({
    name: 'click_recent',
    initialState: false,
    reducers : {
        setIsClick(state) {
            return !state
        }
    }
})

export const { showData } = data.actions
export const { setIsClick } = click_recent.actions

export default configureStore({
    reducer : {
        data : data.reducer,
        click_recent : click_recent.reducer
    }
})