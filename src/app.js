const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const session = require("express-session")
const cookies = require("cookie-parser")
const globalMiddleware = require('./middlewares/globalMiddleware');
const userLMiddleware = require('./middlewares/userLMiddleware');
//Autentificacion para entrar en ruta admin
const userAdminAuth = require('./middlewares/userAdminAuth');

//PUBLIC PATH
const publicPath = path.resolve("../public")

//PORT
const port = 3030

//VARIABLES DE ROUTES
const mainRouter = require("./routes/mainRoutes");
const packageRouter = require("./routes/packageRoute");
const productCartRouter = require("./routes/productCartRoutes");
const adminRouter = require("./routes/adminRoute")
const cProfileRouter = require("./routes/cProfileRoute");

//VARIABLES DE API ROUTES
const packagesApiRouter = require("./routes/api/packageApiRoute.js");
const usersApiRouter = require("./routes/api/usersApiRoute.js");
const locationsApiRouter = require("./routes/api/locationsApiRouter.js")
const sportsApiRouter = require("./routes/api/sportsApiRouter.js")

// MIDDLEWARES
app.use(cookies())
// app.use(globalMiddleware);


// SESSION

app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false,
}));

app.use(userLMiddleware)


//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
// app.set("views", path.resolve("views"));

//CRUD - METODOS

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//RECURSOS PUBLIC
app.use(express.static(publicPath))
app.use(methodOverride("_method"))

//ROUTES
app.use("/", mainRouter);
app.use("/api/package", packagesApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/locations", locationsApiRouter)
app.use("/api/sports", sportsApiRouter)
app.use("/packages", packageRouter);
app.use("/productCart", productCartRouter);
app.use("/userAdmin", userAdminAuth, adminRouter);
app.use("/userClient", cProfileRouter);


//APP LISTEN
app.listen(port, () => console.log("Listening on port ", port));

//ERROR
app.use((req,res,next)=> {
    res.status(404).render("notFound")
})

