import * as actionTypes from './actionTypes';

export const fileUploadInit = () => {
    return {
        type: actionTypes.FILE_UPLOAD_INIT
    };
};

export const fileUploadSuccess = (id, fileData) => {
    return {
        type: actionTypes.FILE_UPLOAD_SUCESS,
        id: id,
        fileData: fileData
    }
};

export const fileUploadFail = (error) => {
    return {
        type: actionTypes.FILE_UPLOAD_FAIL,
        error: error
    }
};

export const importInventory = (id, fileData) => {
    return {
        type: actionTypes.IMPORT_INVENTORY,
        id: id,
        fileData: fileData
    };
};

/*

export const importInventory = (fileData, token) => {
    return dispatch => {
        dispatch(fileUploadInit());
       axios.post('/inventory.json?auth=' + token, fileData)
        .then(response => {
            console.log('importInventory Axios Response', response);
            console.log('importInventory fileData', fileData);
            dispatch(fileUploadSucess(response.data.name, fileData));
            dispatch(parseInventory(fileData));
        })
        .catch(error => {
            dispatch(fileUploadFail(error));
        })
    };
};*/

export const fileLoaded = (files) => {
    return {
        type: actionTypes.FILE_LOADED,
        files: files
    };
};