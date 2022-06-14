const fs = require('fs');


function globalMiddleware (req, res, next) {
    fs.appendFileSync('global.txt', 'Se ingreso a ' + req.url);

    next();

}
module.exports = globalMiddleware;