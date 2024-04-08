const constants = {
    CR: "\r",
    LF: "\n",
    CRLF: "\r\n",
    CRLF2: "\r\n\r\n",
}

const responses = {
    OK: "HTTP/1.1 200 OK",
    CREATED: "HTTP/1.1 201 Created",
    ERROR: "HTTP/1.1 404 Not found",
}

const content_type = {
    TEXT_PLAIN: "Content-Type: text/plain",
    OCTET_STREAM: "Content-Type: application/octet-stream",
}

module.exports = { constants, responses, content_type };
