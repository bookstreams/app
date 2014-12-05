var Bootstrap = require("react-bootstrap");
var React     = require("react");

var Panel = Bootstrap.Panel;

var Book = React.createClass({
    render: function () {
        var rawInfo = this.props.book.info.volumeInfo;
        var book = {
            author: rawInfo.authors[0],
            title: rawInfo.title,
            coverPictureUrl: rawInfo.imageLinks.thumbnail
        };
        return (
            <Panel className="app-book">
                <div className="cover">
                    <img src={book.coverPictureUrl} />
                </div>
                <div className="details">
                    <span className="title">
                        {book.title}
                    </span>
                    <br />
                    <span className="author">
                        by {book.author}
                    </span>
                </div>
            </Panel>
        );
    }
});

module.exports = Book;
