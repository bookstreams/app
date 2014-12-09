var React  = require("react");
var Router = require("react-router");

var Link = Router.Link;

var Components = require("../../components");
var Avatar     = Components.Avatar;
var BooksList  = Components.BooksList;
var Icon       = Components.Icon;

var MyBooks = React.createClass({
    getPlaceholder: function () {
        if (this.props.books.length > 0) {
            return null;
        }
        return (
            <div className="placeholder">
                <Link to="scan" className="instructions">
                    you don't have any books yet
                    <br />
                    click here to add some
                </Link>
            </div>
        );
    },
    render: function () {
        return (
            <div className="app-view-my-books">
                <BooksList books={this.props.books} />
                {this.getPlaceholder()}
            </div>
        );
    }
});

module.exports = MyBooks;
