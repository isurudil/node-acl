var server = require("./server");
//var router = require("./myRouter");
var requestHandlers = require("../request_handlers/requestHandlers");
var Acl = require("node_acl");

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

//      server.start(router.route, handle);

initConnection();


function initConnection() {
    console.log("init connection");
    var mongodb = require("mongodb").MongoClient;

    mongodb.connect('mongodb://localhost:27017/acltest', function (error, db) {

        var acl = new Acl(new Acl.mongodbBackend(db, ''), null, {
            buckets: {
                meta: 'meta',
                parents: 'parents',
                permissions: 'permissions',
                resources: 'resources',
                roles: 'roles',
                users: 'users'
            }
        });
        acl.addUserRoles("id1", "admin", function (error) {
            if (!error) {
                console.log("added role");
            }
        });
        acl.addUserRoles("id2", "user", function (error) {
            if (!error) {
                console.log("added role");
            }
        });
        acl.addUserRoles("id2", "report_user", function (error) {
            if (!error) {
                console.log("added role");
            }
        });
        acl.addUserRoles("id3", "report_user", function (error) {
            if (!error) {
                console.log("added role");
            }
        });
        acl.allow("report_user", "reports", "view", function () {
            console.log("allowed");
        });
        acl.allow("1d2", "reports", "edit", function () {
            console.log("allowed");
        })
    });
};


