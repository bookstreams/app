var R = require("ramda");

var actions = {};

actions = R.mixin(actions, require("./books.jsx"));
actions = R.mixin(actions, require("./users.jsx"));

module.exports = actions;
