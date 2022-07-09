import mysql from "mysql2/promise";
import config from "./dbconfig.js";

let pool = mysql.createPool(config);

async function getConnection(query, values) {
    let result = [];

    let connection = await pool.getConnection(async (conn) => conn);

    result = await connection.query(query, values);
    connection.release();

    return result;
}
export { getConnection };
