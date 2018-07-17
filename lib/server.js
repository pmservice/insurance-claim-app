import { config } from "../config/config";
const path = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request-promise-native');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? config.port.http : process.env.PORT;
// const loc = isDeveloping?
const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./dist'));

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`, Date.now());
  next(); // make sure we go to the next routes and don't stop here
});

// get policy info
router.route('/policy/:id')
  .get((req, res) => {
    const contents = fs.readFileSync('data/policies.json');
    const policies = JSON.parse(contents);
    const policyId = req.params.id;

    console.log('Policy:', policies[policyId]);
    if (policies[policyId]) {
      res.status(200);
      res.json(policies[policyId]);
    } else {
      res.status(404);
      res.json({ error: 'No policy found' });
    }
  });

// get customer info
router.route('/customer/:id')
  .get((req, res) => {
    const contents = fs.readFileSync('data/customers.json');
    const customers = JSON.parse(contents);
    const customerId = req.params.id;
    const customer = customers[customerId];
    delete customer.password;
    console.log('Customer:', customer);

    if (customer) {
      res.status(200);
      res.json(customer);
    } else {
      res.status(404);
      res.json({ error: 'No customer found' });
    }
  });

// get claim info
router.route('/claim/:id')
  .get((req, res) => {
    const claimId = req.params.id;
    request
      .get({
        url: `${config.urls.apiUrl}/${config.urls.caseManagerPath}/case/${claimId}?TargetObjectStore=ICMTOS`,
      })
      .then((response) => {
        console.log(response);
        res.status(200);
        res.json({ response });
      })
      .catch((err) => {
        console.log(err.message);
        err.statusCode ? res.status(err.statusCode) : res.status(400);
        res.json({ err });
      });
  });

// create new claim
router.route('/claim/new')
  .post((req, res) => {
    const newCase = createCase(req.body);
    console.log('claim newCase', newCase);
    // console.log('JSON.parse(newCase) ', JSON.parse(newCase));
    console.log('JSON.stringify(newCase) ', JSON.stringify(newCase));

    request
      .post({
        url: `${config.urls.apiUrl}/${config.urls.caseManagerPath}/cases`,
        headers: {
          'content-type': 'application/json',
        },
        json: newCase,
      })
      .then((response) => {
        console.log(response);
        res.status(201);
        res.json({ response });
      })
      .catch((err) => {
        console.log(err.message);
        err.statusCode ? res.status(err.statusCode) : res.status(400);
        res.json({ err });
      });
  });

app.use('/api', router);

app.get('/newClaim/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

console.log(`Magic happens on port ${port}`);

app.listen(port);

function createCase(data) {
  const newCase = {
    TargetObjectStore: "ICMTOS",
    CaseType: "ACS_GeneralClaim",
    Properties: [{
      SymbolicName: "ACS_PolicyHolderID",
      Value: data.customer.id,
    },
    {
      SymbolicName: "ACS_PolicyHolderName",
      Value: data.customer.name,
    },
    {
      SymbolicName: "ACS_PolicyHolderGender",
      Value: data.customer.gender,
    },
    {
      SymbolicName: "ACS_PolicyHolderAge",
      Value: data.customer.age,
    },
    {
      SymbolicName: "ACS_VehicleMake",
      Value: data.vehicle.id,
    },
    {
      SymbolicName: "ACS_DaysToIncident",
      Value: data.daysToIncident.toString(),
    },
    {
      SymbolicName: "ACS_PastNumberOfClaims",
      Value: data.customer.total_policy_claims,
    },
    {
      SymbolicName: "ACS_ClaimArea",
      Value: data.policyArea,
    },
    {
      SymbolicName: "ACS_ClaimType",
      Value: data.claimType,
    },
    {
      SymbolicName: "ACS_ClaimAmount",
      Value: data.claimAmount,
    },
    {
      SymbolicName: "ACS_IncidentCause",
      Value: data.incident,
    },
    {
      SymbolicName: "ACS_PoliceReportFiled",
      Value: "No",
    }],
  };
  return newCase;
}

