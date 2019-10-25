import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddItemForm.module.css';
import {updateObject, checkValidity, makeId} from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import * as actions from '../../../../store/actions/index';


class AddItemForm extends Component {
    state = {
        addItemForm: {
            id: {
                    elementType: 'input',
                    label: 'Item ID',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ID Number'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                description: {
                    elementType: 'input',
                    label: 'Item Description',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Description'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3
                    },
                    valid: false,
                    touched: false
                },
                quantity: {
                    elementType: 'input',
                    label: 'Number of this Item',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Quantity'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                },
                pricePerUnit: {
                    elementType: 'input',
                    label: 'Price for one item',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'PPU'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 2
                    },
                    valid: false,
                    touched: false
                }, 
                subtotal: {
                    elementType: 'input',
                    label: 'Item Subtotal',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Total price for this item'
                    },
                    value: '0.00',
                    validation: {
                        required: true,
                        minLength: 2
                    },
                    valid: true,
                    touched: true
                }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
               
        const updatedFormElement = updateObject(this.state.addItemForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.addItemForm[inputIdentifier].validation),
            touched: true
        }); 
        const updatedItemForm = updateObject(this.state.addItemForm, {
            [inputIdentifier]: updatedFormElement
        });
 
        let formIsValid = true;
        for (let inputIdentifier in updatedItemForm) {
            // the form is valid if the specific element is valid and the general formIsValid is still true
            formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
        }
        // if quantity or pricePerUnit is updated recalculate the item subtotal automatically
        if (inputIdentifier === 'quantity' || inputIdentifier === 'pricePerUnit') {
            const subtotal = updatedItemForm['quantity'].value * updatedItemForm['pricePerUnit'].value;
            updatedItemForm['subtotal'].value = subtotal.toFixed(2);
        }

        this.setState({addItemForm: updatedItemForm, formIsValid: formIsValid});
    }

    addItemHandler = (event) => {
        // forms by default send a request - this is to prevent sending the request
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.addItemForm) {
            formData[formElementIdentifier] = this.state.addItemForm[formElementIdentifier].value;
        }

        const item = {
            itemId: formData.id,
            itemDescription: formData.description,
            itemQuantity: formData.quantity,
            pricePerUnit: formData.pricePerUnit,
            itemSubtotal: formData.subtotal
        }
        
        this.props.onManualAddItem(item);

        // const resetForm = () => {
        //     updateObject(this.state.addItemForm, {

        //     })
        //     this.setState({
        //         addItemForm: {
        //             ...this.state.addItemForm,
        //             value: ''
        //         }
        //     }); 
        // };// reset form

    }

    render () {

    const formElementsArray = [];
    for (let key in this.state.addItemForm) {
        formElementsArray.push({
            id: key,
            config: this.state.addItemForm[key]
        });
    }

    let form = (
        <form onSubmit={this.addItemHandler}>
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
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.addItemHandler}>ADD ITEM</Button>
        </form>);

        return (
            <div className={classes.AddItemForm}>
                <h2>Item Information</h2>
                {form}
                <Button btnType="Warning" clicked={this.props.closeForm}>Finished Adding Items</Button>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onManualAddItem: (item) => dispatch(actions.manualAddItem(item))
    };
};

export default connect(null, mapDispatchToProps)(AddItemForm);