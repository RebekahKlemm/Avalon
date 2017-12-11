// Third-Party
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Store Functions
import {login} from '../../actions/users';
// Components
import Login from '../Login';

import { joinAGame, startAGame } from '../api';

class LoginContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            role: props.location.query.role,
            key : 'no key yet',
            currentPlayerId: 'no player yet'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);

        if (this.state.role === 'organizer') {
            startAGame((err, roomKey, player) => this.setState({
                key:roomKey,
                currentPlayerId:player
            }));
        } else {
            joinAGame((err, player) => this.setState({
                currentPlayerId:player
            }));
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
                <div>
                    <div>
                        This is the roomKey value: {this.state.key}
                        This is the currentPlayerId: {this.state.currentPlayerId}
                    </div>
                    <Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}></Login>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        This is the roomKey value: {this.state.key}
                        This is the currentPlayerId: {this.state.currentPlayerId}
                    </div>
                    <Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}></Login>
                </div>
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


