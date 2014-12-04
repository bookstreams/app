//////////////////
// Deoendencies //
//////////////////

var BPromise = require("bluebird");
var chalk    = require("chalk");
var sh       = require("execSync");
var fs       = require("fs");
var _        = require("lodash");
var semver   = require("semver");
var xml2js   = require("xml2js");



//////////////////////////////
// Rebuilding and reloading //
//////////////////////////////

var build = require("./build.js");

var buildPromises = _.keys(build).map(function (key) {
	return build[key]("android.prod");
});

BPromise.all(buildPromises).then(function () {
	sh.run("rm -rf builds/android/");
	sh.run("cordova create builds/android it.manoxmano.disportinsport disportinsport");
	sh.run("cd builds/android && cordova platform add android");
	sh.run("cd builds/android && cordova plugin add org.apache.cordova.device");
	sh.run("cd builds/android && cordova plugin add org.apache.cordova.file");
	sh.run("cd builds/android && cordova plugin add org.apache.cordova.media");
	sh.run("cd builds/android && cordova plugin add org.apache.cordova.inappbrowser");
	// BEGIN - Facebook plugin install steps
	sh.run("cd builds/android && cordova -d plugin add ../../../phonegap-facebook-plugin/ --variable APP_ID=\"1547637065469542\" --variable APP_NAME=\"manoxmano\"");
	sh.run("cd builds/android && android update project --subprojects --path \"platforms/android\" --target android-19 --library \"CordovaLib\"");
	sh.run("cd builds/android && android update project --subprojects --path \"platforms/android\" --target android-19 --library \"com.phonegap.plugins.facebookconnect/FacebookLib\"");
	sh.run("cd builds/android/platforms/android && ant clean");
	sh.run("cd builds/android/platforms/android/com.phonegap.plugins.facebookconnect/FacebookLib && ant clean");
	sh.run("cd builds/android/platforms/android/com.phonegap.plugins.facebookconnect/FacebookLib && ant release");
	// END - Facebook plugin install steps
	sh.run("rm -rf builds/android/www/");
	sh.run("mv builds/android.prod builds/android/www");
	sh.run("cd builds/android && cordova build android");

});
