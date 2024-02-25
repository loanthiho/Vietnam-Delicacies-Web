const mogarn = require('morgan');
const bodyParser = require('body-parser');
function Dependencies(app) {
    app.use(mogarn('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
}

module.exports = { Dependencies };