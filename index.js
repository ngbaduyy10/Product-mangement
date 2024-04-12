const express = require("express");
const methodOverride = require("method-override"); // thu vien phuong thuc path, delete
const bodyParser = require("body-parser"); // thu vien lay ra req.body
const cookieParser = require("cookie-parser"); // phuc vu flash
const session = require("express-session"); // phuc vu flash
const flash = require("express-flash"); //thu vien hien ra thong bao
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

database.connect();

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`)); //su dung public

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
