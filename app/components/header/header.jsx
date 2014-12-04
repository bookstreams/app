var React  = require("react");
var Router = require("react-router");

var Header = React.createClass({
    mixins: [Router.State],
    render: function () {
        return (
            <header className="app-header">
                <div className="logo">
                    bookstream
                </div>
            </header>
        );
    }
});

module.exports = Header;
