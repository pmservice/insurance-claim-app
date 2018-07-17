import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import NewClaim from '../components/Views/NewClaim/NewClaim';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/newClaim/:policyId" component={NewClaim} />
      </Switch>
    </Router>
  );
};

export default Root;

