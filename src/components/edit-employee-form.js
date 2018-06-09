import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { updateEmployee, fetchEmployee } from '../actions/employees';
import { login } from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {required, nonEmpty, matches, length} from '../validators';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'



export class EditEmployeeForm extends React.Component {
    onSubmit(values) {
        const id = this.props.employeeId
        const {firstName, lastName, hireDate, email, phoneNumber, address, organization, department, title} = values;
        const employee = {id, firstName, lastName, hireDate, email, phoneNumber, address, organization, department, title};
        return this.props
            .dispatch(updateEmployee(employee))
    }

    render() {
        if (this.props.submitSucceeded === true ) {
            return (
                <div>
                  <Redirect to="/" />
                </div>
            )
        }  
        return (
            <div className='edit-employee-form'>
      
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image className='logo' src='https://images.vexels.com/media/users/3/143487/isolated/preview/7fe39483697e2065910f66e9dacafd7e-turquoise-tick-check-mark-by-vexels.png' /> 
                        Edit Employee Information
                    </Header>
                    <Form size='large' className="register-form"
                        onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                        )}>
                        <Segment stacked>
                            <label htmlFor="firstName">First name</label>
                            <Field 
                                component={Input} 
                                type="text" 
                                name="firstName" 
                                validate={[required, nonEmpty]} 
                            />
                            <label htmlFor="lastName">Last name</label>
                            <Field 
                                component={Input} 
                                type="text" 
                                name="lastName" 
                                validate={[required, nonEmpty]} 
                            />
                            <label htmlFor="email">Email Address</label>
                            <Field
                                component={Input}
                                type="text"
                                name="email"
                            />
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field
                                component={Input}
                                type="text"
                                name="phoneNumber"
                            />
                            <label htmlFor="address">Address</label>
                            <Field
                                component={Input}
                                type="text"
                                name="address"
                            />
                            <label htmlFor="organization">Organization</label>
                            <Field
                                component={Input}
                                type="text"
                                name="organization"
                            />
                            <label htmlFor="department">Department</label>
                            <Field
                                component={Input}
                                type="text"
                                name="department"
                            />
                            <label htmlFor="title">Title</label>
                            <Field
                                component={Input}
                                type="text"
                                name="title"
                            />
                            <Button color='teal' fluid size='large'>
                                Update Employee
                            </Button>
                            <Link to="/"><Button basic fluid size='large'>
                                Cancel
                            </Button></Link>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
        );
    }
}

export default reduxForm({
    form: 'edit-employee',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('edit-employee', Object.keys(errors)[0]))
})(EditEmployeeForm);
