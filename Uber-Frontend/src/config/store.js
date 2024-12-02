


import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../redux/slice/user.slice";


const store = configureStore({
    
    reducer:{
        user:userSlice
    },

    devTools: process.env.NODE_ENV !== 'production'
})


export default store;