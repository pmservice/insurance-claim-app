/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, __dirname) {

var _config = __webpack_require__(4);

(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var path = __webpack_require__(5);
var express = __webpack_require__(6);
var fs = __webpack_require__(7);
var bodyParser = __webpack_require__(8);
var request = __webpack_require__(9);

var isDeveloping = "development" !== 'production';
var port = isDeveloping ? _config.config.port.http : 3000;
// const loc = isDeveloping?
var app = express();
var router = express.Router();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('dist'));

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.use(function (req, res, next) {
  console.log('Incoming ' + req.method + ' request to ' + req.originalUrl, Date.now());
  next(); // make sure we go to the next routes and don't stop here
});

// get policy info
router.route('/policy/:id').get(function (req, res) {
  var contents = fs.readFileSync('data/policies.json');
  var policies = JSON.parse(contents);
  var policyId = req.params.id;

  if (policies[policyId]) {
    res.status(200);
    res.json(policies[policyId]);
  } else {
    res.status(404);
    res.json({ error: 'No policy found' });
  }
});

// get customer info
router.route('/customer/:id').get(function (req, res) {
  var contents = fs.readFileSync('data/customers.json');
  var customers = JSON.parse(contents);
  var customerId = req.params.id;
  var customer = customers[customerId];
  delete customer.password;

  if (customer) {
    res.status(200);
    res.json(customer);
  } else {
    res.status(404);
    res.json({ error: 'No customer found' });
  }
});

// get claim info
router.route('/claim/:id').get(function (req, res) {
  var claimId = req.params.id;
  request.get({
    url: _config.config.urls.apiUrl + '/' + _config.config.urls.caseManagerPath + '/case/' + claimId + '?TargetObjectStore=ICMTOS'
  }).then(function (response) {
    var result = JSON.parse(response);
    res.status(200);
    var propsList = ['DateCreated', 'ACS_ClaimStatus', 'ACS_ClaimAmount', 'ACS_ApprovedAmount', 'ACS_IncidentCause', 'ACS_PolicyHolderID', 'ACS_ApprovedAmount', 'ACS_ClaimArea'];
    var claimProps = [];
    for (var i = 0; i < result.Properties.length; i += 1) {
      var propName = result.Properties[i].SymbolicName;
      if (propsList.includes(propName)) {
        claimProps.push({
          id: propName,
          name: result.Properties[i].DisplayName,
          value: result.Properties[i].Value
        });
      }
    }
    res.json({ properties: claimProps });
  }).catch(function (err) {
    console.log(err.message);
    err.statusCode ? res.status(err.statusCode) : res.status(400);
    res.json({ err: err });
  });
});

// create new claim
router.route('/claim/new').post(function (req, res) {
  var newCase = createCase(req.body);
  console.log('claim newCase', newCase);

  request.post({
    url: _config.config.urls.apiUrl + '/' + _config.config.urls.caseManagerPath + '/cases',
    headers: {
      'content-type': 'application/json'
    },
    json: newCase
  }).then(function (response) {
    res.status(201);
    res.json({ response: response });
  }).catch(function (err) {
    console.log(err.message);
    err.statusCode ? res.status(err.statusCode) : res.status(400);
    res.json({ err: err });
  });
});

// upload data to claim
router.route('/claim/:claimId/upload').post(function (req, res) {
  var xmlData = createFileXml(req.body.name, req.body.type, req.body.data);
  request.post({
    url: _config.config.urls.apiUrl + '/CaseManager/resources/icmtos/ContentFlat/idf_' + req.params.claimId,
    headers: {
      'content-type': 'application/cmisatom+xml'
    },
    body: xmlData
  }).then(function (response) {
    res.status(201);
    res.json({ response: response });
  }).catch(function (err) {
    console.log(err);
    err.statusCode ? res.status(err.statusCode) : res.status(400);
    res.json({ err: err });
  });
});

app.use('/api', router);

app.get('/newClaim/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/policy/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

console.log('Magic happens on port ' + port);

app.listen(port);

function createCase(data) {
  var newCase = {
    TargetObjectStore: 'ICMTOS',
    CaseType: 'ACS_GeneralClaim',
    Properties: [{
      SymbolicName: 'ACS_PolicyHolderID',
      Value: data.customer ? data.customer.id : null
    }, {
      SymbolicName: 'ACS_PolicyHolderName',
      Value: data.customer ? data.customer.name : null
    }, {
      SymbolicName: 'ACS_PolicyHolderGender',
      Value: data.customer ? data.customer.gender : null
    }, {
      SymbolicName: 'ACS_PolicyHolderAge',
      Value: data.customer ? data.customer.age : null
    }, {
      SymbolicName: 'ACS_VehicleMake',
      Value: data.vehicle ? data.vehicle.id : ''
    }, {
      SymbolicName: 'ACS_DaysToIncident',
      Value: data.daysToIncident ? data.daysToIncident.toString() : null
    }, {
      SymbolicName: 'ACS_PastNumberOfClaims',
      Value: data.customer ? data.customer.total_policy_claims : null
    }, {
      SymbolicName: 'ACS_ClaimArea',
      Value: data.policyArea
    }, {
      SymbolicName: 'ACS_ClaimType',
      Value: data.claimType
    }, {
      SymbolicName: 'ACS_ClaimAmount',
      Value: data.claimAmount
    }, {
      SymbolicName: 'ACS_IncidentCause',
      Value: data.incident
    }, {
      SymbolicName: 'ACS_PoliceReportFiled',
      Value: 'No'
    }]
  };
  return newCase;
}

function createFileXml(name, type, data) {
  return '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<atom:entry xmlns:atom="http://www.w3.org/2005/Atom" xmlns:cmis="http://docs.oasis-open.org/ns/cmis/core/200908/"\n            xmlns:cmisra="http://docs.oasis-open.org/ns/cmis/restatom/200908/" xmlns:app="http://www.w3.org/2007/app">\n\n  <atom:title>' + name + '</atom:title>\n  <atom:content type=\'' + type + '\'> \n  ' + data + '\n  </atom:content>\n  <cmisra:object>\n    <cmis:properties>\n      <cmis:propertyId propertyDefinitionId="cmis:objectTypeId" localName="" displayName="cmis:objectTypeId" queryName="cmis:objectTypeId">\n        <cmis:value>ACS_VehicleImage</cmis:value>\n      </cmis:propertyId>\n      <cmis:propertyString propertyDefinitionId="cmis:contentStreamFileName" localName="' + name + '" displayName="cmis:contentStreamFileName" queryName="cmis:contentStreamFileName">\n        <cmis:value> ' + name + ' </cmis:value>\n      </cmis:propertyString>\n      <cmis:propertyString propertyDefinitionId="cmis:name" localName="Name" displayName="Name" queryName="cmis:name">\n        <cmis:value> ' + name + ' </cmis:value>\n      </cmis:propertyString>\n      <cmis:propertyString propertyDefinitionId="DocumentTitle" displayName="Document Title" localName="DocumentTitle" queryName="DocumentTitle">\n        <cmis:value> ' + name + ' </cmis:value>\n      </cmis:propertyString>\n    </cmis:properties>\n  </cmisra:object>\n</atom:entry>\n';
}
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isDeveloping, 'isDeveloping', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  reactHotLoader.register(port, 'port', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  reactHotLoader.register(app, 'app', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  reactHotLoader.register(router, 'router', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  reactHotLoader.register(createCase, 'createCase', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  reactHotLoader.register(createFileXml, 'createFileXml', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), "/"))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var config = exports.config = {
  port: {
    http: '3000',
    https: '8080'
  },
  urls: {
    apiUrl: 'http://p8admin:filenet@wolfe1.fyre.ibm.com:9081',
    caseManagerPath: 'CaseManager/CASEREST/v1'
  }
};
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(config, 'config', '/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/config/config.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ })
/******/ ]);