var React  = require("react");
var Router = require("react-router");

var Root = React.createClass({
    render: function () {
        return (
            <Router.RouteHandler />
        );
    }
});

module.exports = Root;
