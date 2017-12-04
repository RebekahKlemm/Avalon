// Third-Party
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Store Functions
import {updateUserLoginStatus} from '../../actions/users';
// Components
import Waiting from './Waiting';

class LoginContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };

    }

    componentDidMount() {
        var _this = this;
        window.addEventListener('fbload', function(evt) {
            _this.props.updateUserLoginStatus(evt.detail.status, evt.detail.id);
        });
    }

    // handleInputChange(e){
    //     this.setState({[e.target.name]:e.target.value});
    // }

    render(){
        if(this.props.currentUser && this.props.currentUser.status === 'connected'){
            return(
                <div>
                    User is Connected!  Let's show 'em the app!
                </div>
            )
        } else{
            return(
                <Waiting></Waiting>
            )
        }


        // return(
        //     <div
        //         className="fb-login-button"
        //         data-max-rows="1"
        //         data-size="large"
        //         data-button-type="continue_with"
        //         data-show-faces="true"
        //         data-auto-logout-link="false"
        //         data-use-continue-as="false"
        //     >
        //     </div>
        // )


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
        allUsers: state.users.allUsers,
        currentUser: state.users.currentUser
    };
};



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUserLoginStatus: function(status, id) {
            dispatch(updateUserLoginStatus(status, id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);


