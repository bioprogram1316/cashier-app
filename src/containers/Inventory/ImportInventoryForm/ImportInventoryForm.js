import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';


class ImportInventoryForm extends Component {
    state = {
        // importData: {
        //     title: "",
        //     file: null,
        //     description: ""
        // },
        selectedFile: null,
        uploadJson: false,
        uploadCsv: false,
        uploadSql: false,
        importForm: {
            importName: {
                elementType: 'input',
                label: 'Import Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name Your Import'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            file: {
                elementType: 'input',
                label: 'File Upload',
                elementConfig: {
                    type: 'file',
                    placeholder: ''
                },
                multiple: true,
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            fileType: {
                elementType: 'select',
                label: 'Select Import File Type',
                elementConfig: {
                    options: [
                        {value: 'json', displayValue: 'JSON'},
                        {value: 'sql', displayValue: 'SQL'},
                        {value: 'csv', displayValue: 'CSV'}
                    ]
                },
                value: 'csv',
                validation: {
                    required: true
                },
                valid: true
                },
            importDescription: {
                elementType: 'textarea',
                label: 'Import Description (optional)',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Import Description'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    uploaderChangedHandler = (event) => {
        console.log('event.target.files[0]', event.target.files[0])
        if (event.target.files.length) {
            const arrFiles = Array.from(event.target.files);
            console.log('arrFiles', arrFiles);
            const files = arrFiles.map((file, index) => {
                const src = window.URL.createObjectURL(file);
                return {file, id: index, src}
            });
            this.props.onLoadFiles(files);
            console.log('files', files);
        };
    }

    uploadJson = () => {

    }

    uploadCsv = () => {

    }

    uploadSql = () => {

    }

    uploadFormHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.importForm) {
            formData[formElementIdentifier] = this.state.importForm[formElementIdentifier].value;
        }

        const inventoryImport = {
            formData: formData,
            uploadedfiles: this.state.selectedFile,
            userId: this.props.userId
        }

        this.props.onImportInventory(inventoryImport, this.props.token);
        // this.props.onOrderItems(order, this.props.token);
        // this.props.checkoutComplete();
    }

    inputChangedHandler = (event, inputIdentifier) => {

        let updatedFormElement = null;

        if (inputIdentifier === 'file') {
            this.uploaderChangedHandler(event);
            let valid = false;
            if (event.target.files.length) {
                valid = true;
            }
            console.log('event.target.files[0].name', event.target.files[0].name);
            updatedFormElement = updateObject(this.state.importForm[inputIdentifier], {
                valid: valid,
                value: event.target.value,
                touched: true
            });
            console.log('updatedFilelement', this.state.importForm[inputIdentifier]);
            const uploadedFile = event.target.files[0];
            console.log('uploadedFile', uploadedFile);
            //const updatedImportData = updateObject(this.state.importData, {file: uploadedFile});
            //console.log('updatedImportData', updatedImportData);
            //this.setState({importData: updatedImportData});
            this.setState({selectedFile: uploadedFile}, () => console.log('this.state', this.state));
        } else {
            updatedFormElement = updateObject(this.state.importForm[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.importForm[inputIdentifier].validation),
                touched: true
            });
        } 
        const updatedImportForm = updateObject(this.state.importForm, {
            [inputIdentifier]: updatedFormElement
        });
        console.log('inputIdentifier', inputIdentifier);
        let formIsValid = true;
        for (let inputIdentifier in updatedImportForm) {
            // the form is valid if the specific element is valid and the general formIsValid is still true
            formIsValid = updatedImportForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({importForm: updatedImportForm, formIsValid: formIsValid});
        console.log('importForm', this.state.importForm);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.importForm) {
            formElementsArray.push({
                id: key,
                config: this.state.importForm[key]
            });
        }

        let form = (
            <form onSubmit={this.uploadFormHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.config.label} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        multiple={formElement.config.multiple}
                        shouldValidate={formElement.config.validation} // validates only if the object has a validation check
                        touched={formElement.config.touched} // says whether the input line has been touched by the user
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>IMPORT INVENTORY</Button>
            </form>);

        return (
            <div>
                <h2>Inventory Upload Form</h2>
                {form}
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        uploadedFiles: state.inventory.files
    };
};

export const MapDispatchToProps = dispatch => {
    return {
        onLoadFiles: (files) => dispatch(actions.fileLoaded(files)),
        onImportInventory: (importData, token) => dispatch(actions.importInventory(importData, token))
    };
};

export default connect(mapStateToProps, MapDispatchToProps)(ImportInventoryForm, axios);