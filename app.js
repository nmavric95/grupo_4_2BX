const express = require("express")
const app = express()
const path = require("path")

//PUBLIC PATH
const publicPath = path.resolve("public")

//PORT
const port = 3030

//VARIABLES DE ROUTES
const mainRouter = require("./routes/mainRoutes");
const packageRouter = require("./routes/packageRoute");
const productCartRouter = require("./routes/productCartRoutes");
const adminRouter = require("./routes/adminRoute")
const cProfileRouter = require("./routes/cProfileRoute");


//VIEW ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//RECURSOS PUBLIC
app.use(express.static(publicPath))

//ROUTES
app.use("/", mainRouter);
app.use("/packages", packageRouter);
app.use("/productCart", productCartRouter);
app.use("/userAdmin", adminRouter);
app.use("/userClient", cProfileRouter);


//APP LISTEN
app.listen(port, () => console.log("Listening on port ", port));

//ERROR
app.use((req,res,next)=> {
    res.status(404).render("notFound")
})

