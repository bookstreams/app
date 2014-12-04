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
	// Write configurations
	var version = process.argv[2];
	if (semver.valid(version) === null) {
		console.log(chalk.red("ERROR: invalid version"));
		console.log("Usage: " + chalk.bold("npm run android 1.0.0"));
		return;
	}
	var config = fs.readFileSync("builds/android/config.xml", "utf8");
	var parser = new xml2js.Parser();
	parser.parseString(config, function (err, res) {
		if (err) {
			console.log(chalk.red("Error parsing builds/android/config.xml"));
			console.log(err);
			return;
		}
		res.widget.$.version = version;
		res.widget.platform = [{
			$: {
				name: "android"
			},
			icon: [{
				$: {
					src: "www/assets/app-icon/96x96.png",
					density: "xhdpi"
				}
			}],
			splash: [{
				$: {
					src: "www/assets/app-splash/640x960.png",
					density: "port-xhdpi"
				}
			}]
		}];
		sh.run("cd builds/android && mv www/assets/icon.png platforms/android/res/");
		var builder = new xml2js.Builder();
		var xml = builder.buildObject(res);
		fs.writeFileSync("builds/android/config.xml", xml, "utf8");
		// Build
		sh.run("cd builds/android && cordova build --release android");
		// Release
		sh.run("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore -storepass:file keystore-password builds/android/platforms/android/out/disportinsport-release-unsigned.apk alias_name");
		sh.run("rm builds/disportinsport-release.apk");
		sh.run("zipalign -v 4 builds/android/platforms/android/out/disportinsport-release-unsigned.apk builds/disportinsport-release.apk");
		console.log(chalk.green.bold("SUCCESS"));
	});

});
