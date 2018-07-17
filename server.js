!function(e) {
    function o(r) {
        if (t[r]) return t[r].exports;
        var s = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(s.exports, s, s.exports, o), s.l = !0, s.exports;
    }
    var t = {};
    o.m = e, o.c = t, o.d = function(e, t, r) {
        o.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o);
    }, o.p = "", o(o.s = 2);
}([ function(e, o) {
    e.exports = require("react-hot-loader");
}, function(e, o) {
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
}, function(e, o, t) {
    e.exports = t(3);
}, function(e, o, t) {
    "use strict";
    (function(e, o) {
        function r(e) {
            return {
                TargetObjectStore: "ICMTOS",
                CaseType: "ACS_GeneralClaim",
                Properties: [ {
                    SymbolicName: "ACS_PolicyHolderID",
                    Value: e.customer.id
                }, {
                    SymbolicName: "ACS_PolicyHolderName",
                    Value: e.customer.name
                }, {
                    SymbolicName: "ACS_PolicyHolderGender",
                    Value: e.customer.gender
                }, {
                    SymbolicName: "ACS_PolicyHolderAge",
                    Value: e.customer.age
                }, {
                    SymbolicName: "ACS_VehicleMake",
                    Value: e.vehicle.id
                }, {
                    SymbolicName: "ACS_DaysToIncident",
                    Value: e.daysToIncident.toString()
                }, {
                    SymbolicName: "ACS_PastNumberOfClaims",
                    Value: e.customer.total_policy_claims
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
        var s = t(4);
        !function() {
            var o = t(0).enterModule;
            o && o(e);
        }();
        var n = t(5), a = t(6), i = t(7), c = t(8), l = t(9), u = a(), p = a.Router();
        u.use(c.urlencoded({
            extended: !0
        })), u.use(c.json()), u.use(a.static("./dist")), p.get("/", function(e, o) {
            o.json({
                message: "hooray! welcome to our api!"
            });
        }), p.use(function(e, o, t) {
            console.log("Incoming " + e.method + " request to " + e.originalUrl, Date.now()), 
            t();
        }), p.route("/policy/:id").get(function(e, o) {
            var t = i.readFileSync("data/policies.json"), r = JSON.parse(t), s = e.params.id;
            console.log("Policy:", r[s]), r[s] ? (o.status(200), o.json(r[s])) : (o.status(404), 
            o.json({
                error: "No policy found"
            }));
        }), p.route("/customer/:id").get(function(e, o) {
            var t = i.readFileSync("data/customers.json"), r = JSON.parse(t), s = e.params.id, n = r[s];
            delete n.password, console.log("Customer:", n), n ? (o.status(200), o.json(n)) : (o.status(404), 
            o.json({
                error: "No customer found"
            }));
        }), p.route("/claim/:id").get(function(e, o) {
            var t = e.params.id;
            l.get({
                url: s.config.urls.apiUrl + "/" + s.config.urls.caseManagerPath + "/case/" + t + "?TargetObjectStore=ICMTOS"
            }).then(function(e) {
                console.log(e), o.status(200), o.json({
                    response: e
                });
            }).catch(function(e) {
                console.log(e.message), e.statusCode ? o.status(e.statusCode) : o.status(400), o.json({
                    err: e
                });
            });
        }), p.route("/claim/new").post(function(e, o) {
            var t = r(e.body);
            console.log("claim newCase", t), console.log("JSON.stringify(newCase) ", JSON.stringify(t)), 
            l.post({
                url: s.config.urls.apiUrl + "/" + s.config.urls.caseManagerPath + "/cases",
                headers: {
                    "content-type": "application/json"
                },
                json: t
            }).then(function(e) {
                console.log(e), o.status(201), o.json({
                    response: e
                });
            }).catch(function(e) {
                console.log(e.message), e.statusCode ? o.status(e.statusCode) : o.status(400), o.json({
                    err: e
                });
            });
        }), u.use("/api", p), u.get("/newClaim/*", function(e, t) {
            t.sendFile(n.join(o, "../dist/index.html"));
        }), u.get("/", function(e, t) {
            t.sendFile(n.join(o, "dist/index.html"));
        }), console.log("Magic happens on port 8080"), u.listen(8080), function() {
            var o = t(0).default, s = t(0).leaveModule;
            o && (o.register(!1, "isDeveloping", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            o.register(8080, "port", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            o.register(u, "app", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            o.register(p, "router", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            o.register(r, "createCase", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/lib/server.js"), 
            s(e));
        }();
    }).call(o, t(1)(e), "/");
}, function(e, o, t) {
    "use strict";
    (function(e) {
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), function() {
            var o = t(0).enterModule;
            o && o(e);
        }();
        var r = o.config = {
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
            var o = t(0).default, s = t(0).leaveModule;
            o && (o.register(r, "config", "/Users/eren/Desktop/Projects/IBM/WML/samples/insurance-claim-app/config/config.js"), 
            s(e));
        }();
    }).call(o, t(1)(e));
}, function(e, o) {
    e.exports = require("path");
}, function(e, o) {
    e.exports = require("express");
}, function(e, o) {
    e.exports = require("fs");
}, function(e, o) {
    e.exports = require("body-parser");
}, function(e, o) {
    e.exports = require("request-promise-native");
} ]);