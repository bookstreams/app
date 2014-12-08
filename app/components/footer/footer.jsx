var React  = require("react");
var Router = require("react-router");

var Icon = require("../icon/icon.jsx");
var Link = Router.Link;

var AppError   = require("../../lib/app-error.js");
var cameraScan = require("../../lib/camera-scan.js");
var geolocate  = require("../../lib/geolocate.js");

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
                var call = Ceres.call("addBookScan", qrcode, coords);
                return call.result.fail(function (err) {
                    throw new AppError(
                        "server",
                        err.reason
                    );
                });
            })
            .then(function () {
                self.transitionTo("feed");
            })
            .fail(function (err) {
                if (err.type === "scan-cancelled") {
                    return;
                }
                self.props.flux.actions.errorThrow(err);
            });
    },
    render: function () {
        return (
            <footer className="app-footer">
                <Link to="feed">
                    <Icon icon="mdi-av-my-library-books" />
                </Link>
                <a onClick={this.scan} className="camera-button">
                    <Icon icon="mdi-image-camera" />
                </a>
                <Link to="add">
                    <Icon icon="mdi-content-add-circle-outline" />
                </Link>
            </footer>
        );
    }
});

module.exports = Footer;
