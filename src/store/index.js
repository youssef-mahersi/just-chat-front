import { configureStore } from "@reduxjs/toolkit";
import SigninStore from "./SigninStore";
import ChatStore from "./ChatStore";
const Store = configureStore({reducer:{
    SigninStore,
    ChatStore
}})
export default Store