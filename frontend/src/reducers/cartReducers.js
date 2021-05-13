import {
    CART_ADD_ITEM, CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const currItem = action.payload

            // check the id of product to see if it already exists
            const existingItem = state.cartItems.find(c => c.product === currItem.product)

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(c => c.product === existingItem.product ? currItem : c)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, currItem]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(c => c.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            }

        default:
            return state
    }
}