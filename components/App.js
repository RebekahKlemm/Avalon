import React, {Component} from 'react';

import Nav from './Nav';

export const App = function(props){
    return (
        <div id="main" className="container-fluid">
            <div>
                <Nav />
            </div>
            <div>
                {
                    props.children && React.cloneElement(props.children, props)
                }
            </div>
        </div>
    );
}
