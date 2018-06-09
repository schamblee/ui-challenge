import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { Image, Button } from 'semantic-ui-react'

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <Button basic className="logout-btn" 
                onClick={() => this.logOut()}>Log out</Button>
            );
        }
        return (
            <div className="header-bar">
                <h1><Image className="logo" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/2000px-White_check.svg.png" 
                alt="HR Portal" /> HR Portal </h1>                
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);