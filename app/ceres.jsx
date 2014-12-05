var init = function (flux) {

    var Ceres = new Asteroid("localhost:3000");

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
