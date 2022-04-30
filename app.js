const express = require("express")
const app = express()
const path = require("path")

const publicPath = path.resolve(__dirname, "./public")
const indexPath = path.resolve(__dirname, "./views/index.html")
const productDetailPath = path.resolve(__dirname, "./views/productDetail.html")
const port = 3030

app.use(express.static(publicPath))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(indexPath))
})

app.get("/", (req, res) => {
    res.sendFile(path.resolve(productDetailPath))
})

app.listen(port, () => console.log("Listening on port ", port))

