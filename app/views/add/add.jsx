var Bootstrap = require("react-bootstrap");
var React     = require("react");

var Components = require("../../components");

var Button = Bootstrap.Button;
var Col    = Bootstrap.Col;
var Well   = Bootstrap.Well;

var scan = function (cb) {
    var onSuccess = function (result) {
        if (result.cancelled) {
            cb(new Error("Scan cancelled"));
            return;
        }
        cb(null, result);
    };
    var onError = function (err) {
        cb(err);
    };
    if (window.cordova) {
        cordova.plugins.barcodeScanner.scan(onSuccess, onError);
    } else {
        cb(null, {
            text: "9780062060242"
        });
    }
};

var Add = React.createClass({
    getInitialState: function () {
        return {
            barcode: null,
            qrcode: null
        };
    },
    scanBarcode: function () {
        var self = this;
        scan(function (err, result) {
            self.setState({
                barcode: result.text
            });
        });
    },
    scanQrcode: function () {
        var self = this;
        scan(function (err, result) {
            self.setState({
                qrcode: result.text
            });
        });
    },
    send: function () {
        var call = Ceres.call("insertBook", this.state.barcode, this.state.qrcode);
    },
    getBarcodeButton: function () {
        if (this.state.barcode) {
            return (
                <Well>
                    <h4>Barcode acquired</h4>
                    <h3>{this.state.barcode}</h3>
                </Well>
            );
        } else {
            return (
                <Well onClick={this.scanBarcode}>
                    <h4>Scan the barcode on the back of your book</h4>
                    <br />
                    <Button>Scan</Button>
                </Well>
            );
        }
    },
    getQrcodeButton: function () {
        if (this.state.qrcode) {
            return (
                <Well>
                    <h4>QR acquired</h4>
                    <h3>{this.state.qrcode}</h3>
                </Well>
            );
        } else {
            return (
                <Well onClick={this.scanQrcode}>
                    <h4>Scan the QR code on the sticker</h4>
                    <br />
                    <Button>Scan</Button>
                </Well>
            );
        }
    },
    getSendButton: function () {
        if (this.state.barcode && this.state.qrcode) {
            return (
                <Button onClick={this.send}>Send</Button>
            );
        } else {
            return null;
        }
    },
    render: function () {
        return (
            <div id="add">
                <Col xs={12} className="text-center">
                    <br />
                    <br />
                    <br />
                    {this.getBarcodeButton()}
                    <br />
                    <br />
                    <br />
                    {this.getQrcodeButton()}
                    <br />
                    <br />
                    <br />
                    {this.getSendButton()}
                </Col>
            </div>
        );
    }
});

module.exports = Add;
