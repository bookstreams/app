var Fluxxor = require("fluxxor");

var constants = require("../constants.jsx");

var UsersStore = Fluxxor.createStore({
	initialize: function () {
		this.users = [];
		this.bindActions(
			constants.USERS_CHANGE, this.onUsersChange
		);
	},
	onUsersChange: function (payload) {
		this.users = payload;
		this.emit("change");
	},
	getUsers: function () {
		return this.users;
	}
});

module.exports = UsersStore;
