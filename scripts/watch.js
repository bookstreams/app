//////////////////
// Dependencies //
//////////////////

var gulp = require("gulp");



//////////////////////////////////
// App files watching functions //
//////////////////////////////////

var watchAppIndex = function () {
	return gulp.watch("app/main.html");
};

var watchAppScripts = function () {
	return gulp.watch("app/**/*.jsx");
};

var watchAppStyles = function () {
	return gulp.watch("app/**/*.scss");
};

var watchAppAssets = function () {
	return gulp.watch([
		"assets/**/*.css",
		"assets/**/*.jpg",
		"assets/**/*.js",
		"assets/**/*.md",
		"assets/**/*.mp3",
		"assets/**/*.woff"
	]);
};



////////////
// Export //
////////////

module.exports = {
	appIndex:   watchAppIndex,
	appScripts: watchAppScripts,
	appStyles:  watchAppStyles,
	appAssets:  watchAppAssets
};
