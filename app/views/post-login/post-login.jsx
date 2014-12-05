var React           = require("react");
var Router          = require("react-router");
var TransitionGroup = require("react/lib/ReactCSSTransitionGroup");

var Components = require("../../components");
var Footer = Components.Footer;
var Header = Components.Header;

//var booksRQ = Ceres.getCollection("books").reactiveQuery({});
var booksRQ = {
    result: [{
        "author": "Daniel Defoe",
        "title": "Robinson Crusoe",
        "coverPictureUrl": "http://www.hollywoodreporter.com/sites/default/files/imagecache/blog_post_349_width/2013/12/robinson_crusoe_book_a_p.jpg",
        "scans": [ ],
        "_id": "7Lt38YBynAFWdBct8"
    }]
};

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
