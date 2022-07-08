import mysql from "mysql2/promise";
import logger from "../../logger.js";
import config from "./dbconfig.js";

let pool = mysql.createPool(config);

async function getConnection(query, values) {
    let result = [];
    try {
        let connection = await pool.getConnection(async (conn) => conn);
        try {
            result = await connection.query(query, values);
            connection.release();
        } catch (e) {
            logger.error(e);
        }
    } catch (e) {
        logger.error(e);
    }

    return result;
}

export { getConnection };
