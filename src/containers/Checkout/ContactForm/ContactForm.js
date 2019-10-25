import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateObject, checkValidity} from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactForm.module.css'
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

class ContactForm extends Component {
    state = { // make two options for in-person or delivery, will need different info 
        orderForm: {
            purchaseType: {
                elementType: 'select',
                label: 'Order Method',
                elementConfig: {
                    options: [
                        {value: 'in-person', displayValue: 'In Person'},
                        {value: 'delivery', displayValue: 'Delivery'}
                    ]
                },
                value: 'in-person',
                validation: {
                    required: true,
                },
                valid: true
            },
            name: {
                    elementType: 'input',
                    label: 'Name',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    label: 'Address',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
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
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                }, 
                email: {
                    elementType: 'input',
                    label: 'Email Address',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    label: 'Delivery Method',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'cheapest',
                    validation: {},
                    valid: true
                },
                paymentMethod: {
                    elementType: 'select',
                    label: 'Payment Method',
                    elementConfig: {
                        options: [
                            {value: 'cash', displayValue: 'Cash'},
                            {value: 'debit card', displayValue: 'Debit Card'},
                            {value: 'credit card', displayValue: 'Credit Card'}
                        ]
                    },
                    value: 'cash',
                    validation: {
                        required: true,
                    },
                    valid: true
                }
        },
        formIsValid: false  

    }

    orderHandler = (event) => {
        // forms by default send a request - this is to prevent sending the request
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const order = {
            orderId: this.props.orderId,
            orderItems: this.props.orderItems,
            // in a production app you should recalculate the price on the server
            totalPrice: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderItems(order, this.props.token);
        this.props.checkoutComplete();
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
               
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        }); 
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
 
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            // the form is valid if the specific element is valid and the general formIsValid is still true
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
      // find out how to conditionally show form elements based on option selection

      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }
      let form = (
          <form onSubmit={this.orderHandler}>
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
              <Button btnType="Success" disabled={!this.state.formIsValid}>COMPLETE ORDER</Button>
          </form>);

        return (
            <div className={classes.ContactForm}>
                <h2>Customer Information</h2>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orderId: state.cashier.orderId,
        orderItems: state.cashier.orderItems,
        totalPrice: state.cashier.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

export const mapDispatchToProps = dispatch => {
    return {
        onOrderItems: (orderData, token) => dispatch(actions.purchase(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm, axios);