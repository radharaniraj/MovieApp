module.exports = function (app) {
    var Movie = app.models.movie;
    console.log("boot script called")
    arr = []
    for (let i = 0; i < 100; i++) {
        obj =
        {
            "name": "Don " + i.toString(),
            "yearOfRelease": 1901 + Math.floor(i / 10),
            "actor": "Actor " + i.toString(),
            "language": "English"
        };
        arr.push(obj)
    }
    Movie.create(arr);
};