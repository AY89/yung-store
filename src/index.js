import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import appSetup from './appSetup';

import './index.scss';

appSetup();

const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  // ...other stores
};
const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
