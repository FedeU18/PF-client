import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/index';
import AuthenticationProvider from './Authentication/context/AuthContext';
import Aos from 'aos';
import "aos/dist/aos.css"
Aos.init();



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </BrowserRouter>
  </Provider>
)



// no tocar ni borrar =>
// npm install -g firebase-tools
// firebase login
// firebase init