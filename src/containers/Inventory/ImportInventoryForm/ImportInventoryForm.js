import React, {Component} from 'react';

import {updateObject, checkValidity} from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';


class ImportInventoryForm extends Component {
    state = {
        importData: {
            title: "",
            file: null,
            description: ""
        },
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
            filePath: {
                elementType: 'input',
                label: 'File Location',
                elementConfig: {
                    type: 'url',
                    placeholder: 'File Path'
                },
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
            filePath: this.p,
            fileData: formData,
            userId: this.props.userId
        }

        // this.props.onOrderItems(order, this.props.token);
        // this.props.checkoutComplete();
    }

    inputChangedHandler = (event, inputIdentifier) => {
               
        const updatedFormElement = updateObject(this.state.importForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.importForm[inputIdentifier].validation),
            touched: true
        }); 
        const updatedImportForm = updateObject(this.state.importForm, {
            [inputIdentifier]: updatedFormElement
        });
 
        let formIsValid = true;
        for (let inputIdentifier in updatedImportForm) {
            // the form is valid if the specific element is valid and the general formIsValid is still true
            formIsValid = updatedImportForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({importForm: updatedImportForm, formIsValid: formIsValid});
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

export default ImportInventoryForm;