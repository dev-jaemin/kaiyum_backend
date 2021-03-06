import logger from "../logger.js";
import { getConnection } from "./db/database.js";

const RestaurantModel = {
    getAllRestaurants: async () => {
        try {
            const result = await getConnection(`
                SELECT rid, name, location, restaurant.img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                GROUP BY rid, name, location, x, y
                ORDER BY score DESC;`);

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
    getRestaurantByRID: async (rid) => {
        try {
            const result = await getConnection(
                `
                SELECT name, location, restaurant.img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid)
                WHERE rid = ?
                GROUP BY name, location, x, y
                ORDER BY score DESC;`,
                rid
            );

            return result[0][0];
        } catch (e) {
            logger.error(e);

            return {};
        }
    },
    getRestaurantsByLocation: async (location, start, count) => {
        try {
            const result = await getConnection(
                `SELECT *
                FROM (
                    SELECT rid, name, location, restaurant.img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                    FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                    WHERE location = ?
                    GROUP BY rid, name, location, x, y
                    ORDER BY score DESC) AS a
                LIMIT ?, ?;`,
                [location, start, count]
            );

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
    getRestaurantsBySearch: async (key) => {
        try {
            const result = await getConnection(
                `
                SELECT rid, name, location, restaurant.img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                WHERE name LIKE "%${key}%"
                GROUP BY rid, name, location, x, y
                ORDER BY score DESC;`
            );

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
};

export default RestaurantModel;
