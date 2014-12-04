//////////////////
// Dependencies //
//////////////////

var BPromise   = require("bluebird");
var browserify = require("browserify");
var sh         = require("execSync");
var fs         = require("fs");
var gulp       = require("gulp");
var gp         = require("gulp-load-plugins")();
var _          = require("lodash");
var reactify   = require("reactify");
var source     = require("vinyl-source-stream");



//////////////////////////////////
// App files building functions //
//////////////////////////////////

var buildAppIndex = function (target) {
	sh.run("mkdir -p builds/" + target + "/");
	return new BPromise(function (resolve, reject) {
		gulp.src("app/main.html")
			.pipe(gp.plumber(reject))
			.pipe(gp.rename("index.html"))
			.pipe(gulp.dest("builds/" + target + "/"))
			.on("end", resolve);
	});
};

var buildAppScripts = function (target) {
	sh.run("mkdir -p builds/" + target + "/assets/");
	return new BPromise(function (resolve, reject) {
		browserify("./app/main.jsx")
			.transform(reactify)
			.bundle()
			.on("error", reject)
			.pipe(source("bundle.js"))
			.pipe(gp.plumber(reject))
			.pipe(gp.rename("app.js"))
			.pipe(gulp.dest("builds/" + target + "/assets/"))
			.on("end", resolve);
	});
};

var buildAppStyles = function (target) {
	sh.run("mkdir -p builds/" + target + "/assets/");
	return new BPromise(function (resolve, reject) {
		gulp.src("app/main.scss")
			.pipe(gp.plumber(reject))
			.pipe(gp.sass())
			.pipe(gp.autoprefixer("last 3 version"))
			.pipe(gp.rename("app.css"))
			.pipe(gulp.dest("builds/" + target + "/assets/"))
			.on("end", resolve);
	});
};

var buildAppAssets = function (target) {
	return new BPromise(function (resolve, reject) {
		sh.run("rm -r builds/" + target + "/assets/app-icon");
		sh.run("rm -r builds/" + target + "/assets/app-splash");
		sh.run("rm -r builds/" + target + "/assets/audios");
		sh.run("rm -r builds/" + target + "/assets/fonts");
		sh.run("rm -r builds/" + target + "/assets/images");
		sh.run("rm -r builds/" + target + "/assets/scripts");
		sh.run("rm -r builds/" + target + "/assets/styles");
		sh.run("rm -r builds/" + target + "/assets/texts");
		sh.run("cp -r assets/app-icon builds/" + target + "/assets/app-icon");
		sh.run("cp -r assets/app-splash builds/" + target + "/assets/app-splash");
		sh.run("cp -r assets/audios builds/" + target + "/assets/audios");
		sh.run("cp -r assets/fonts builds/" + target + "/assets/fonts");
		sh.run("cp -r assets/images builds/" + target + "/assets/images");
		sh.run("cp -r assets/scripts builds/" + target + "/assets/scripts");
		sh.run("cp -r assets/styles builds/" + target + "/assets/styles");
		sh.run("cp -r assets/texts builds/" + target + "/assets/texts");
		resolve();
	});
};



////////////
// Export //
////////////

module.exports = {
	appIndex:   buildAppIndex,
	appScripts: buildAppScripts,
	appStyles:  buildAppStyles,
	appAssets:  buildAppAssets
};
