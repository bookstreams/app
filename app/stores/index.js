var BooksStore = require("./books.jsx");
var ErrorStore = require("./error.jsx");
var UsersStore = require("./users.jsx");

module.exports = {
	BooksStore: new BooksStore(),
	ErrorStore: new ErrorStore(),
	UsersStore: new UsersStore()
};
