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
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.object.isRequired,
  info: PropTypes.object,
};
