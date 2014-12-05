var BooksStore = require("./books.jsx");
var UsersStore = require("./users.jsx");

module.exports = {
	BooksStore: new BooksStore(),
	UsersStore: new UsersStore()
};
