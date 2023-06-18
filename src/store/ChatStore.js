import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;

export const getHome = createAsyncThunk('chat/getHome',
    async (_,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.get(baseURL + '/get-home', {
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("dsds",response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })
export const createChannel = createAsyncThunk('chat/createChannel',
    async (Data,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.post(baseURL + '/create-channel', Data,{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("createChat",response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })
    export const manageUsers = createAsyncThunk('chat/createChannel',
    async (Data,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.post(baseURL + '/manage-users', Data,{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
            })
            console.log("manageUsers",response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })
    export const selectChannel = createAsyncThunk('chat/selectChannel',
    async (channelId,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.get(baseURL + '/get-channel/'+channelId,{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("SelectedChat",response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })  
    export const getUsers = createAsyncThunk('chat/getUsers',
    async (_,{rejectWithValue})=>{
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.get(baseURL + '/users',{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("Users ",response.data)
            return response.data
        }catch(err){
            return rejectWithValue(err.message)
        }
    })
    export const getContacts = createAsyncThunk('chat/getContacts',
    async (_,{rejectWithValue})=>{
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.get(baseURL + '/channels',{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("Contacts ",response.data)
            return response.data
        }catch(err){
            return rejectWithValue(err.message)
        }
    })
    export const createMessage = createAsyncThunk('chat/createMessage',
    async (Data,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token"); 
            const response = await axios.post(baseURL + '/send-message', Data,{
                headers: {
                  Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
                },
              })
            console.log("SendChat",response.data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })      
const initialState = {
    Channels:[],
    firstChannel:[],
    users:[],
    contacts:[],
    user:'',
    isLoading: false
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: {
        [getHome.pending]: (state,action) => {
            state.isLoading = true
        },
        [getHome.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Channels = action.payload.data.channels
            state.firstChannel = action.payload.data.firstChannel
            state.user = action.payload.data.username
        },
        [getHome.rejected]: (state,action) => {
            state.isLoading = false
        },
        [createChannel.fulfilled]:(state,action)=>{
            state.Channels = action.payload
        },
        [selectChannel.fulfilled]:(state,action)=>{
            state.firstChannel = action.payload
        },
        [getUsers.fulfilled]:(state,action)=>{
            console.log(action.payload);
            state.users = action.payload.users
        },
        [getContacts.fulfilled]:(state,action)=>{
            console.log(action.payload);
            state.contacts = action.payload.channels
        }


        
    }
})
export default chatSlice.reducer