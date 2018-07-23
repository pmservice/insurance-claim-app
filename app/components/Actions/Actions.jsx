import React from 'react';
import Button from 'carbon-components-react/lib/components/Button';
import TextInput from 'carbon-components-react/lib/components/TextInput';
import { Link } from 'react-router-dom';

export default class Actions extends React.Component {
  constructor() {
    super();
    this.state = {
      policyNo: '',
      claimNo: '',
    };
  }

  render() {
    return (
      <div>
        <div id="input-container" className="inputContainer">
          <div className="bx--row">
            <div className="bx--col-xs-12 bx--col-md-3">
              <div className="bx--form-item">
                <TextInput
                  id="policyInput"
                  labelText="Policy Number"
                  onChange={evt => this.setState({ policyNo: evt.target.value })}
                  value={this.state.policyNo}
                  disabled={this.state.claimNo}
                />
              </div>
            </div>
            <div className="bx--col-xs-12 bx--col-md-3">
              <div className="bx--form-item">
                <TextInput
                  id="claimnput"
                  labelText="Claim Number"
                  onChange={evt => this.setState({ claimNo: evt.target.value })}
                  value={this.state.claimNo}
                  disabled={this.state.policyNo}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="actionContainer">
          <Link to={`/newClaim/${this.state.policyNo}`}>
            <Button kind="primary" disabled={!this.state.policyNo}>
              File Claim
            </Button>
          </Link>
          <Link to={`/policy/${this.state.policyNo}`}>
            <Button kind="secondary" disabled={!this.state.policyNo}>
              Manage Policy
            </Button>
          </Link>


          <Link to={`/claim/${this.state.claimNo}`}>
            <Button kind="secondary" disabled={!this.state.claimNo}>
              Manage Claim
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
//
// Actions.propTypes = {
//   makeClaimHandler: PropTypes.func.isRequired,
//   managePolicyHandler: PropTypes.func.isRequired,
// };
