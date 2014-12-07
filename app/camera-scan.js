var cameraScan = function () {
    var deferred = Q.defer();
    var onSuccess = function (result) {
        if (result.cancelled) {
            deferred.reject(new Error("Scan cancelled"));
        } else {
            deferred.resolve(result.text);
        }
    };
    var onError = function (err) {
        deferred.reject(err);
    };
    if (window.cordova) {
        cordova.plugins.barcodeScanner.scan(onSuccess, onError);
    } else {
        if (Math.random() > 0.5) {
            deferred.reject(new Error("NOT THIS TIME!!!"));
        } else {
            deferred.resolve("9788845907555");
        }
    }
    return deferred.promise;
};

module.exports = cameraScan;
