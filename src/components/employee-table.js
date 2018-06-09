import React from 'react'
import { Table, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class EmployeeTable extends React.Component {
    componentDidMount() {   
    }
    render() {
        console.log(this.props)
        let employees
        if(this.props.employees && this.props.employees.length) {
          employees = this.props.employees.map((employee, index) => (
            <Table.Row key={index}>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>Phone Number</Table.Cell>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>Organization</Table.Cell>
                <Table.Cell>Department</Table.Cell>
                <Table.Cell>Title</Table.Cell>
                <Table.Cell>Edit</Table.Cell>
                <Table.Cell>Delete</Table.Cell>
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
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Hire Date</Table.HeaderCell>
                            <Table.HeaderCell>E-mail Address</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Organization</Table.HeaderCell>
                            <Table.HeaderCell>Department</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
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