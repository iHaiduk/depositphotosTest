/**
 * Created by igor on 19.02.17.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import routes from './../routes';
import myStore from './../store';

const history = createBrowserHistory();

const initialState = window.defaultState;
const store = myStore(initialState);

render(
    <Provider store={store}>
        <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('app')
);
