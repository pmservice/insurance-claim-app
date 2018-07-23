import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import NewClaim from '../components/Views/NewClaim/NewClaim';
import Policy from '../components/Views/Policy/Policy';
import Claim from '../components/Views/Claim/Claim'

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/newClaim/:policyId" component={NewClaim} />
        <Route path="/policy/:policyId" component={Policy} />
        <Route path="/claim/:claimId" component={Claim} />
      </Switch>
    </Router>
  );
};

export default Root;

