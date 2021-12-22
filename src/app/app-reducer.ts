import {setIsLoggedInAC} from "../features/Login/authReducer";
import {authAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type Test = string | null

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as Test,
    isInitialized: false
}


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (payload, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
            thunkAPI.dispatch(setAppInitializeAC({isInitialized: true}));
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error.message, thunkAPI.dispatch)
    }

})


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: Test }>) => {
            state.error = action.payload.error
        },
        setAppInitializeAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitializeAC} = slice.actions

