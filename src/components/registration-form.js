import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className='register-form'>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image className='logo' src='https://images.vexels.com/media/users/3/143487/isolated/preview/7fe39483697e2065910f66e9dacafd7e-turquoise-tick-check-mark-by-vexels.png' /> 
                        Sign Up for an Account
                    </Header>
                    <Form size='large' className="register-form"
                        onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                        )}>
                        <Segment stacked>
                            <label htmlFor="firstName">First name</label>
                            <Field component={Input} type="text" name="firstName" />
                            <label htmlFor="lastName">Last name</label>
                            <Field component={Input} type="text" name="lastName" />
                            <label htmlFor="username">Username</label>
                            <Field
                                component={Input}
                                type="text"
                                name="username"
                                validate={[required, nonEmpty, isTrimmed]}
                            />
                            <label htmlFor="password">Password</label>
                            <Field
                                component={Input}
                                type="password"
                                name="password"
                                validate={[required, passwordLength, isTrimmed]}
                            />
                            <label htmlFor="passwordConfirm">Confirm password</label>
                            <Field
                                component={Input}
                                type="password"
                                name="passwordConfirm"
                                validate={[required, nonEmpty, matchesPassword]}
                            />
                            <Button color='teal' fluid size='large' disabled={this.props.pristine || this.props.submitting}>
                                Log in
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? 
                        <Link to="/">Log In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);