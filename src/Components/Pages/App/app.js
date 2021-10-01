import React from "react";
import Toast from "../../toast";
import Navbar from "../../navbar";
import Login from '../Login/login';
import MainPage from '../MainPage/mainPage';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
    handleToastClick() {
        // eslint-disable-next-line
        eval('$(".toast").toast("show")')
    }

    render() {       
        let toasts = [];

        for (let i = 0; i < 5; i++) {
            toasts.push(<Toast time={i + " mins ago"} body='test' name='Test Name'/>);
        }

        if (false) {
            return (
                <Login/>
            );
        }

        return (
            <div className='h-100 d-flex flex-column'>
                <Navbar isLoggedIn={true}/>

                <div className='toast-container p-3 position-fixed bottom-0 end-0 overflow-hidden'>
                    {toasts}
                </div>

                <main className='main p-3 position-relative overflow-auto text-white'>
                    <button className='btn btn-primary' type='button' onClick={ this.handleToastClick }>Show Toasts</button>
                    <Router>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <Route exact path='/logout'>
                            <Redirect to='/'/>
                        </Route>
                    </Router>
                </main>
                
                <footer>

                </footer>
            </div>
        );
    };
}

export default App;