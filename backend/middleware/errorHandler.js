const {constants} = require('../constants');

// res se status code leke, uske hisab se switch case me jaake, error message aur stack trace bhej dega client ko.
// error handle k lie status code chiye
// jab bhi koi error throw hoga, to ye middleware usko catch karega aur uske hisab se client ko response bhej dega.
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    let title = 'Server Error';

    switch (statusCode) {
        case constants.NOT_FOUND:
            title = "Not Found";
            break;
        case constants.INTERNAL_SERVER_ERROR:
            title = "Internal Server Error";
            break;
        case constants.VALIDATION_ERROR:
            title = "Validation Error";
            break;
        case constants.UNAUTHORIZED:
            title = "Unauthorized";
            break;
        case constants.FORBIDDEN:
            title = 'Forbidden';
            break;
    
        default:
            console.log("No error !");
            break;
    }

    res.json({
        title: title,
        message: err.message,
        stackTrace: err.stack
    });
}

module.exports = errorHandler;