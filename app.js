const net = require("node:net");

const { parseRequest } = require('./parseRequest');
const { 
    welcomeHandler, 
    echoHandler, 
    userAgentHandler, 
    readFileHandler, 
    writeFileHandler } = require('./handlers');

/**
 * Create an object to deal with input parameters
 * node app.js --directory=files --port=4221
 */
const args = process.argv.slice(2); // Ignoring first two arguments (node and script name)
const params = args.reduce((acc, arg) => {
    const [key, value] = arg.split("=");
    // Remove leading dashes from the key and add the key-value pair to the accumulator object
    acc[key.replace(/^-+/, '')] = value;
    return acc; 
}, {});

const directory = params.directory ? params.directory : './';
const port = params.port ? params.port : 4221;

const server = net.createServer((socket) => {
    socket.setEncoding("utf-8");

    socket.on("data", (data) => {
        const request = parseRequest(data);

        if (request.path === "/") {
            welcomeHandler(socket);
        } else if (request.path.startsWith("/echo/")) {
            const query = request.path.replace("/echo/", "").trim();
            echoHandler(query, socket);
        } else if (request.path.startsWith("/user-agent")) {
            const agent = request.headers["User-Agent:"];
            userAgentHandler(agent, socket);
        } else if (request.path.startsWith("/files")) {
            const fileName = request.path.replace("/files/", "").trim();
            const filePath = directory + "/" + fileName;

            if (request.method === "GET")
                readFileHandler(fileName, directory, socket);

            if (request.method === "POST")
                writeFileHandler(filePath, request, socket);

        }  else {
            socket.write(ERROR_RESPONSE + CRLF + CRLF);
        }

        socket.end();
    });

    socket.on("close", () => { socket.end(); });
});

server.listen(port, () => {
    console.log("- Started server on", server.address());
    console.log(`- Serving  directory: ${directory}`);
});
