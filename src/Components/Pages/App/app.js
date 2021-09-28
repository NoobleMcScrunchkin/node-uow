import React from "react";
import Toast from "../../Toast/toast";
class App extends React.Component {
    handleToastClick() {
        // eslint-disable-next-line
        eval('$(".toast").toast("show")')
    }

    render() {
        const { children } = this.props;
        console.log(this.props);
        
        let toasts = [];

        for (let i = 0; i < 20; i++) {
            toasts.push(<Toast time={i + " mins ago"} body='test' name='Test Name'/>);
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Test-App</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-lg-0">
                                <li className="nav-item">
                                    <a className={ (window.location.pathname.endsWith('/') ? "active " : " ") + "nav-link" } aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className={ (window.location.pathname.endsWith('/login') ? "active " : " ") + "nav-link" } aria-current="page" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <main className='p-3'>
                    <div className='toast-container p-3 pt-0 position-absolute end-0 mh-100 overflow-auto pe-auto'>
                        {toasts}
                    </div>
                    <button className='btn btn-primary' type='button' onClick={ this.handleToastClick }>Show Toasts</button>
                    {children}
                </main>
                <footer>

                </footer>
            </div>
        );
    };
}

export default App;