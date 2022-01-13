import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

(function initLocalStorage(){
    if(!localStorage.getItem('current_Id')){
        localStorage.setItem('current_Id', JSON.stringify(0));
    }

    if(!localStorage.getItem('arrayData')){
        localStorage.setItem('arrayData', JSON.stringify([]));
    }
})();


ReactDOM.render(
    <App />, document.getElementById('root')
);

