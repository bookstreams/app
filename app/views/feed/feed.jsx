var React  = require("react");

var Components = require("../../components");
var Avatar     = Components.Avatar;
var BooksList  = Components.BooksList;

var Feed = React.createClass({
    render: function () {
        return (
            <div id="feed">
                <BooksList books={this.props.books} />
            </div>
        );
    }
});

module.exports = Feed;
