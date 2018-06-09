import React from 'react'
import { Table, Grid, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { deleteEmployee } from '../actions/employees'

export class EmployeeTable extends React.Component {
    render() {
        console.log(this.props)
        let employees
        if(this.props.employees && this.props.employees.length) {
          employees = this.props.employees.map((employee, index) => (
            <Table.Row key={index}>
                <Table.Cell textAlign='center'>{employee.firstName}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.lastName}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.email}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.phoneNumber}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.address}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.organization}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.department}</Table.Cell>
                <Table.Cell textAlign='center'>{employee.title}</Table.Cell>
                <Table.Cell textAlign='center'>
                    <Link to={`/edit/${employee.id}`}><Icon color='teal' link name='edit' /></Link>
                </Table.Cell>
            </Table.Row>

          ));
      };


        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 1200 }}>
                    <Link className="add-new-employee" to="/new-employee">
                        <Button color='teal'>Add New Employee</Button>
                    </Link>
                    <Table singleLine>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Hire Date</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>E-mail Address</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Address</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Organization</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Department</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Title</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Edit</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {employees}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
            )
    }}

    const mapStateToProps = state => {
        const {currentUser} = state.auth;
        return {
            username: state.auth.currentUser.username,
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            employees: state.employees.employees
        };
    };
    
    export default requiresLogin()(connect(mapStateToProps)(EmployeeTable));