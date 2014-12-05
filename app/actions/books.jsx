var constants = require("../constants.jsx");

var booksChange = function (books) {
    this.dispatch(constants.BOOKS_CHANGE, books);
};

module.exports = {
    booksChange: booksChange
};
