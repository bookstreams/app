var Fluxxor = require("fluxxor");

var constants = require("../constants.jsx");

var BooksStore = Fluxxor.createStore({
    initialize: function () {
        this.books = [];
        this.bindActions(
            constants.BOOKS_CHANGE, this.onBooksChange
        );
    },
    onBooksChange: function (payload) {
        this.books = payload;
        this.emit("change");
    },
    getBooks: function () {
        return this.books;
    }
});

module.exports = BooksStore;
