import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import EmployeeTable from './employee-table';
import { Button, Message, Grid } from 'semantic-ui-react';
import { fetchEmployees } from '../actions/employees';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchEmployees());    
    }
    render() {
        return (
            <div className="dashboard">
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 1200 }}>
                <Message className="welcome-message">
                <Message.Header>Welcome to the HR Portal!</Message.Header>
                    <div className="dashboard-username">
                        Username: {this.props.username}
                    </div>
                    <div className="dashboard-name">Name: {this.props.name}</div>
                </Message>
                </Grid.Column>
            </Grid>
                <EmployeeTable employees={this.props.employees} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        employees: state.employees.employees
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));