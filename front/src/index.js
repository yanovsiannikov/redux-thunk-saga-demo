import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducer';
// import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import createSagaMiddleWare from 'redux-saga'
import {watchTasks} from './actions/actions'

import AddTodo from './components/AddTask'
import List from './components/List'

const composeEnhancers = composeWithDevTools({})

const saga = createSagaMiddleWare();

const store = createStore(reducers, composeEnhancers(applyMiddleware(saga)))

saga.run(watchTasks)

const App = () => 
        <div>
            <Route exact path='/' render={() => <Menu />} />
            <Route exact path='/list' render={() =>
                <div>
                    <List />
                    <AddTodo />
                    <Link to='/'>Back</Link>
                </div>} />
        </div>

const Menu = () => {
   const fetchDataBase = async () => {
       let response = await fetch('/test')
       console.log(response)
       let data = await response.text()
       alert(data);
   }

    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/list'>Task List</Link></li>
                <button type="button" onClick={fetchDataBase}>Backend Connect</button>
            </ul>
        </div>
    )}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
