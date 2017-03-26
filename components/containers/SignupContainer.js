import React, {Component} from 'react';
import { connect } from 'react-redux';

import Signup from '../Signup';
import {addUToDb} from '../../actions/users'

class SignupContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            first: '',
            last: '',
            address: '',
            phone: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.signUpUser = this.signUpUser.bind(this);

    }

    handleAddress(e){
        //Ugh, I could not figure out how to validate the address and alert the user if they enter an invalid address!!

    }

    handleInputChange(e){
        //set local state
            this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return (<Signup handleInputChange={this.handleInputChange} signUpUser={this.signUpUser} {...this.state} handleAddress={this.handleAddress}/>)
    }

    signUpUser(e){
        e.preventDefault();
        const user = {
            first: e.target.first.value,
            last: e.target.last.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            password: e.target.password.value
        }



        Promise.all([
            this.props.addUToDb(user),
        ]).then(() => {
            //redirect to whatever page
            // this.props.router.push('welcome/');
        })




        this.setState({
            first: '',
            last: '',
            address: '',
            phone: '',
            password: ''
        })
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
            addUToDb: function(user){
                dispatch(addUToDb(user));
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);




