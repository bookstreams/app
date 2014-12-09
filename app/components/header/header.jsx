var React  = require("react");
var Router = require("react-router");

var Header = React.createClass({
    mixins: [
        Router.State
    ],
    getViewName: function () {
        var activeRoutes = this.getRoutes();
        var innerMostRoute = activeRoutes[activeRoutes.length - 1];
        return innerMostRoute.name.split("-").join(" ");
    },
    render: function () {
        return (
            <header className="app-header">
                <img className="header-decoration" src="assets/images/header-decoration.png" />
                <div className="view-name">
                    {this.getViewName()}
                </div>
            </header>
        );
    }
});

module.exports = Header;
