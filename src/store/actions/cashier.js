import * as actionTypes from './actionTypes';
import {makeId} from '../../shared/utility';

export const clearOrder = () => {
    return {
        type: actionTypes.CLEAR_ORDER
    }
};

export const increaseQuantity = (id) => {
    return {
        type: actionTypes.INCREASE_QUANTITY,
        itemId: id
    };
};

export const removeItem = (id) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        itemId: id
    };
};

export const deleteItem = (id) => {
    return {
        type: actionTypes.DELETE_ITEM,
        itemId: id
    };
};

export const manualAddItem = (item) => {
    return {
        type: actionTypes.MANUAL_ADD_ITEM,
        item: item
    };
};

export const setOrder = (order) => {
    return {
        type: actionTypes.SET_ORDER,
        orderId: order.orderId,
        orderItems: order.orderItems,
        totalPrice: order.totalPrice
    };
};

export const initOrder = () => { // dummy order for development
    const orderId = makeId(5);
    
    return dispatch => {dispatch(setOrder( {
                orderId: orderId,
                orderItems: [{
                    itemId: "AB345",
                    itemDescription: "Nested Drill Hopper",
                    itemQuantity: 3,
                    pricePerUnit: 18.95,
                    itemSubtotal: 3 * 18.95,
                },
                {
                    itemId: "93c2t",
                    itemDescription: "Bibily bibity bop",
                    itemQuantity: 1,
                    pricePerUnit: 34.50,
                    itemSubtotal: 1 * 34.50,
                },
                {
                    itemId: "CE184",
                    itemDescription: "Hello World, How are you",
                    itemQuantity: 4,
                    pricePerUnit: 22.75,
                    itemSubtotal: 4 * 22.75,
                }],
                totalPrice: 182.35
    }))};
};