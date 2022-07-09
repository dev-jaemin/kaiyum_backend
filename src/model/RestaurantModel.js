import logger from "../logger.js";
import { getConnection } from "./db/database.js";

const RestaurantModel = {
    getAllRestaurants: async () => {
        try {
            const result = await getConnection(`
                SELECT rid, name, location, img, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                GROUP BY rid, name, location;`);

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
                SELECT name, location, img, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid)
                WHERE rid = ?
                GROUP BY name, location;`,
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
                SELECT rid, name, location, img, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                WHERE location = ?
                GROUP BY rid, name, location;`,
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
                SELECT rid, name, location, img, IFNULL(AVG(score), 0) AS score, COUNT(distinct review_id) AS review_count
                FROM kaiyum.restaurant LEFT JOIN kaiyum.review USING(rid) 
                WHERE name LIKE "%${key}%"
                GROUP BY rid, name, location;`
            );

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
    getReviews: async (rid) => {
        try {
            const result = await getConnection(
                `
                SELECT nickname, text, score, review.regdate 
                FROM kaiyum.review LEFT JOIN kaiyum.user USING(unid)
                WHERE rid = ?`,
                rid
            );

            return result[0];
        } catch (e) {
            logger.error(e);

            return [];
        }
    },
};

export default RestaurantModel;
