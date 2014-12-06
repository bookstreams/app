var Bootstrap = require("react-bootstrap");
var React     = require("react");
var Router    = require("react-router");

var Components = require("../../components");

var Button = Bootstrap.Button;
var Col    = Bootstrap.Col;
var Well   = Bootstrap.Well;

var cameraScan = function (cb) {
    var onSuccess = function (result) {
        if (result.cancelled) {
            cb(new Error("Scan cancelled"), null);
            return;
        }
        cb(null, result.text);
    };
    var onError = function (err) {
        cb(err, null);
    };
    if (window.cordova) {
        cordova.plugins.barcodeScanner.scan(onSuccess, onError);
    } else {
        if (Math.random() > 0.5) {
            cb(new Error());
        } else {
            cb(null, "9788854165472");
        }
    }
};

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
            qrcode: null
        };
    },
    scan: function (target) {
        var self = this;
        return function () {
            cameraScan(function (err, res) {
                var state = {};
                state[target] = res;
                state[target + "Error"] = err;
                self.setState(state);
            });
        };
    },
    insertBook: function () {
        var self = this;
        var call = Ceres.call("insertBook", self.state.barcode, self.state.qrcode);
        call.result
            .then(function (res) {
                return call.updated;
            })
            .then(function () {
                self.transitionTo("feed");
            })
            .fail(function (err) {
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
        if (this.state.barcode && this.state.qrcode) {
            return (
                <Well onClick={this.insertBook}>
                    SEND
                </Well>
            );
        } else {
            return null;
        }
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
                        We're figuring out what happened
                        <br />
                        <br />
                        Please try again
                    </h3>
                </div>
            );
        } else {
            return null;
        }
    },
    closeErrorModal: function () {
        this.replaceState({});
    },
    render: function () {
        return (
            <div id="add">
                <Col xs={12} className="text-center">
                    <br />
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
                    <br />
                    {this.getSendButton()}
                    {this.getBookErrorModal()}
                </Col>
            </div>
        );
    }
});

module.exports = Add;
