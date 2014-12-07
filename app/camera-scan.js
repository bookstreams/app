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
        deferred.resolve("9788845907555");
    }
    return deferred.promise;
};

module.exports = cameraScan;
