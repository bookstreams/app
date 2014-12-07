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
    sh.run("cordova create builds/android org.bookstreams.app bookstreams");
    sh.run("cd builds/android && cordova platform add android");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.device");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.inappbrowser");
    sh.run("cd builds/android && cordova plugin add org.apache.cordova.geolocation");
    sh.run("cd builds/android && cordova plugin add com.phonegap.plugins.barcodescanner");
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
        res.widget.platform = {$: {
            name: "android"
        }};
        res.widget.platform.icon = [
            [48, "mdpi"],
            [72, "hdpi"],
            [96, "xhdpi"],
            [144, "xxhdpi"],
            [192, "xxxhdpi"]
        ].map(function (size) {
            return {$: {
                src: "www/assets/app-icon/android-" + size[0] + "x" + size[0] + ".png",
                density: size[1]
            }};
        });
        res.widget.platform.splash = [
            [320, 480, "mdpi"],
            [480, 720, "hdpi"],
            [640, 960, "xhdpi"],
            [960, 1440, "xxhdpi"],
            [1280, 1920, "xxxhdpi"]
        ].map(function (size) {
            return {$: {
                src: "www/assets/app-splash/android-" + size[0] + "x" + size[1] + ".png",
                density: "port-" + size[2]
            }};
        });
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(res);
        fs.writeFileSync("builds/android/config.xml", xml, "utf8");
        // Build
        sh.run("cd builds/android && cordova build --release android");
        // Release
        sh.run("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore -storepass:file keystore-password builds/android/platforms/android/ant-build/CordovaApp-release-unsigned.apk alias_name");
        sh.run("rm builds/bookstreams-release.apk");
        sh.run("zipalign -v 4 builds/android/platforms/android/ant-build/CordovaApp-release-unsigned.apk builds/bookstreams-release.apk");
        console.log(chalk.green.bold("SUCCESS"));
    });

});
