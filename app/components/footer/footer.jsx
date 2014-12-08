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
    getInitialState: function () {
        return {
            addBookScanError: null
        };
    },
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
                console.log(err);
                self.setState({
                    addBookScanError: err
                });
            });
    },
    getBookErrorModal: function () {
        if (!this.state.addBookScanError) {
            return null;
        }
        return (
            <div className="overlay" onClick={this.closeErrorModal}>
                <div className="error-icon">
                    <Icon icon="mdi-action-report-problem" />
                </div>
                <div className="error-message">
                    {this.state.addBookScanError.reason}
                </div>
            </div>
        );
    },
    closeErrorModal: function () {
        this.setState({
            addBookScanError: null
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
                {this.getBookErrorModal()}
            </footer>
        );
    }
});

module.exports = Footer;
