import React from "react";

export default class Navbar extends React.Component {
    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">eEeEeEeEeEeEe</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-sm-0">
                            <li className="nav-item">
                                <a className="active nav-link" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-sm-0 d-flex">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}