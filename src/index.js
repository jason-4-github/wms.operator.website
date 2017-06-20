import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'antd/dist/antd.less';
import './styles/index.less';

import configureStore from './store/configureStore';
import ReceiveContainer from './containers/ReceiveContainer';
import IssueContainer from './containers/IssueContainer';
import IssueMenuContainer from './containers/Issue/IssueMenuContainer';
import IssueCheckFormContainer from './containers/Issue/IssueCheckFormContainer';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const routerSet = () => {
  return (
    <Router history={history}>
      <Route path="/" component={ReceiveContainer} />
      <Route path="/issue" component={IssueContainer} />
      <Route path="/issueMenu" component={IssueMenuContainer} />
      <Route path="/issueCheck" component={IssueCheckFormContainer} />
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    {routerSet()}
  </Provider>,
  document.getElementById('root'),
);
