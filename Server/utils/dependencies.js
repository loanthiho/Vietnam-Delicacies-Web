const mogarn = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
function Dependencies(app) {
  app.use(mogarn("dev"));
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

module.exports = { Dependencies };
