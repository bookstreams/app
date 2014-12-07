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
            insertBookError: null
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
                    insertBookError: err
                });
            });
    },
    getBookErrorModal: function () {
        if (this.state.insertBookError) {
            return (
                <div className="overlay" onClick={this.closeErrorModal}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>
                        Oh snap!
                        <br />
                        An error occurred!
                    </h1>
                    <br />
                    <br />
                    <h3>
                        {this.insertBookError}
                    </h3>
                </div>
            );
        } else {
            return null;
        }
    },
    closeErrorModal: function () {
        this.setState({
            insertBookError: null
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
                {this.getBookErrorModal()}
            </footer>
        );
    }
});

module.exports = Footer;
