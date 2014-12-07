var Bootstrap = require("react-bootstrap");
var React     = require("react");

var Panel = Bootstrap.Panel;

var maybe = function (obj, chain, def) {
    def = def || null;
    return chain.reduce(function (acc, link) {
        if (acc && acc[link] && acc !== def) {
            return acc[link];
        } else {
            return def;
        }
    }, obj);
};

var Book = React.createClass({
    render: function () {
        var rawInfo = this.props.book.info.volumeInfo;
        var book = {
            author: maybe(
                rawInfo,
                ["authors", "0"],
                "Unknown"
            ),
            title: maybe(
                rawInfo,
                ["title"],
                "Untitled"
            ),
            coverPictureUrl: maybe(
                rawInfo,
                ["imageLinks", "thumbnail"],
                "assets/images/default-cover.png"
            )
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
