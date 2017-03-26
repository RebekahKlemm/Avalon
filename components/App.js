import React, {Component} from 'react';

export const App = function(props){
    return (
        <div id="main" className="container-fluid">
            <div>
                {
                    props.children && React.cloneElement(props.children, props)
                }
            </div>
        </div>
    );
}
