
/// this component is not being used, for reference only


import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginContainer3 extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };


    }

    // handleInputChange(e){
    //     this.setState({[e.target.name]:e.target.value});
    // }

    render(){
        return(
            <div
                className="fb-login-button"
                data-max-rows="1"
                data-size="large"
                data-button-type="continue_with"
                data-show-faces="true"
                data-auto-logout-link="false"
                data-use-continue-as="false"
            >
            </div>
        )


        // return(
        //     <div>
        //         <div
        //             className="fb-login-button"
        //             data-width="300"
        //             data-max-rows="1"
        //             data-size="large"
        //             data-button-type="continue_with"
        //             data-show-faces="false"
        //             data-auto-logout-link="false"
        //             data-use-continue-as="true">
        //         </div>
        //         <div>{this.state.message}</div>
        //     </div>
        //     )
        // return (<Login handleInputChange={this.handleInputChange} loginUser={this.loginUser} {...this.state}/>)
        //     <fb:login-button
        // scope="public_profile,email"
        // onlogin="checkLoginState();">
        //     </fb:login-button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer3);


