import React, { Component } from 'react';


export default function(props) {
    // console.log("props in Login --->", props)
    return (
        <form id="new-login-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.loginUser(e)}>
            <input
                id="phone-input"
                name="phone"
                className="form-control"
                placeholder="Enter phone number"
                onChange={e => props.handleInputChange(e)}
                value={props.phone}
            />
            <input
                id="password-input"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={e => props.handleInputChange(e)}
                value={props.password}
            />
            <button id="login-submit" type="submit" form="new-login-form" value="Submit"
                    className="btn btn-primary btn-block">
                <span className="glyphicon glyphicon-plus"></span> SUBMIT
            </button>
            <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
        </form>
    )
}

