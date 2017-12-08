import React, { Component } from 'react';


export default function(props) {
    return (
        <form id="new-login-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.loginUser(e)}>
            <input
                name="userName"
                className="form-control"
                placeholder="Enter your name"
                onChange={e => props.handleInputChange(e)}
                value={props.userName}
            />
            <button id="login-submit" type="submit" form="new-login-form" value="Submit"
                    className="btn btn-primary btn-block">
                <span className="glyphicon glyphicon-plus"></span> SUBMIT
            </button>
            <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
        </form>
    )
}

