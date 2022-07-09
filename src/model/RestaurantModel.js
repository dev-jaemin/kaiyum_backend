import logger from "../logger.js";
import { getConnection } from "./db/database.js";

const RestaurantModel = {
    getAllRestaurants: async () => {
        try {
            const result = await getConnection(`
                SELECT rid, name, location, img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                GROUP BY rid, name, location, x, y;`);

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
                SELECT name, location, img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid)
                WHERE rid = ?
                GROUP BY name, location, x, y;`,
                rid
            );

            return result[0][0];
        } catch (e) {
            logger.error(e);

            return {};
        }
    },
    getRestaurantsByLocation: async (location) => {
        try {
            const result = await getConnection(
                `
                SELECT rid, name, location, img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                WHERE location = ?
                GROUP BY rid, name, location, x, y;`,
                location
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
                SELECT rid, name, location, img, x, y, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                WHERE name LIKE "%${key}%"
                GROUP BY rid, name, location, x, y;`
            );

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
};

export default RestaurantModel;
