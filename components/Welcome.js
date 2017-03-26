import React from 'react';
import {Link} from 'react-router';

export default function () {
    return (
        <div>
            <span className="btn btn-primary btn-block newGameButton">
                <Link to="/login">Start A New Game</Link>
            </span>
            <span className="btn btn-primary btn-block joinGameButton">
                <Link to="/login">Join A Game</Link>
            </span>
        </div>
    )
}





