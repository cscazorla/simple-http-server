# Introduction
This is a simple HTTP 1.1 server built with Node 18 for educational purposes. The goail is to understand how HTTP messages work and how data is exchanged between a server and a client (a.k.a. requests and responses)

# Features
* Simple routing handlers-
* Welcome and echo GET endpoints.
* Return the contents of a file.
* Accept the contents of a file in a POST request and persist it into a directory


# Usage
To spin up the TCP server you just need to run the following command

```
node app.js --directory=files --port=4221
```

You can use the following Docker command to pull a Docker image:

```
docker run --rm -v $PWD:/app -w /app -p 4221:4221 -it node:18 bash
```

# Demo requests
You can use the browser to test the server or CURL

```
curl -v -X GET localhost:4221
curl -v -X GET localhost:4221/files/test.txt
curl -vvv -d "Persisting a hello world message" localhost:4221/files/readme.txt

```
