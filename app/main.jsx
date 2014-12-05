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
var Route = Router.Route;
var Views = require("./views");

var routes = (
    <Route handler={Views.Root}>
        <Route name="postLogin" handler={Views.PostLogin}>
            <Route name="add" handler={Views.Add} addHandlerKey={true} />
            <Route name="feed" handler={Views.Feed} addHandlerKey={true} />
            <Route name="geo" handler={Views.Geo} addHandlerKey={true} />
        </Route>
        <Route name="login" handler={Views.Login} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler flux={flux} />, document.body);
});

window.React = React;
