import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth';
import { Link } from 'react-router-dom';
import { required, nonEmpty } from '../validators';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image className='logo' src='https://images.vexels.com/media/users/3/143487/isolated/preview/7fe39483697e2065910f66e9dacafd7e-turquoise-tick-check-mark-by-vexels.png' /> Log-in to your account
                    </Header>
                    <Form size='large' className="login-form"
                            onSubmit={this.props.handleSubmit(values =>
                                this.onSubmit(values)
                            )}>
                        <Segment stacked>
                            {error}
                            <label htmlFor="username">Username</label>
                            <Field
                                component={Input}
                                type="text"
                                name="username"
                                id="username"
                                validate={[required, nonEmpty]}
                            />
                            <label htmlFor="password">Password</label>
                            <Field
                                component={Input}
                                type="password"
                                name="password"
                                id="password"
                                validate={[required, nonEmpty]}
                            />
                            <Button color='teal' fluid size='large' disabled={this.props.pristine || this.props.submitting}>
                                Log in
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/register">Sign Up</Link>
                    </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);