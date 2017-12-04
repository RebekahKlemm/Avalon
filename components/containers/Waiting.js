import React, { Component } from 'react';
import { connect } from 'react-redux';


class Waiting extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };


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
        // allUsers: state.users.allUsers
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // setSession: function(user){
        //     dispatch(setSession(user));
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);


