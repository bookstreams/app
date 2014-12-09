var Bootstrap = require("react-bootstrap");
var React     = require("react");
var Router    = require("react-router");

var Components = require("../../components");
var Icon = Components.Icon;

var Button = Bootstrap.Button;
var Col    = Bootstrap.Col;
var Well   = Bootstrap.Well;

var AppError   = require("../../lib/app-error.js");
var cameraScan = require("../../lib/camera-scan.js");
var geolocate  = require("../../lib/geolocate.js");

var titleCaseWord = function (word) {
    return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
};

var Add = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return {};
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
        self.setState({
            insertingBook: true
        });
        Q()
            .then(function () {
                return geolocate();
            })
            .then(function (coords) {
                var call = Ceres.call(
                    "insertBook",
                    self.state.barcode,
                    self.state.qrcode,
                    coords
                );
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
                self.replaceState({});
                self.props.flux.actions.errorThrow(err);
            });
    },
    getScanButton: function (target, step, instructions) {
        if (this.state[target]) {
            return (
                <Well className="valid">
                    <Icon icon="mdi-action-done" className="status" />
                    <h5>STEP {step}</h5>
                    <h4>{titleCaseWord(target)} acquired</h4>
                </Well>
            );
        } else if (this.state[target + "Error"]) {
            return (
                <Well className="invalid" onClick={this.scan(target)}>
                    <Icon icon="mdi-content-clear" className="status" />
                    <h5>STEP {step}</h5>
                    <h4>{titleCaseWord(target)} scan failed<br />try again</h4>
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
        var content = (
            this.state.insertingBook ?
                <img src="assets/images/spinner.gif" /> :
                <span>SEND</span>
        );
        var action = (
            this.state.insertingBook ?
                null :
                this.insertBook
        );
        return (
            <Well className="send-button" onClick={action}>
                {content}
            </Well>
        );
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
                </Col>
            </div>
        );
    }
});

module.exports = Add;
