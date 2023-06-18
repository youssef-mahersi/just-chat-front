import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

export const Authenticate = createAsyncThunk('signup/Authenticate',
    async (Data,{rejectWithValue}) => {
        try{
            console.log(baseURL)
            const response = await axios.post(baseURL + '/auth', Data)
            console.log(response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })
export const createUser = createAsyncThunk('signup/createUser',
    async (Data,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.post(baseURL + '/create-user', Data,{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log('createUser ',response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

const initialState = {
    isAuth:false,
    token:null,
    isLoading: false,
    role:'',
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [Authenticate.pending]: (state,action) => {
            state.isLoading = true
        },
        [Authenticate.fulfilled]: (state,action) => {
            state.isLoading = false
            state.token = action.payload.token
            state.role = action.payload.user.role
            state.isAuth=true
        },
        [Authenticate.rejected]: (state,action) => {
            state.isLoading = false
        },

        
    }
})
export default authSlice.reducer