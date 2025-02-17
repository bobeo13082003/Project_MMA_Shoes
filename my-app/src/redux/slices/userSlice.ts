import { account } from '@/services/api/api'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface User {
    token: string,
    isLogin: boolean
    order: ICart
}

// Define the initial state using that type
const initialState: User = {
    token: "",
    isLogin: false,
    order: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, actions) => {
            state.token = actions.payload,
                state.isLogin = true
        },
        userLogout: (state) => {
            return initialState;
        },
        userOrder: (state, actions) => {
            if (!state.order) {
                state.order = {};
            }
            const { product } = actions.payload;
            const restaurantId = product.restaurant._id;
            if (!state.order[restaurantId]) {
                state.order[restaurantId] = {
                    sum: 0,
                    title: "",
                    quantity: 0,
                    items: {}
                };
            }

            if (!state.order[restaurantId].items[product._id]) {
                state.order[restaurantId].items[product._id] = {
                    quantity: 0,
                    data: product
                };
            }

            state.order[restaurantId].items[product._id].quantity += 1;
            state.order[restaurantId].sum += Number(product.price) || 0;
            state.order[restaurantId].quantity += 1;
            state.order[restaurantId].title = product.restaurant.title
        },
        userDecreaseOrder: (state, actions) => {
            const { product } = actions.payload;
            const restaurantId = product.restaurant;
            const productId = product._id;

            if (!state.order || !state.order[restaurantId] || !state.order[restaurantId].items[productId]) {
                return;
            }

            if (state.order[restaurantId].items[productId].quantity > 1) {
                state.order[restaurantId].items[productId].quantity -= 1;
                state.order[restaurantId].sum -= Number(product.price) || 0;
                state.order[restaurantId].quantity -= 1;
            } else {
                delete state.order[restaurantId].items[productId];
                state.order[restaurantId].sum -= Number(product.price) || 0;
                state.order[restaurantId].quantity -= 1;
                if (Object.keys(state.order[restaurantId].items).length === 0) {
                    delete state.order[restaurantId];
                }
            }
        },
        userDelivery: (state, actions) => {
            const { restaurantId } = actions.payload;
            if (state.order[restaurantId]) {
                delete state.order[restaurantId];
            }
        }
    }
})

export const { userLogin, userLogout, userOrder, userDecreaseOrder, userDelivery } = userSlice.actions
export default userSlice.reducer