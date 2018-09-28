import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenForNewPlayers } from '../api';
// Store Functions
import { updatePlayers } from '../../actions/players';

class Waiting extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };


    }

  componentDidMount() {
      // get all current players and put them in the store
    this.props.updatePlayers(this.props.currentPlayer.player.gameId);

    // subscribe to updates for new players that join the same room
    listenForNewPlayers(() => {
      this.props.updatePlayers(this.props.currentPlayer.player.gameId);
    })
  }

    render(){

        return(
            <div>
                Waiting
            </div>
        )

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        currentPlayer: state.players.currentPlayer
    };
}

export default connect(mapStateToProps, { updatePlayers })(Waiting);


