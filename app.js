const express = require("express")
const app = express()
const path = require("path")
const publicPath = path.resolve(__dirname, "./public")
const port = 3030

app.listen(port, () => console.log("Listening on port ", port))

app.use(express.static(publicPath))