var React  = require("react");
var Router = require("react-router");

var Link = Router.Link;
var Icon = require("../icon/icon.jsx");

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="app-footer">
                <Icon icon="qrcode" className="camera" />
            </footer>
        );
    }
});

module.exports = Footer;
