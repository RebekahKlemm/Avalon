import React, {Component} from 'react';
import { connect } from 'react-redux';

import Login from '../Login';
import {setSession} from '../../actions/users'

class LoginContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            phone: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return (<Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}/>)
    }

    loginUser(e){
        e.preventDefault();
        const loginAttempt = {
            phone: e.target.phone.value,
            password: e.target.password.value,
            user:{}
        };
        this.props.allUsers.map(user => {
            if (loginAttempt.phone === user.phone && loginAttempt.password === user.password){

                this.props.setSession(user)

                this.setState({
                    phone: '',
                    password: '',
                    user:user
                });
                //send user to next page, possibly with a delay if things don't load properly
               // window.setTimeout(() => this.props.router.push(user.role + '/'+loginAttempt.phone), 1000);

            }
        });

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        allUsers: state.users.allUsers
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setSession: function(user){
            dispatch(setSession(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

