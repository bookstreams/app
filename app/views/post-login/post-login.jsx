var React           = require("react");
var Router          = require("react-router");
var TransitionGroup = require("react/lib/ReactCSSTransitionGroup");

var Components = require("../../components");
var Footer = Components.Footer;
var Header = Components.Header;

var PostLogin = React.createClass({
    mixins: [Router.State],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <div id="post-login">
                <Header />
                <TransitionGroup component="div" className="app-content" transitionName="swipe-view">
                    <Router.RouteHandler
                        key={name}
                        flux={this.props.flux}
                        books={this.props.books}
                        users={this.props.users}
                    />
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
});

module.exports = PostLogin;
