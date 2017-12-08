import React from 'react';
import {Link} from 'react-router';

export default function () {
    return (
        <div>
            <Link to="/login">
                <span className="btn btn-primary btn-block newGameButton">Start A New Game</span>
            </Link>
            <Link to="/login">
                <span className="btn btn-primary btn-block joinGameButton">Join A Game</span>
            </Link>
        </div>
    )
}





