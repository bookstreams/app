var constants = require("../constants.jsx");

var usersChange = function (users) {
    this.dispatch(constants.USERS_CHANGE, users);
};

module.exports = {
    usersChange: usersChange
};
