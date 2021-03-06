"use strict";
const getRegularMessageStructure = ({ message = null, status = 200, time = new Date(), result = null }) => {
    return {
        message,
        status,
        time,
        result
    };
};
function redirect(res, url, status = 302) {
    return res.status(status).redirect(url);
}
function success(res, result) {
    const messages = getRegularMessageStructure({ result });
    return res.status(200).json(messages);
}
function failed(res, { message, status = 400, time = new Date() }) {
    const messages = getRegularMessageStructure({ message, status, time });
    return res.status(status).json(messages);
}
function needParameter(res, parameterName, time = new Date()) {
    const message = `Need named parameter '${parameterName}'`;
    const status = 400;
    const messages = getRegularMessageStructure({ message, status, time });
    return res.status(400).json(messages);
}
module.exports = {
    success,
    failed,
    redirect,
    errorHandler: {
        needParameter
    }
};
//# sourceMappingURL=response.js.map