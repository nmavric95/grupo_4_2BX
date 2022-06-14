const fs = require('fs');


function logMiddleware (req, res, next) {
    fs.appendFileSync('log.txt', 'Se creo un registro en ' + req.url);

    next();

}
module.exports = logMiddleware;