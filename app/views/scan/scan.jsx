var React     = require("react");
var Router    = require("react-router");

var Components = require("../../components");
var Icon = Components.Icon;

var AppError   = require("../../lib/app-error.js");
var cameraScan = require("../../lib/camera-scan.js");
var geolocate  = require("../../lib/geolocate.js");

var Scan = React.createClass({
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
                self.transitionTo("my-books");
            })
            .fail(function (err) {
                if (err.type === "scan-cancelled") {
                    return;
                }
                self.props.flux.actions.errorThrow(err);
            });
    },
    getInitialState: function () {
        return {};
    },
    openLandingPage: function () {
        window.open("http://bookstreams.org", "_system");
    },
    render: function () {
        return (
            <div className="app-view-scan">
                <p className="instructions">
                    click on the shutter
                    <br />
                    and scan the <span className="red">bookstreams</span> sticker
                    <br />
                    on your book
                </p>
                <div className="camera-icon" onClick={this.scan}>
                    <Icon icon="mdi-image-camera" />
                </div>
                <p className="clarification" onClick={this.openLandingPage}>
                    no idea of what we're talking about?
                    <br />
                    click here to find out
                </p>
            </div>
        );
    }
});

module.exports = Scan;
