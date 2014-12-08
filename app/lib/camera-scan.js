var AppError = require("./app-error.js");

var cameraScan = function () {
    var deferred = Q.defer();
    var onSuccess = function (result) {
        if (result.cancelled) {
            deferred.reject(new AppError(
                "scan-cancelled",
                "Scan was cancelled"
            ));
        } else {
            deferred.resolve(result.text);
        }
    };
    var onError = function (err) {
        deferred.reject(new AppError(
            "scan-failed",
            "Scanning failed, please try again"
        ));
    };
    if (window.cordova) {
        cordova.plugins.barcodeScanner.scan(onSuccess, onError);
    } else {
        deferred.reject(new AppError(
            "scan-failed",
            "Scanning failed, please try again"
        ));
        //deferred.resolve("9788845907555");
    }
    return deferred.promise;
};

module.exports = cameraScan;
