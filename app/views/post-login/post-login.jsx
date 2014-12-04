var React           = require("react");
var Router          = require("react-router");
var TransitionGroup = require("react/lib/ReactCSSTransitionGroup");

var Components = require("../../components");
var Footer = Components.Footer;
var Header = Components.Header;

var booksRQ = Ceres.getCollection("books").reactiveQuery({});

var PostLogin = React.createClass({
    mixins: [Router.State],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <div id="post-login">
                <Header />
                <TransitionGroup component="div" className="app-content" transitionName="swipe-view">
                    <Router.RouteHandler key={name} books={booksRQ.result} />
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
});

module.exports = PostLogin;
