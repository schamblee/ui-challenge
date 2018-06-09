import React from 'react'
import { Table, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const EmployeeTable = () => (
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
            <Table.Row>
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
            </Table.Body>
        </Table>
    </Grid.Column>
</Grid>
)

export default EmployeeTable