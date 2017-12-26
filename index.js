const express = require("express");

const port = process.env.PORT || 5000;

express()
    .use((req, res, next) => {
        console.log(req.method, req.path, res.statusCode);
        next();
    })
    .get('/', (req, res) => res.send("server running"))
    .listen(port, () => console.log(`Listening on ${port}`));