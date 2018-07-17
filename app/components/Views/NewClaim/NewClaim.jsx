import React from 'react';
// import img from '../assets/images/react_logo_512x512.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Form, Select, SelectItem, SelectItemGroup, NumberInput,
  DatePicker, DatePickerInput, TextInput, TextArea, StructuredListCell,
  StructuredListBody, StructuredListRow,
} from 'carbon-components-react';
import Header from '../../Header/Header';
import InfoAds from '../../InfoAds/InfoAds';

export default class NewClaim extends React.Component {
  static handleDatePicker (evt) {
    console.log(evt);
  }

  constructor() {
    super();
    this.state = {
      incident: '',
      policyArea: '',
      customer: {
        id: '',
        name: '',
        gender: '',
        age: '',
        total_policy_claims: '',
      },
      vehicle: {
        id: '',
        brand: '',
        model: '',
        type: '',
        year: '',
      },
      incidentLocation: '',
      incidentDate: '',
      daysToIncident: '',
      vehicleOwner: '',
      someone: false,
      injury: false,
      material: false,
      incidentDetails: '',
      claimType: '',
      claimAmount: 0,
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
    const policyId = params.policyId;
    console.log('componentDidMount ', policyId);

    fetch(`api/policy/${policyId}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('fetched api policy', result);
          this.setState({
            policyId,
            vehicle: result.vehicle,
            policyArea: result.area,
          });
          return result.customer_id;
        },
        (error) => {
          console.log('error', error);
        },
      )
      .then(
        (customerId) => {
          fetch(`api/customer/${customerId}`)
            .then(res => res.json())
            .then(
              (result) => {
                console.log('fetched api customerId', result);
                this.setState({
                  customer: result,
                });
              },
              (error) => {
                console.log('error', error);
              },
            );
        },
      );
  }

  setClaimType() {
    if (this.state.injury && this.state.material) {
      this.state.claimType = 'Material and injury';
    } else if (this.state.injury) {
      this.state.claimType = 'Injury only';
    } else if (this.state.material) {
      this.state.claimType = 'Material only';
    } else {
      this.state.claimType = 'None';
    }
  }

  getDaysToIncident(incidentDate) {
    console.log('incidentDate ', incidentDate);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = Date.now();
    const incident = new Date(incidentDate);

    const diffDays = Math.round(Math.abs((today - incident.getTime()) / (oneDay)));
    this.setState({ daysToIncident: diffDays });
    return diffDays;
  }

  submit() {
    const incidentDate = document.getElementById('incident-date-input').value;
    this.setState({ incidentDate });
    this.setClaimType();
    const daysToIncident = this.getDaysToIncident(incidentDate);

    console.log(this.state.incident, this.state.incidentLocation, this.state.vehicleOwner,
      this.state.incidentDate, this.state.someone, this.state.injury, this.state.incidentDetails,
      this.state.claimAmount, this.state.claimType, this.state.daysToIncident, this.state.customer);

    fetch('api/claim/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: this.state.customer,
        vehicle: this.state.vehicle,
        daysToIncident,
        policyArea: this.state.policyArea,
        claimType: this.state.claimType,
        claimAmount: this.state.claimAmount,
        incident: this.state.incident,
      }),
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('created a claim', result);
        },
        (error) => {
          console.log('error', error);
        },
      );
  }

  render() {
    const title = (
      <h2 className="title"> Let’s make a car claim!</h2>
    );

    const claimHeaderInfo = (
      <div>Begin making a claim by filling out the information below. <div />
    Need help or have questions on what to fill in? <Link to="/"> Click here! </Link>
      </div>
    );

    return (
      <div>
        <div className="container intro fixed">
          <Header title={title} info={claimHeaderInfo} />
        </div>

        <div className="claim-info">
          <div className="bx--row">
            <div className="bx--col-md-12 bx--col-lg-5">
              <h2>My Claim</h2>
              <h3>Car Insurance Claim</h3>
              <Form className="claim-form">
                <Select
                  id="select-incident"
                  labelText="1. What happened to your vehicle?"
                  defaultValue="null"
                  light
                  onChange={evt => this.setState({ incident: evt.target.value })}
                >
                  <SelectItem
                    disabled
                    hidden
                    value="null"
                    text="Choose an option"
                  />
                  <SelectItemGroup label="Accident">
                    <SelectItem value="Driver error" text="My Fault" />
                    <SelectItem value="Other driver error" text="Second Driver's Fault" />
                  </SelectItemGroup>
                  <SelectItemGroup label="Disasters">
                    <SelectItem value="Natural causes" text="Fire" />
                    <SelectItem value="Natural causes" text="Flood" />
                    <SelectItem value="Other causes" text="Other" />
                  </SelectItemGroup>
                  <SelectItem value="Crime" text="Crime" />
                </Select>

                {/* document.getElementById("incident-date-input").value */}
                <DatePicker id="incident-date" datePickerType="single" onChange={this.handleDatePicker} light>
                  <DatePickerInput
                    labelText="2. When did the incident occur?"
                    locale="en"
                    placeholder="mm/dd/yyyy"
                    id="incident-date-input"
                    onChange={evt => this.handleDatePicker(evt)}
                  />
                </DatePicker>

                <TextInput
                  id="incident-location"
                  labelText="3. Where did the incident occur?"
                  onChange={evt => this.setState({ incidentLocation: evt.target.value })}
                  light
                />

                <Select
                  id="select-vehicle-owner"
                  labelText="4. Who is the owner of vehicle?"
                  defaultValue="null"
                  light
                  onChange={evt => this.setState({ vehicleOwner: evt.target.value })}
                >
                  <SelectItem
                    disabled
                    hidden
                    value="null"
                    text="Choose an option"
                  />
                  <SelectItem value="myVehicle" text="My Vehicle" />
                  <SelectItem value="rental" text="Rental" />
                  <SelectItem value="anotherOwner" text="Another Owner" />
                </Select>

                <fieldset className="bx--fieldset">
                  <legend className="bx--label">
                  5. Please select correct options
                  </legend>
                  <Checkbox
                    onChange={value => this.setState({ someone: value })}
                    id="checkbox-someone"
                    labelText="There was someone else in my vehicle during incident"
                  />
                  <Checkbox
                    onChange={value => this.setState({ injury: value })}
                    id="checkbox-injuries"
                    labelText="There were injuries"
                  />
                  <Checkbox
                    onChange={value => this.setState({ material: value })}
                    id="checkbox-material"
                    labelText="There were material damages"
                  />
                </fieldset>

                <TextArea
                  labelText="6. Would you provide details of what happened?"
                  onChange={evt => this.setState({ incidentDetails: evt.target.value })}
                  id="incident-details"
                  rows="1"
                  light
                />

                <NumberInput
                  id="claimAmount-input"
                  label="7. Claim Amount"
                  onChange={evt => this.setState({ claimAmount:  evt.target.value })}
                  min={0}
                  max={1000000}
                  value={0}
                  step={1000}
                  invalidText="Amount is not valid"
                  light
                />
              </Form>
            </div>

            <div className="bx--col-md-12 bx--col-lg-4">
              <h2>My {this.state.policyArea} Policy</h2>
              <h3>Policy Id # {this.state.policyId}</h3>
              <div className="claim-policy-info">
                <StructuredListBody>
                  <StructuredListRow>
                    <StructuredListCell noWrap>
                      Brand
                    </StructuredListCell>
                    <StructuredListCell>
                      {this.state.vehicle.brand}
                    </StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell noWrap>
                      Model
                    </StructuredListCell>
                    <StructuredListCell>
                      {this.state.vehicle.model}
                    </StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell noWrap>
                      Year
                    </StructuredListCell>
                    <StructuredListCell>
                      {this.state.vehicle.year}
                    </StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
              </div>
            </div>

            <div className="bx--col-lg-12">
              <Button kind="primary" onClick={this.submit}>
                Submit
              </Button>
            </div>
          </div>

          <div className="claim-files">
            <h2>Upload documents here!</h2>
            <h3>
              Attach photos and documents that
              are pertinent to your claim.
            </h3>
            <div id="status" />
            <div id="drop-area">
              <form className="my-form">
                <p>Drag & drop images or search
                  for files on your computer.
                </p>
                <input type="file" id="fileElem" multiple accept="image/*,application/pdf" onChange="controller.uploadHandler(this.files)" />
                <label className="bx--btn bx--btn--ghost" htmlFor="fileElem">Select some files</label>
              </form>
            </div>
            <div id="list" />
          </div>
        </div>
        <InfoAds servicesAds={false} />
      </div>
    );
  }
}

NewClaim.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      policyId: PropTypes.string.isRequired,
    }),
  }),
};