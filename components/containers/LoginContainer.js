// Third-Party
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Store Functions
import {updateUserName} from '../../actions/users';
// Components
import Login from '../Login';

import { joinAGame, startAGame } from '../api';

class LoginContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            role: props.location.query.role,
            roomKey : "",
            currentPlayer: {},
            currentPlayerId: 'no player yet'
        };

        this.handlePlayerNameInput = this.handlePlayerNameInput.bind(this);
        this.handleRoomKeyInput = this.handleRoomKeyInput.bind(this);
        this.loginUser = this.loginUser.bind(this);

        if (this.state.role === 'organizer') {
            startAGame((err, roomKey, player) => this.setState({
                roomKey:roomKey,
                currentPlayer: player,
                currentPlayerId:player.id
            }));
        } else {
            joinAGame((err, player) => this.setState({
                currentPlayer: player,
                currentPlayerId:player.id
            }));
        }
    }

    handlePlayerNameInput(e){
        this.setState({userName:e.target.value});
    }

    handleRoomKeyInput(e){
        this.setState({roomKey:e.target.value});
    }

    loginUser(e) {
        e.preventDefault();
        Promise.all([
            this.props.updateUserName(this.state.currentPlayerId, this.state.userName),
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
                        <h2>Game Room Key:</h2>
                        {this.state.roomKey}
                        <h3>Give this key to your friends</h3>
                    </div>
                    <Login
                        handlePlayerNameInput={this.handlePlayerNameInput}
                        loginUser={this.loginUser}
                        {...this.state}>
                    </Login>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        This is the roomKey value: {this.state.roomKey}
                        This is the currentPlayerId: {this.state.currentPlayerId}
                    </div>
                    <Login
                        handlePlayerNameInput={this.handlePlayerNameInput}
                        loginUser={this.loginUser}
                        handleRoomKeyInput={this.handleRoomKeyInput}
                        {...this.state}>
                    </Login>
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
        updateUserName: function(playerId, userName) {
            dispatch(updateUserName(playerId, userName))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


