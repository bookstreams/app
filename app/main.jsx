var Fluxxor = require("fluxxor");
var React   = require("react");
var Router  = require("react-router");

// Flux
var stores  = require("./stores/");
var actions = require("./actions/");

var flux = new Fluxxor.Flux(stores, actions);

//Attach to backend
require("./ceres.jsx").init(flux);

// Views
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;
var Views        = require("./views");

var routes = (
    <Route handler={Views.Root}>
        <Route name="postLogin" path="/app" handler={Views.PostLogin}>
            <Route name="add" handler={Views.Add} addHandlerKey={true} />
            <Route name="my-books" handler={Views.MyBooks} addHandlerKey={true} />
            <Route name="scan" handler={Views.Scan} addHandlerKey={true} />
            <DefaultRoute handler={Views.MyBooks} />
        </Route>
        <Route name="login" path="/" handler={Views.Login} />
        <DefaultRoute handler={Views.Login} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux} />, document.body);
});

window.React = React;
