var init = function (flux) {

    var targets = {
        "web.dev": {
            domain: "localhost:3000"
        },
        "ios.dev": {
            domain: "192.168.199.162:3000"
        },
        "ios.prod": {
            domain: "api.bookstreams.org",
            ssl: true
        },
        "android.dev": {
            domain: "192.168.199.162:3000"
        },
        "android.prod": {
            domain: "api.bookstreams.org",
            ssl: true
        }
    };

    var target = targets[APP_TARGET];
    window.Ceres = new Asteroid(target.domain, target.ssl);

    Ceres.subscribe("myBooks");
    var Books = Ceres.getCollection("books");
    var booksRQ = Books.reactiveQuery({});
    booksRQ.on("change", function () {
        flux.actions.booksChange(booksRQ.result);
    });

    var Users = Ceres.getCollection("books");
    var usersRQ = Users.reactiveQuery({});
    usersRQ.on("change", function () {
        flux.actions.usersChange(usersRQ.result);
    });

};

module.exports = {
    init: init
};
