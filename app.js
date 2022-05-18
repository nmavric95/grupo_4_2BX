const express = require("express")
const app = express()
const path = require("path")

//PUBLIC PATH
const publicPath = path.resolve(__dirname, "./public")

//PORT
const port = 3030

//VARIABLES DE ROUTES
const mainRouter = require("./routes/mainRoutes");
const packageRouter = require("./routes/packageRoute");
const productCartRouter = require("./routes/productCartRoutes");

//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//RECURSOS PUBLIC
app.use(express.static(publicPath))

//ROUTES
app.use("/", mainRouter);
app.use("/login", mainRouter);
app.use("/register", mainRouter);
app.use("/aboutUs", mainRouter);
app.use("/productDetail", packageRouter);
app.use("/productCart", productCartRouter);

//APP LISTEN
app.listen(port, () => console.log("Listening on port ", port));

//ERROR
app.use((req,res,next)=> {
    res.status(404).render("notFound")
})

