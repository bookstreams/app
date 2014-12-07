var BPromise = require("bluebird");
var chalk    = require("chalk");
var sh       = require("execSync");
var fs       = require("fs");
var _        = require("lodash");

var build = require("./build.js");

var buildPromises = _.keys(build).map(function (key) {
    return build[key]("android.dev");
});

BPromise.all(buildPromises).then(function () {
    sh.run("rm -rf builds/android/");
    sh.run("cordova create builds/android org.bookstreams.app.dev bookstreams");
    sh.run("cd builds/android && cordova platform add android");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.device");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.inappbrowser");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.geolocation");
    sh.run("cd builds/android && cordova plugin add com.phonegap.plugins.barcodescanner");
    sh.run("rm -rf builds/android/www/");
    sh.run("mv builds/android.dev builds/android/www");
    sh.run("cd builds/android && cordova build android");
    console.log(chalk.green.bold("SUCCESS"));
});
