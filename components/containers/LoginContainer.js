// Third-Party
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Store Functions
import { registerOrganizer, registerJoiner } from '../../actions/players';
// Components
import RoomKeyInput from '../RoomKeyInput';
import PlayerNameInput from '../PlayerNameInput';

import { joinAGame, startAGame } from '../api';

import openSocket from 'socket.io-client';
let socket = openSocket('192.168.33.104:3008');

class LoginContainer extends Component{

    state = {
        userName: "",
        roomKey : "",
        role: "",
        currentPlayer: {},
        currentPlayerId: 'no player yet'
    };

    componentWillMount() {
        this.setState({
            role: this.props.location.query.role,
        });
    }

    componentDidMount() {
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

    handlePlayerNameInput = (e) => {
        this.setState({userName:e.target.value});
    };

    handleRoomKeyInput = (e) => {
        this.setState({roomKey:e.target.value});
    };

    loginOrganizer = (e) => {
        e.preventDefault();
        this.props.registerOrganizer(this.state.currentPlayerId, this.state.userName)
            .then(() => {
                //redirect to whatever page
                this.props.router.push('waiting/');
            });
    };

    loginJoiner = (e) => {
        e.preventDefault();
        this.props.registerJoiner(this.state.currentPlayerId, this.state.userName, this.state.roomKey)
            .then(() => {
                socket.emit('new_player_joined');
                //redirect to whatever page
                this.props.router.push('waiting/');
            });
    };

    render(){
        switch(this.state.role) {
            case 'organizer' : {
                return (
                    <div>
                        <div>
                            <h2>Game Room Key:</h2>
                            {this.state.roomKey}
                            <h3>Give this key to your friends</h3>
                        </div>
                        <PlayerNameInput
                            handlePlayerNameInput={this.handlePlayerNameInput}
                            loginUser={this.loginOrganizer}
                            {...this.state}>
                        </PlayerNameInput>
                    </div>
                )
            }
            case 'joiner' : {
                return (
                    <div>
                        <RoomKeyInput
                            handleRoomKeyInput={this.handleRoomKeyInput}
                            {...this.state}>
                        </RoomKeyInput>
                        <PlayerNameInput
                            handlePlayerNameInput={this.handlePlayerNameInput}
                            loginUser={this.loginJoiner}
                            {...this.state}>
                        </PlayerNameInput>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        allPlayers: state.players.allPlayers,
        currentPlayer: state.players.currentPlayer
    };
};

export default connect(mapStateToProps, { registerOrganizer, registerJoiner })(LoginContainer);


