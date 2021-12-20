import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const loginTC = createAsyncThunk('auth/login', async (payload: { data: LoginParamsType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(payload.data)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

            return {value: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error.message, thunkAPI.dispatch)
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

            return {value: false}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions