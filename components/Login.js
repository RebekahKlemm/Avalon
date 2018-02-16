import React from 'react';
import RoomKeyInput from './RoomKeyInput';
import PlayerNameInput from './PlayerNameInput';

export default function(props) {
    switch(props.role) {
        case 'joiner' : {
            return(
                <div>
                    <RoomKeyInput {...props}></RoomKeyInput>
                    <PlayerNameInput {...props}></PlayerNameInput>
                </div>
            )
        }
        case 'organizer' : {
            return (
                <PlayerNameInput {...props}></PlayerNameInput>
            )
        }
    }
}

