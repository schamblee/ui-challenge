import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { updateEmployee, fetchEmployee, deleteEmployee } from '../actions/employees';
import { login } from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import EditEmployeeForm from './edit-employee-form'
import { connect } from 'react-redux';
import {required, nonEmpty, matches, length} from '../validators';
import { Button, Modal, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export class EditEmployee extends React.Component {
    componentDidMount() {   
        const editEmployeePath = this.props.location.pathname.split('/')
        this.props.dispatch(fetchEmployee(editEmployeePath[2]))
        //used to get current employee data
    }

    render() {
        let employee;
        let dispatch = this.props.dispatch
        let initialValues;
        let employeeId;
        //passes initial values to edit-employee-form.js
        if(this.props.currentEmployee) {
            initialValues = this.props.currentEmployee;
            employeeId = this.props.currentEmployee.id
        } 
        function handleClick(e) {
            e.preventDefault();
            dispatch(deleteEmployee(employeeId))
          }

        return (
            <div>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
             <EditEmployeeForm employeeId={employeeId} initialValues={initialValues} />
             <Modal size="small" trigger={
                <Button basic color="red" fluid size='large'>
                Delete Employee
                </Button>}>
                <Modal.Header>Are you sure you want to delete this employee?</Modal.Header>
                <Modal.Content image>
                <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                <Modal.Description>
                    <Button basic color="red" onClick={handleClick}>Delete</Button>
                </Modal.Description>
                </Modal.Content>
            </Modal>
            </Grid.Column>
            </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentEmployee: state.employees.currentEmployee
    };
};

export default requiresLogin()(connect(mapStateToProps)(EditEmployee));