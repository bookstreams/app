var React  = require("react");
var Router = require("react-router");

var Icon = require("../icon/icon.jsx");
var Link = Router.Link;

var cameraScan = require("../../camera-scan.js");
var geolocate  = require("../../geolocate.js");

var Footer = React.createClass({
    mixins: [
        Router.Navigation
    ],
    scan: function () {
        var self = this;
        Q()
            .then(function () {
                return geolocate();
            })
            .then(function (coords) {
                return Q.all([cameraScan(), coords]);
            })
            .spread(function (qrcode, coords) {
                return Ceres.call("addBookScan", qrcode, coords).result;
            })
            .then(function () {
                self.transitionTo("feed");
            })
            .fail(function (err) {
                console.log("ERROR");
                console.log(err);
            });
    },
    render: function () {
        return (
            <footer className="app-footer">
                <Link to="feed">
                    <Icon icon="book" />
                </Link>
                <span onClick={this.scan} className="camera-button">
                    <Icon icon="qrcode" />
                </span>
                <Link to="add">
                    <Icon icon="plus" />
                </Link>
            </footer>
        );
    }
});

module.exports = Footer;
