"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Shruthi@25',
    database: 'mydatabase',
    port: 5432
});
exports.pool.connect((e) => {
    if (e) {
        console.log(e);
    }
    else {
        console.log("connected");
    }
});
