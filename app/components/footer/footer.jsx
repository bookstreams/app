var React  = require("react");
var Router = require("react-router");

var Icon = require("../icon/icon.jsx");
var Link = Router.Link;

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="app-footer">
                <Link to="my-books">
                    <Icon icon="mdi-av-my-library-books" />
                </Link>
                <Link to="scan">
                    <Icon icon="mdi-image-camera" />
                </Link>
                <Link to="add">
                    <Icon icon="mdi-content-add-circle-outline" />
                </Link>
            </footer>
        );
    }
});

module.exports = Footer;
