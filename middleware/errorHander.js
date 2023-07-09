const { constent } = require("../Constant")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constent.VAILDATION_ERROR:
            res.json({
                title: 'VALIDATION FAILED',
                message: err.message,
                stactTrace: err.stack
            });
            break;

        case constent.NOT_FOUND:
            res.json({
                title: 'NOT FOUND',
                message: err.message,
                stactTrace: err.stack
            });
            break;
        case constent.UNAUTHORIZED:
            res.json({
                title: 'UNAUTHORIZED OR NOT AUTHORIZED',
                message: err.message,
                stactTrace: err.stack
            });
            break;
        case constent.FORBIDDEN:
            res.json({
                title: 'FORBIDDEN',
                message: err.message,
                stactTrace: err.stack
            });
            break;
        case constent.SERVER_ERROR:
            res.json({
                title: 'SERVER_ERROR',
                message: err.message,
                stactTrace: err.stack
            });
            break;
        default:
            console.log('All Good or no ERROR ')
            break;
    }
}

module.exports = errorHandler;