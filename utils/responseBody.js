const sendResponse = (res, statusCode, success, message, data = [], errors = []) => {
    return res.status(statusCode).json({
        success,
        errors,
        message,
        data
    });
};

const sendSuccess = (res, statusCode, message, data) => {
    return sendResponse(res, statusCode, true, message, data, []);
};

const sendError = (res, statusCode, message, errors = []) => {
    return sendResponse(res, statusCode, false, message, [], errors);
};

module.exports = {
    sendResponse,
    sendSuccess,
    sendError
};
