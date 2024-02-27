const mogarn = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
function Dependencies(app) {
    app.use(mogarn('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors("*", { credentials: true }));
}
module.exports = { Dependencies };

