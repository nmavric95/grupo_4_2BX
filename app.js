const express = require("express")
const app = express()
const path = require("path")

//PUBLIC PATH
const publicPath = path.resolve(__dirname, "./public")

//PORT
const port = 3030
//CONSTANTES PATH PARA REMOVER
// const indexPath = path.resolve(__dirname, "./views/index.html")
// const productDetailPath = path.resolve(__dirname, "./views/productDetail.html")
// const registerPath = path.resolve(__dirname, "./views/register.html")
// const productCart = path.resolve(__dirname, "./views/productCart.html")
// const loginPath = path.resolve(__dirname, "./views/login.html")

//VARIABLES DE ROUTES
const mainRouter = require("./routes/mainRoutes");
const productDetailRouter = require("./routes/productDetailRoute");
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
app.use("/productDetail", productDetailRouter);
app.use("/productCart", productCartRouter);

//RUTAS EN APP PARA REMOVER 
// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(indexPath))
// })

// app.get("/productDetail", (req, res) => {
//     res.sendFile(path.resolve(productDetailPath))
// })

// app.get("/productCart", (req, res) => {
//     res.sendFile(path.resolve(productCart))
// })

// app.get("/register", (req, res) => {
//     res.sendFile(path.resolve(registerPath))
// })

// app.get("/login", (req, res) => {
//     res.sendFile(path.resolve(loginPath))
// })

//APP LISTEN
app.listen(port, () => console.log("Listening on port ", port));

