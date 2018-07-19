import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  constructor(props) {
    super();
    this.title = props.title;
    this.info = props.info ? props.info : '';
  }

  render() {
    return (
      <div className="content">
        <div className="header">
          <a href="/" className="homeLink"> InSure. </a>
          <a href="/">Insurance</a>
          <a href="/">Banking</a>
          <a href="/">Finances</a>
          <a href="/">Claims</a>
          <a href="/">Customer Care</a>
        </div>

        <div id="title">
          {this.title}
        </div>

        <div className="policyInfoContainer">
          {this.info}
        </div>
        { this.props.nav ? (
          <nav data-tabs className="bx--tabs tabs" role="navigation">
            <div className="bx--tabs-trigger">
              <svg width="10" height="5" viewBox="0 0 10 5">
                <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
              </svg>
            </div>
            <ul className="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
              <li className="bx--tabs__nav-item bx--tabs__nav-item--selected" data-target=".tab-1" role="presentation">
                <span id="tab-link-1" className="bx--tabs__nav-link" role="tab" aria-selected="true">My Motor Policy</span>
              </li>
              <li className="bx--tabs__nav-item" data-target=".tab-2" role="presentation">
                <span id="tab-link-2" className="bx--tabs__nav-link" role="tab" aria-selected="false">My Home Owners Policy</span>
              </li>
              <li className="bx--tabs__nav-item" data-target=".tab-3" role="presentation">
                <span id="tab-link-3" className="bx--tabs__nav-link" role="tab" aria-selected="false">My Travel Insurance Policy</span>
              </li>
            </ul>
          </nav>
        ) : null}

      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.object.isRequired,
  info: PropTypes.object,
  nav: PropTypes.bool,
};
