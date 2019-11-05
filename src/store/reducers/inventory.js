import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    files: [],
    pending: [],
    next: null,
    uploading: false,
    uploaded: {},
    status: "idle",
    fileType: "",
    inventoryName: "",
    inventoryDescription: "",
    inventoryItems: []
};

const fileLoaded = (state, action) => {
    return updateObject(state, {
        files: action.files, 
        status: "LOADED"
    });
};

const fileUploadInit = (state, action) => {
    return updateObject(state, {
        uploading: true,
        pending: state.files,
        status: "INIT"
    });
};

const fileUploadSuccess = (state, action) => {
    const updatedUploaded = updateObject(state.uploaded, {
        [action.prev.id]: action.prev.file
    });
    return updateObject(state, {
        next: null,
        pending: action.pending,
        uploaded: updatedUploaded,
        status: "UPLOAD_SUCCESS"
    });
};

const filesUploadedComplete = (state, action) => {
    return updateObject(state, {
        uploading: false,
        status: "UPLOAD_COMPLETE"
    });
};

const fileUploadFail = (state, action) => {
    return updateObject(state, {
        uploading: false,
        error: action.error,
        status: "UPLOAD_FAIL"
    });
};

const fileUploadPending = (state, action) => {
    return updateObject(state, {
        next: action.next,
        status: "PENDING"
    });
};

const uploadInventorySuccess = (state, action) => {};

const uploadInventoryFail = (state, action) => {};

const fetchSavedInventoryStart = (state, action) => {};

const fetchSavedInventoryFail = (state, action) => {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILE_LOADED:
            return fileLoaded(state, action);
        case actionTypes.FILE_UPLOAD_INIT:
            return fileUploadInit(state, action);
        case actionTypes.FILE_UPLOAD_SUCESS:
            return fileUploadSuccess(state, action);
        case actionTypes.FILE_UPLOAD_FAIL:
            return fileUploadFail(state, action);
        case actionTypes.FILE_UPLOAD_PENDING:
            return fileUploadPending(state, action);
        case actionTypes.FILES_UPLOADED_COMPLETE:
            return filesUploadedComplete(state, action);
        default:
            return state;
    }
};

export default reducer;