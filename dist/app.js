"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("./db/db");

var _user = _interopRequireDefault(require("./routes/user.route"));

var _posts = _interopRequireDefault(require("./routes/posts.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes Import
const app = (0, _express.default)();
app.use((0, _cors.default)()); // Options for CORS

app.options('*', (0, _cors.default)());
app.get('/', (req, res) => {
  res.send("Welcome to Benedict Nkeonye's APIS");
});
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); // Routes

app.use('/api/v1/users', _user.default);
app.use('/api/v1/posts', _posts.default);
var _default = app;
exports.default = _default;