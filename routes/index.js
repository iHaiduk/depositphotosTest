/**
 * Created by igor on 19.02.17.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
    App,
    Home
} from './../view/containers';

export default (
    <Route path={'/'} component={App}>
        <IndexRoute component={Home} />
    </Route>
);
