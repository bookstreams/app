var geolocate = function () {
    var deferred = Q.defer();
    var ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
    var options = {
        maximumAge: ONE_HOUR_IN_MILLISECONDS,
        timeout: 10000,
        enableHighAccuracy: true
    };
    var onSuccess = function (position) {
        deferred.resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    };
    var onError = function (err) {
        deferred.reject(err);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    return deferred.promise;
};

module.exports = geolocate;
