var React  = require("react");

var Components = require("../../components");
var Avatar     = Components.Avatar;
var BooksList  = Components.BooksList;
var Icon       = Components.Icon;

var Feed = React.createClass({
    openLandingPage: function () {
        window.open("http://bookstreams.org", "_system");
    },
    getDescription: function () {
        if (this.props.books.length > 0) {
            return null;
        }
        return (
            <div className="description">
                <p className="instructions">
                    to start
                    <br />
                    scan the <span className="red">bookstreams</span> sticker
                    <br />
                    on your book
                </p>
                <p className="clarification" onClick={this.openLandingPage}>
                    no idea of what we're talking about?
                    <br />
                    click here to find out
                </p>
                <div className="start-here">
                    <span className="red">START HERE</span>
                </div>
                <div className="arrow">
                    <Icon icon="mdi-action-trending-neutral" className="arrow-icon" />
                </div>
            </div>
        );
    },
    render: function () {
        return (
            <div id="feed">
                <BooksList books={this.props.books} />
                {this.getDescription()}
            </div>
        );
    }
});

module.exports = Feed;
