const fs = require("fs");

const { constants, responses, content_type } = require('./constants');

function welcomeHandler(socket) {
    const message = "Welcome to the server!";
    socket.write(
        responses.OK + constants.CRLF +
        content_type.TEXT_PLAIN + constants.CRLF + 
        `Content-Length: ${message.length}\r\n\n${message}`
    );
}

function echoHandler(query, socket) {
    socket.write(
        responses.OK + constants.CRLF +
        content_type.TEXT_PLAIN + constants.CRLF + 
        `Content-Length: ${query.length}\r\n\n${query}`
    );
}

function userAgentHandler(agent, socket) {
    socket.write(
        responses.OK + constants.CRLF +
        content_type.TEXT_PLAIN + constants.CRLF + 
        `Content-Length: ${agent.length}\r\n\n${agent}`
    );
}

function readFileHandler(fileName, filePath, directory, socket) {
    const ifExist = fs.readdirSync(directory).includes(fileName);
    if (ifExist) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        socket.write(
            responses.OK + constants.CRLF +
            content_type.OCTET_STREAM + constants.CRLF + 
            `Content-Length: ${fileContent.length}\r\n\n${fileContent}`
        );
    } else {
        socket.write(responses.ERROR + constants.CRLF2);
    }
}

function writeFileHandler(filePath, request, socket) {
    fs.writeFileSync(filePath, request.body[0]);
    socket.write(responses.CREATED + constants.CRLF2);
}

module.exports = { welcomeHandler, echoHandler, userAgentHandler, readFileHandler, writeFileHandler };