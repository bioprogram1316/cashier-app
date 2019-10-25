import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orderId: "",
    orderItems: [{ 
        itemId: "",
        itemDescription: "",
        itemQuantity: 0,
        pricePerUnit: 0,
        itemSubtotal: 0
    }],
    totalPrice: 0
};

const setOrder = (state, action) => {
    return updateObject(state, {
        orderId: action.orderId,
        orderItems: action.orderItems,
        totalPrice: action.totalPrice
    });
};

const increaseQuantity = (state, action) => {
    const itemToRemove = state.orderItems.find((element) => {
        return element.itemId === action.itemId;
    })
    const itemIndex = state.orderItems.findIndex(e => e === itemToRemove);
    return {
        ...state,
        orderItems: state.orderItems.map(
            (orderItem, i) => i === itemIndex ? {...orderItem, itemQuantity : itemToRemove.itemQuantity + 1, itemSubtotal: itemToRemove.itemSubtotal + itemToRemove.pricePerUnit} 
                : orderItem
        ),
        totalPrice: state.totalPrice + itemToRemove.pricePerUnit
    }
};

const removeItem = (state, action) => { //reduce quantity
    const itemToRemove = state.orderItems.find((element) => {
        return element.itemId === action.itemId;
    })
    if (itemToRemove.itemQuantity <= 0) {
        return;
    }
    const itemIndex = state.orderItems.findIndex(e => e === itemToRemove);
    return {
        ...state,
        orderItems: state.orderItems.map(
            (orderItem, i) => i === itemIndex ? {...orderItem, itemQuantity : itemToRemove.itemQuantity - 1, itemSubtotal: itemToRemove.itemSubtotal - itemToRemove.pricePerUnit} 
                : orderItem
        ),
        totalPrice: state.totalPrice - itemToRemove.pricePerUnit
    }
};

const deleteItem = (state, action) => {
    const itemToDelete = state.orderItems.find((element) => {
        return element.itemId === action.itemId;
    })
    const updatedDeleteOrderItems = state.orderItems.filter((element) => {
        return element.itemId !== itemToDelete.itemId;
    })
    const updatedDeleteTotal = state.totalPrice - itemToDelete.itemSubtotal;
    const updatedDeleteState = {
        orderItems: updatedDeleteOrderItems,   
        totalPrice: updatedDeleteTotal
    }
    return updateObject(state, updatedDeleteState);
    
};

const manualAddItem = (state, action) => {
    let currItems = [];
    state.orderItems.map(i => {
        return currItems.push(i);
    });

    const updatedManAddItems = currItems.concat(action.item);
    const updatedManAddTotalPrice = (+state.totalPrice + +action.item.itemSubtotal).toFixed(2);

    return updateObject(state, {
        orderId: state.orderId,
        orderItems: updatedManAddItems,
        totalPrice: updatedManAddTotalPrice
    });
};

const clearOrder = (state, action) => {
    const updatedClearedOrderItems = [{ 
        itemId: "",
        itemDescription: "",
        itemQuantity: 0,
        pricePerUnit: 0,
        itemSubtotal: 0
    }];
    const updatedClearedTotalPrice = 0;
    const updatedClearedState = {
        orderItems: updatedClearedOrderItems,
        totalPrice: updatedClearedTotalPrice
    }; 
    return updateObject(state, updatedClearedState);
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SET_ORDER:
            return setOrder(state, action);
        case actionTypes.REMOVE_ITEM:
            return removeItem(state, action);
        case actionTypes.INCREASE_QUANTITY:
            return increaseQuantity(state, action);
        case actionTypes.DELETE_ITEM:
            return deleteItem(state, action);
        case actionTypes.MANUAL_ADD_ITEM:
            return manualAddItem(state, action);
        case actionTypes.CLEAR_ORDER:
            return clearOrder(state, action);
        default:
            return state;
    }
};

export default reducer;