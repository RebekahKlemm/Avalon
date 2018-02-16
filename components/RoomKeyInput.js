import React from 'react';


export default function(props) {
    return (
        <form id="roomkey-input-form" className="form-group" style={{marginTop: '20px'}}>
            <input
                name="userName"
                className="form-control"
                placeholder="Enter roomkey"
                onChange={e => props.handleRoomKeyInput(e)}
                value={props.roomKey}
            />
            <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid roomKey</div>
        </form>
    )
}

