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

export const { showData } = data.actions

export default configureStore({
    reducer : {
        data : data.reducer,
    }
})