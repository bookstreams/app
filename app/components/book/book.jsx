var Bootstrap = require("react-bootstrap");
var React     = require("react");

var Panel = Bootstrap.Panel;

var Book = React.createClass({
    render: function () {
        return (
            <Panel className="app-book">
                <div className="cover">
                    <img src={this.props.book.coverPictureUrl} />
                </div>
                <div className="details">
                    <span className="title">
                        {this.props.book.title}
                    </span>
                    <br />
                    <span className="author">
                        by {this.props.book.author}
                    </span>
                </div>
            </Panel>
        );
    }
});

module.exports = Book;
