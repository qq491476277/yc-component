import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Button from '@/components/button/index'
// import Button from './components/button/index'

// let Ha: React.FC = ({ children }) => {
//     return <h2 key='b' >222{children}</h2>
// } 
// let Add = () => {
//     return <Ha>111</Ha>
// }

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
