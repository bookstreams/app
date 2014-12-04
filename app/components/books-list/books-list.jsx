var React  = require("react");

var Book = require("../book/book.jsx");

var BooksList = React.createClass({
    render: function () {
        var books = this.props.books.map(function (book) {
            return <Book book={book} />;
        });
        return (
            <div className="app-books-list">
                {books}
            </div>
        );
    }
});

module.exports = BooksList;
