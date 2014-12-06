//////////////////
// Dependencies //
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
    return build[key]("ios.prod");
});

BPromise.all(buildPromises).then(function () {
    sh.run("rm -rf builds/ios/");
    sh.run("cordova create builds/ios org.bookstreams.app bookstreams");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.device");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.inappbrowser");
    sh.run("cd builds/ios && cordova plugin add org.apache.cordova.geolocation");
    sh.run("cd builds/ios && cordova plugin add com.phonegap.plugins.barcodescanner");
    sh.run("cd builds/ios && cordova platform add ios");
    sh.run("rm -rf builds/ios/www/");
    sh.run("mv builds/ios.prod builds/ios/www");
    var version = process.argv[2];
    if (semver.valid(version) === null) {
        console.log(chalk.red("ERROR: invalid version"));
        console.log("Usage: " + chalk.bold("npm run ios 1.0.0"));
        return;
    }
    var config = fs.readFileSync("builds/ios/config.xml", "utf8");
    var parser = new xml2js.Parser();
    parser.parseString(config, function (err, res) {
        if (err) {
            console.log(chalk.red("Error parsing builds/ios/config.xml"));
            console.log(err);
            return;
        }
        res.widget.$.version = version;
        res.widget.platform = {
            $: {
                name: "ios"
            }
        };
        /*
        res.widget.platform.splash = [
            {width: "320", height: "480"},
            {width: "640", height: "960"},
            {width: "768", height: "1024"},
            {width: "1536", height: "2048"},
            {width: "640", height: "1136"},
            {width: "750", height: "1334"},
            {width: "1242", height: "2208"}
        ].map(function (splash) {
            splash.src = "www/assets/app-splash/" + splash.width + "x" + splash.height + ".png";
            return {
                $: splash
            };
        });
        res.widget.platform.icon = [
            29,        40,        50,
            57,        58,        60,
            72,        76,        80,
            100,    114,    120,
            144,    152,    180
        ].map(function (size) {
            return {
                $: {
                    src: "www/assets/app-icon/" + size + "x" + size + ".png",
                    width: "" + size,
                    height: "" + size
                }
            };
        });
        */
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(res);
        fs.writeFileSync("builds/ios/config.xml", xml, "utf8");
        // Build
        sh.run("cd builds/ios && cordova build ios");
        console.log(chalk.green.bold("SUCCESS"));
    });
});
