var BPromise = require("bluebird");
var chalk    = require("chalk");
var sh       = require("execSync");
var fs       = require("fs");
var _        = require("lodash");

var build = require("./build.js");

var buildPromises = _.keys(build).map(function (key) {
    return build[key]("ios.dev");
});

BPromise.all(buildPromises).then(function () {
    sh.run("rm -rf builds/ios/");
    sh.run("cordova create builds/ios org.bookstreams.app.dev bookstreams");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.device");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.inappbrowser");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.geolocation");
    sh.run("cd builds/ios && cordova plugin add com.phonegap.plugins.barcodescanner");
    sh.run("cd builds/ios && cordova platform add ios");
    sh.run("rm -rf builds/ios/www/");
    sh.run("mv builds/ios.dev builds/ios/www");
    sh.run("cd builds/ios && cordova build ios");
    console.log(chalk.green.bold("SUCCESS"));
});
