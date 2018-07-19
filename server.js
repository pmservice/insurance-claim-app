!function(e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var s = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(s.exports, s, s.exports, t), s.l = !0, s.exports;
    }
    var o = {};
    t.m = e, t.c = o, t.d = function(e, o, n) {
        t.o(e, o) || Object.defineProperty(e, o, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(o, "a", o), o;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 2);
}([ function(e, t) {
    e.exports = require("react-hot-loader");
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), 
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l;
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i;
            }
        }), e.webpackPolyfill = 1), e;
    };
}, function(e, t, o) {
    e.exports = o(3);
}, function(e, t, o) {
    "use strict";
    (function(e, t) {
        function n(e) {
            return {
                TargetObjectStore: "ICMTOS",
                CaseType: "ACS_GeneralClaim",
                Properties: [ {
                    SymbolicName: "ACS_PolicyHolderID",
                    Value: e.customer ? e.customer.id : null
                }, {
                    SymbolicName: "ACS_PolicyHolderName",
                    Value: e.customer ? e.customer.name : null
                }, {
                    SymbolicName: "ACS_PolicyHolderGender",
                    Value: e.customer ? e.customer.gender : null
                }, {
                    SymbolicName: "ACS_PolicyHolderAge",
                    Value: e.customer ? e.customer.age : null
                }, {
                    SymbolicName: "ACS_VehicleMake",
                    Value: e.vehicle ? e.vehicle.id : ""
                }, {
                    SymbolicName: "ACS_DaysToIncident",
                    Value: e.daysToIncident ? e.daysToIncident.toString() : null
                }, {
                    SymbolicName: "ACS_PastNumberOfClaims",
                    Value: e.customer ? e.customer.total_policy_claims : null
                }, {
                    SymbolicName: "ACS_ClaimArea",
                    Value: e.policyArea
                }, {
                    SymbolicName: "ACS_ClaimType",
                    Value: e.claimType
                }, {
                    SymbolicName: "ACS_ClaimAmount",
                    Value: e.claimAmount
                }, {
                    SymbolicName: "ACS_IncidentCause",
                    Value: e.incident
                }, {
                    SymbolicName: "ACS_PoliceReportFiled",
                    Value: "No"
                } ]
            };
        }
        function s(e, t, o) {
            return '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<atom:entry xmlns:atom="http://www.w3.org/2005/Atom" xmlns:cmis="http://docs.oasis-open.org/ns/cmis/core/200908/"\n            xmlns:cmisra="http://docs.oasis-open.org/ns/cmis/restatom/200908/" xmlns:app="http://www.w3.org/2007/app">\n\n  <atom:title>' + e + "</atom:title>\n  <atom:content type='" + t + "'> \n  " + o + '\n  </atom:content>\n  <cmisra:object>\n    <cmis:properties>\n      <cmis:propertyId propertyDefinitionId="cmis:objectTypeId" localName="" displayName="cmis:objectTypeId" queryName="cmis:objectTypeId">\n        <cmis:value>ACS_VehicleImage</cmis:value>\n      </cmis:propertyId>\n      <cmis:propertyString propertyDefinitionId="cmis:contentStreamFileName" localName="' + e + '" displayName="cmis:contentStreamFileName" queryName="cmis:contentStreamFileName">\n        <cmis:value> ' + e + ' </cmis:value>\n      </cmis:propertyString>\n      <cmis:propertyString propertyDefinitionId="cmis:name" localName="Name" displayName="Name" queryName="cmis:name">\n        <cmis:value> ' + e + ' </cmis:value>\n      </cmis:propertyString>\n      <cmis:propertyString propertyDefinitionId="DocumentTitle" displayName="Document Title" localName="DocumentTitle" queryName="DocumentTitle">\n        <cmis:value> ' + e + " </cmis:value>\n      </cmis:propertyString>\n    </cmis:properties>\n  </cmisra:object>\n</atom:entry>\n";
        }
        var r = o(4);
        !function() {
            var t = o(0).enterModule;
            t && t(e);
        }();
        var i = o(5), a = o(6), c = o(7), l = o(8), u = o(9), m = a(), p = a.Router();
        m.use(l.json({
            limit: "50mb"
        })), m.use(l.urlencoded({
            limit: "50mb",
            extended: !0
        })), m.use(a.static("./dist")), p.get("/", function(e, t) {
            t.json({
                message: "hooray! welcome to our api!"
            });
        }), p.use(function(e, t, o) {
            console.log("Incoming " + e.method + " request to " + e.originalUrl, Date.now()), 
            o();
        }), p.route("/policy/:id").get(function(e, t) {
            var o = c.readFileSync("data/policies.json"), n = JSON.parse(o), s = e.params.id;
            console.log("Policy:", n[s]), n[s] ? (t.status(200), t.json(n[s])) : (t.status(404), 
            t.json({
                error: "No policy found"
            }));
        }), p.route("/customer/:id").get(function(e, t) {
            var o = c.readFileSync("data/customers.json"), n = JSON.parse(o), s = e.params.id, r = n[s];
            delete r.password, console.log("Customer:", r), r ? (t.status(200), t.json(r)) : (t.status(404), 
            t.json({
                error: "No customer found"
            }));
        }), p.route("/claim/:id").get(function(e, t) {
            var o = e.params.id;
            u.get({
                url: r.config.urls.apiUrl + "/" + r.config.urls.caseManagerPath + "/case/" + o + "?TargetObjectStore=ICMTOS"
            }).then(function(e) {
                console.log(e), t.status(200), t.json({
                    response: e
                });
            }).catch(function(e) {
                console.log(e.message), e.statusCode ? t.status(e.statusCode) : t.status(400), t.json({
                    err: e
                });
            });
        }), p.route("/claim/new").post(function(e, t) {
            var o = n(e.body);
            console.log("claim newCase", o), console.log("JSON.stringify(newCase) ", JSON.stringify(o)), 
            u.post({
                url: r.config.urls.apiUrl + "/" + r.config.urls.caseManagerPath + "/cases",
                headers: {
                    "content-type": "application/json"
                },
                json: o
            }).then(function(e) {
                console.log(e), t.status(201), t.json({
                    response: e
                });
            }).catch(function(e) {
                console.log(e.message), e.statusCode ? t.status(e.statusCode) : t.status(400), t.json({
                    err: e
                });
            });
        }), p.route("/claim/:claimId/upload").post(function(e, t) {
            console.log("/claim/" + e.params.claimId + "/upload");
            var o = s(e.body.name, e.body.type, e.body.data);
            u.post({
                url: r.config.urls.apiUrl + "/CaseManager/resources/icmtos/ContentFlat/idf_" + e.params.claimId,
                headers: {
                    "content-type": "application/cmisatom+xml"
                },
                body: o
            }).then(function(e) {
                console.log(e), t.status(201), t.json({
                    response: e
                });
            }).catch(function(e) {
                console.log(e), e.statusCode ? t.status(e.statusCode) : t.status(400), t.json({
                    err: e
                });
            });
        }), m.use("/api", p), m.get("/newClaim/*", function(e, o) {
            o.sendFile(i.join(t, "../dist/index.html"));
        }), m.get("/", function(e, o) {
            o.sendFile(i.join(t, "dist/index.html"));
        }), console.log("Magic happens on port 8080"), m.listen(8080), function() {
            var t = o(0).default, r = o(0).leaveModule;
            t && (t.register(!1, "isDeveloping", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            t.register(8080, "port", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            t.register(m, "app", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            t.register(p, "router", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            t.register(n, "createCase", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            t.register(s, "createFileXml", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            r(e));
        }();
    }).call(t, o(1)(e), "/");
}, function(e, t, o) {
    "use strict";
    (function(e) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), function() {
            var t = o(0).enterModule;
            t && t(e);
        }();
        var n = t.config = {
            port: {
                http: "3000",
                https: "8080"
            },
            urls: {
                apiUrl: "http://p8admin:filenet@wolfe1.fyre.ibm.com:9081",
                caseManagerPath: "CaseManager/CASEREST/v1"
            }
        };
        !function() {
            var t = o(0).default, s = o(0).leaveModule;
            t && (t.register(n, "config", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/config/config.js"), 
            s(e));
        }();
    }).call(t, o(1)(e));
}, function(e, t) {
    e.exports = require("path");
}, function(e, t) {
    e.exports = require("express");
}, function(e, t) {
    e.exports = require("fs");
}, function(e, t) {
    e.exports = require("body-parser");
}, function(e, t) {
    e.exports = require("request-promise-native");
} ]);