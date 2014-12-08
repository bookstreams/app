var AppError = function (type, message) {
    this.name = "AppError";
    this.type = type;
    this.message = message;
};

AppError.prototype = Object.create(Error.prototype);
AppError.constructor = AppError;

module.exports = AppError;
