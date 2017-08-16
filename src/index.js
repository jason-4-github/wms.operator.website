import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'antd/dist/antd.less';
import './styles/index.less';

import configureStore from './store/configureStore';
import ReceiveContainer from './containers/ReceiveContainer';
import DeleteFormContainer from './containers/DeleteFormContainer';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const routerSet = () => {
  return (
    <Router history={history}>
      <Route path="/" component={ReceiveContainer} />
      <Route path="/deleteForm" component={DeleteFormContainer} />
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    {routerSet()}
  </Provider>,
  document.getElementById('root'),
);
