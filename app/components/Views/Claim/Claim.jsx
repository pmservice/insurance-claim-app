import React from 'react';import { Link } from 'react-router-dom';import PropTypes from 'prop-types';import Header from '../../Header/Header';import InfoAds from '../../InfoAds/InfoAds';export default class Claim extends React.Component {  constructor() {    super();    this.state = {      claim: { },    };  }  componentDidMount() {    const { match: { params } } = this.props;    /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */    const claimId = params.claimId;    console.log('componentDidMount ', claimId);    fetch(`api/claim/${claimId}`)      .then(res => res.json())      .then(        (result) => {          console.log('fetched claim info', result);          if (result.err && result.err.statusCode === 404) {            this.setState({ notFound: true });            return;          }          this.setState({            claim: result,            claimId,          });        },        (error) => {          console.log('error', error);        },      );  }  render() {    const claimId = this.state.claimId;    const claim = this.state.claim;    let claimContent;    if (claim.properties) {      claimContent = claim.properties.map(prop => (        <div key={prop.id} className="bx--structured-list-row">          <div className="bx--structured-list-td bx--structured-list-content--nowrap">{prop.name}</div>          <div className="bx--structured-list-td"> {prop.value} </div>        </div>      ));    }    console.log(claimId, claim);    const title = (      <h2 className="title"> Welcome back! </h2>    );    const headerInfo = (      <div>Here is your claim. <div />        Need another one or have questions on a claim? <Link to="/"> Click here! </Link>      </div>    );    return (      <div>        <div className="container intro fixed">          <Header title={title} info={headerInfo} />        </div>        <div className="claim-info">          <div className="policy bx--row">            <div className="bx--col-xs-12 bx--col-sm-12 bx--col-md-8" style={{ padding: '0 3rem 2rem 0', borderBottom: '1px solid #00A3FE' }}>              <section className="bx--structured-list">                { !this.state.notFound ? (                  <div className="bx--structured-list-tbody">                    <div className="bx--structured-list-row">                      <div className="bx--structured-list-td bx--structured-list-content--nowrap">Claim Number</div>                      <div className="bx--structured-list-td" style={{ paddingTop: 0 }}> {this.state.claimId} </div>                    </div>                    {claimContent}                  </div>                ) : (                  <div className="bx--structured-list-tbody">                    Claim Not Found                  </div>                )}              </section>            </div>            <div className="box bx--col-xs-12 bx--col-sm-12 bx--col-md-4" style={{ border: 'none', paddingTop: '1rem', borderLeft: '1px solid #00A3FE' }}>              <h2> Need additional services? </h2>              <h3> Gotcha covered! Review all of our                    services and coverage plans.              </h3>              <ul>                <li>+ Finances </li>                <li>+ Banking </li>                <li>+ Home & Property  </li>                <li>+ Life </li>                <li>+ Renters </li>                <li>+ Pet </li>                <li>+ Health </li>                <li>+ Natural Disaster </li>                <li>+ And much more! </li>              </ul>              <div>                <button className="bx--btn bx--btn--secondary" type="button">Review Services</button>              </div>            </div>          </div>          <InfoAds servicesAds={false} />        </div>      </div>    );  }}Claim.propTypes = {  match: PropTypes.shape({    params: PropTypes.shape({      claimId: PropTypes.string.isRequired,    }),  }),};/* eslint-disable eol-last */