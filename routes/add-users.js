var express = require('express');
var router = express.Router();
var app = express();
var Acl = require("node_acl");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', function (req, res, next) {
    console.log('add users called');
    var username=req.body.username;
    var role=req.body.role;

    addRolesToDb(username, role);

    res.send('User : ' + username + ' added with role : ' + role );
});

function addRolesToDb(username, role) {
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
        acl.addUserRoles(username,role, function (error) {
            if (!error) {
                console.log("added role");
            }
        });

        acl.allow("user1", "reports", "view", function () {
            console.log("allowed");
        })
    });
};

module.exports = router;
