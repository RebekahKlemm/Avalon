import React from 'react';
import {Link} from 'react-router'


export default function Nav() {
    return (
            <nav className="navbar navbar-inverse blue">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Animal Alerts</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link href='#'>Signup <span className="sr-only">(current)</span></Link></li>
                            <li><a href="#/login">Login</a></li>
                            <li><a href="/api/users/logout">Logout</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        </ul>
                    </div>
                </div>
            </nav>
    )
}



