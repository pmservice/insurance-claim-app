import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import NewClaim from '../components/Views/NewClaim/NewClaim';
import Policy from '../components/Views/Policy/Policy';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/newClaim/:policyId" component={NewClaim} />
        <Route path="/policy/:policyId" component={Policy} />
      </Switch>
    </Router>
  );
};

export default Root;

