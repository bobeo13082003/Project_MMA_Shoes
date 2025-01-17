import { account } from '@/services/api/api'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CounterState {
    token: string,
    isLogin: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    token: "",
    isLogin: false
}

export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userLogin: (state, actions) => {
            state.token = actions.payload,
                state.isLogin = true
        },
        userLogout: (state) => {
            state = initialState
        }

    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer