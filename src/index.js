import { React } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './Components/Pages/App/app';
import Login from './Components/Pages/Login/login';
import MainPage from './Components/Pages/MainPage/mainPage';

ReactDOM.render(
  <Router>
    <App>
      <Route exact path='/'>
        <MainPage/>
      </Route>
      <Route exact path='/login'>
        <Login/>
      </Route>
    </App>
  </Router>,
  document.getElementById('root')
);
