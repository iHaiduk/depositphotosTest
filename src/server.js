/**
 * Created by igor on 19.02.17.
 */
import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {match, RouterContext} from 'react-router';
import { Provider } from 'react-redux';
import routes from './../routes';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import rest from './rest';
import storeCreate from './../store';
import Todo from './model';

const app = express();
const router = express.Router();
app.use(cookieSession({
    name: 'session',
    keys: ['deposit', 'photos']
}));
app.use(cookieParser());
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);
// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use(function (req, res, next) {
    if (req.session.nowInMinutes == null) {
        req.session.nowInMinutes = Date.now() / 60e3;
    }
    next();
});
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(path.resolve(__dirname, 'public')));

rest(router, app);
//
app.use(async (req, res) => {
    const {list} = await Todo.findOne({userId: req.cookies.session}) || {list: []};
    const store = storeCreate({todos: {list}});
    const data = store.getState();

    let location = createMemoryHistory(req.url);

    match({routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) return res.status(404).end('Not found.');

        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        const componentHTML = renderToString(InitialComponent);
        let head = Helmet.rewind();

        const HTML = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${head.title.toString()}
                ${head.meta.toString()}
                ${head.link.toString()}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
              </head>
              <body>
                <div id="app">${componentHTML}</div>
                <script type="application/javascript">
                  window.defaultState = ${JSON.stringify({todos: data.todos})};
                </script>
                <script src="/assets/bundle.js"></script>
              </body>
            </html>    
        `;
        res.end(HTML);
    });
});
export default app;
