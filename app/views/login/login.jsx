var Bootstrap = require("react-bootstrap");
var React     = require("react");

var Button = Bootstrap.Button;
var Col    = Bootstrap.Col;

var Login = React.createClass({
    login: function () {
        Ceres.loginWithFacebook();
    },
    render: function () {
        return (
            <div id="login">
                <Col xs={12} className="text-center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button onClick={this.login}>
                        Login
                    </Button>
                </Col>
            </div>
        );
    }
});

module.exports = Login;
