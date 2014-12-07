var Bootstrap = require("react-bootstrap");
var React     = require("react");
var Router    = require("react-router");

var Components = require("../../components");
var Icon = Components.Icon;

var Button = Bootstrap.Button;
var Col    = Bootstrap.Col;
var Well   = Bootstrap.Well;

var cameraScan = require("../../camera-scan.js");
var geolocate  = require("../../geolocate.js");

var titleCaseWord = function (word) {
    return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
};

var Add = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return {
            barcode: null,
            qrcode: null,
            insertingBook: null
        };
    },
    scan: function (target) {
        var self = this;
        return function () {
            cameraScan()
                .then(function (res) {
                    var state = {};
                    state[target] = res;
                    state[target + "Error"] = null;
                    self.setState(state);
                })
                .fail(function (err) {
                    var state = {};
                    state[target] = null;
                    state[target + "Error"] = err;
                    self.setState(state);
                });
        };
    },
    insertBook: function () {
        var self = this;
        if (self.state.insertingBook) {
            return;
        }
        self.setState({
            insertingBook: true
        });
        Q()
            .then(function () {
                return self.geolocatePromise;
            })
            .then(function (coords) {
                return Ceres.call(
                    "insertBook",
                    self.state.barcode,
                    self.state.qrcode,
                    coords
                ).result;
            })
            .then(function () {
                self.setState({
                    insertingBook: null
                });
                self.transitionTo("feed");
            })
            .fail(function (err) {
                console.log(err);
                self.setState({
                    insertBookError: err
                });
            });
    },
    getScanButton: function (target, step, instructions) {
        if (this.state[target]) {
            return (
                <Well className="valid">
                    <h5>STEP {step}</h5>
                    <h4>{titleCaseWord(target)} acquired</h4>
                </Well>
            );
        } else if (this.state[target + "Error"]) {
            return (
                <Well className="invalid" onClick={this.scan(target)}>
                    <h5>STEP {step}</h5>
                    <h4>
                        An error occurred scanning the {target}
                        <br />
                        try again
                    </h4>
                </Well>
            );
        } else {
            return (
                <Well onClick={this.scan(target)}>
                    <h5>STEP {step}</h5>
                    <h4>{instructions}</h4>
                </Well>
            );
        }
    },
    getSendButton: function () {
        if (!this.state.barcode || !this.state.qrcode) {
            return null;
        }
        if (this.state.insertingBook) {
            return (
                <Well>
                    <Icon icon="circle-o-notch" className="fa-spin grey-icon" />
                </Well>
            );
        } else {
            return (
                <Well onClick={this.insertBook}>
                    SEND
                </Well>
            );
        }
    },
    getBookErrorModal: function () {
        if (!this.state.insertBookError) {
            return null;
        }
        return (
            <div className="overlay" onClick={this.closeErrorModal}>
                <Icon icon="exclamation-triangle" className="error-icon" />
                <p className="error-message">
                    {this.state.insertBookError.reason}
                </p>
            </div>
        );
    },
    closeErrorModal: function () {
        this.replaceState({});
    },
    componentDidMount: function () {
        this.geolocatePromise = geolocate();
    },
    render: function () {
        return (
            <div id="add">
                <Col xs={12} className="text-center">
                    <br />
                    {this.getScanButton(
                        "barcode",
                        "1",
                        "Scan the barcode on the back of your book"
                    )}
                    {this.getScanButton(
                        "qrcode",
                        "2",
                        "Scan the qrcode on the bookstreams sticker"
                    )}
                    <br />
                    {this.getSendButton()}
                    {this.getBookErrorModal()}
                </Col>
            </div>
        );
    }
});

module.exports = Add;
