var React  = require("react");
var Router = require("react-router");

var Login = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return {
            loginError: null
        };
    },
    login: function () {
        var self = this;
        Ceres.loginWithFacebook()
            .then(function () {
                self.transitionTo("scan");
            })
            .fail(function (err) {
                console.log(err);
                self.setState({
                    loginError: true
                });
            });
    },
    getErrorAlert: function () {
        if (!this.state.loginError) {
            return null;
        }
        return (
            <div className="error-alert">
                Error logging in, try again
            </div>
        );
    },
    statics: {
        willTransitionTo: function (t) {
            var def = Q.defer();
            Ceres.on("connected", function () {
                Ceres.resumeLoginPromise
                    .then(t.redirect.bind(t, "scan"))
                    .finally(def.resolve.bind(def));
            });
            t.wait(def.promise);
        }
    },
    render: function () {
        return (
            <div id="login">
                {this.getErrorAlert()}
                <div className="login-button" onClick={this.login}>
                    Login with Facebook
                </div>
            </div>
        );
    }
});

module.exports = Login;
