import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

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

const cart = createSlice({
    name:'cart',
    initialState: [],
    reducers: {
        insertItem(state, action) {
            const num = state.findIndex((obj) => {
                return obj.id === action.payload.id;
            });
            if (num === -1) {
                state.push(action.payload);
            } else {
                state[num].quantity += action.payload.quantity;
            }
        },
        addCount(state, action) {
            const num = state.findIndex((a) => a.id === action.payload);
            state[num].quantity++;
        },
        minusCount(state, action) {
            const num = state.findIndex((a) => a.id === action.payload);
            if (state[num].quantity > 1) {
                state[num].quantity--;
            }
        },
        deleteCart(state, action) {
            const item = state.filter((a) => a.id !== action.payload);
            return item;
        }
    },
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

// redux-persist
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'],
    blacklist: ['data', 'click_recent']
}

const reducer = combineReducers({
    data : data.reducer,
    click_recent : click_recent.reducer,
    cart : cart.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
})

export const { showData } = data.actions
export const { setIsClick } = click_recent.actions
export const { insertItem } = cart.actions
export const { addCount } = cart.actions
export const { minusCount } = cart.actions
export const { deleteCart } = cart.actions

// export default configureStore({
//     reducer : {
//         data : data.reducer,
//         click_recent : click_recent.reducer,
//         cart : cart.reducer,
//     }
// })

export default store;