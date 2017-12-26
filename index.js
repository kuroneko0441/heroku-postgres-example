const express = require("express");
const { Pool } = require("pg");

const port = process.env.PORT || 5000;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL + "?ssl=true"
});

express()
    .use((req, res, next) => {
        console.log(req.method, req.path, res.statusCode);
        next();
    })
    .get('/', (req, res) => res.send("server running"))
    .get('/db', (req, res) => {
        pool.query("SELECT * FROM test_table", (err, result) => {
            if (err) {
                console.error(err);
                res.send("DB Error occured")
            } else {
                res.json(result.rows);
            }
            pool.end();
        })
    })
    .listen(port, () => console.log(`Listening on ${port}`));