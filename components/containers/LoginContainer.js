// Third-Party
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Store Functions
import {login} from '../../actions/users';
// Components
import Login from '../Login';

class LoginContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            role: props.location.query.role,
            key : this.generateKey()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.generateKey = this.generateKey.bind(this);
    }

    generateKey() {
        if(this.props.location.query.role === 'organizer') {
            return Math.round(Math.random() * (90000 - 1000) + 10000);
        }
        else {
            return null;
        }
    }

    handleInputChange(e){
        this.setState({userName:e.target.value});
    }

    loginUser(e) {
        e.preventDefault();
        Promise.all([
            this.props.login(this.state.userName),
        ]).then(() => {
            //redirect to whatever page
            this.props.router.push('waiting/');
        });
    }

    render(){
        if (this.state.role === 'organizer') {
            return (
                <Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}></Login>
            )
        } else {
            return (
                <Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}></Login>
            )
        }

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        allUsers: state.users.allUsers,
        currentUser: state.users.currentUser
    };
};



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: function(userName) {
            dispatch(login(userName))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


