import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

(function initLocalStorage(){
    if(!localStorage.getItem('current_Id')){
        localStorage.setItem('current_Id', JSON.stringify(0));
    }

    if(!localStorage.getItem('arrayData')){
        localStorage.setItem('arrayData', JSON.stringify([]));
    }

    if(!localStorage.getItem('empl_data')){
        localStorage.setItem('empl_data', JSON.stringify([]));
    }
})();


ReactDOM.render(
    <App />, document.getElementById('root')
);

