const { constants } = require('./constants');

function parseRequest (requestData) {
    const request = requestData.toString().split(constants.CRLF);

    const [method, path, protocol] = request[0].split(" ");

    const headers = {};
    const bodyStartIndex = request.findIndex((val) => val === "");
    const body = request.length > bodyStartIndex ? request.slice(bodyStartIndex + 1) : [];
    request.slice(1, bodyStartIndex).forEach((header) => {
        const [key, value] = header.split(" ");
        if (key && value) {
            headers[key] = value;
        }
    });

    return {
        method,
        path,
        protocol,
        headers,
        body,
    };
};

module.exports = { parseRequest };