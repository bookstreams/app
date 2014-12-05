var Fluxxor = require("fluxxor");
var React   = require("react");
var Router  = require("react-router");

var FluxMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Root = React.createClass({
    mixins: [
        FluxMixin,
        StoreWatchMixin(
            "BooksStore",
            "UsersStore"
        )
    ],
    getStateFromFlux: function () {
        return {
            books: this.props.flux.store("BooksStore").getBooks(),
            users: this.props.flux.store("UsersStore").getUsers()
        };
    },
    render: function () {
        return (
            <Router.RouteHandler
                flux={this.props.flux}
                books={this.state.books}
                users={this.state.users}
            />
        );
    }
});

module.exports = Root;
