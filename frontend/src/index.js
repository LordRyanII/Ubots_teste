import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LinkedinAuth/TemplateLoginAuth/Main/Main';
import './assets/css/Global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthProvider } from './config/contextLogin';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);