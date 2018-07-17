import React from 'react';
// import img from '../assets/images/react_logo_512x512.png';
import Header from './Header/Header';
import InfoAds from './InfoAds/InfoAds';
import Actions from './Actions/Actions';

export default class App extends React.Component {
  render() {
    const title = (
      <h2 className="title"> Let&apos;s get you out and <div />
        on the road, <strong>today!</strong>
      </h2>
    );

    return (
      <div>
        <div className="container intro">
          <Header title={title} />
          <Actions />
        </div>

        <InfoAds servicesAds />
      </div>
    );
  }
}
