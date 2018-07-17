import React from 'react';
import Button from 'carbon-components-react/lib/components/Button';
import PropTypes from 'prop-types';

export default class InfoAds extends React.Component {
  render() {
    return (
      <div className="info">
        <div className="bx--row">
          <div className="box bx--col-xs-12 bx--col-md-4">
            <h2> Get into an accident? </h2>
            <h3> No worries, life sometimes happens!
              Get started on making a claim today.
            </h3>
            <ul>
              <li>+ Log in to review your policy and start a claim. </li>
              <li>+ Manage policies & claims in one space.</li>
              <li>+ Get a response from us within 2 hours! </li>
            </ul>
            <Button kind="secondary" onClick={this.makeClaimHandler}>
              Make Claim
            </Button>
          </div>
          <div className="box bx--col-xs-12 bx--col-md-4">
            <h2> Going somewhere soon? </h2>
            <h3> Plan ahead to find the perfect travel
              insurance for all your adventures!
            </h3>
            <ul>
              <li> + Request a quote from our representatives. </li>
              <li> + Prepare for upcoming trips with our travel map. </li>
              <li> + Coverage for over 30 countries world-wide! </li>
              <li> + Includes additional excursion plans. </li>
            </ul>
            <button className="bx--btn bx--btn--secondary" type="button">Create Travel Plan</button>
          </div>
          {this.props.servicesAds ? (
            <div className="box bx--col-xs-12 bx--col-md-4">
              <h2> Need additional services? </h2>
              <h3> Gotcha covered! Review all of our
              services and coverage plans.
              </h3>
              <ul>
                <li>+ Finances </li>
                <li>+ Banking </li>
                <li>+ Home & Property  </li>
                <li>+ And much more! </li>
              </ul>
              <button className="bx--btn bx--btn--secondary" type="button">Review Services</button>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

InfoAds.propTypes = {
  servicesAds: PropTypes.bool,
};
