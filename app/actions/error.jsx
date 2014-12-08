var constants = require("../constants.jsx");

var errorThrow = function (error) {
    this.dispatch(constants.ERROR_THROW, error);
};

var errorClear = function () {
    this.dispatch(constants.ERROR_CLEAR, null);
};

module.exports = {
    errorThrow: errorThrow,
    errorClear: errorClear
};
