import logger from "../logger.js";
import { getConnection } from "./db/database.js";

const ReviewModel = {
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

    getMyReviews: async (unid) => {
        try {
            const result = await getConnection(
                "SELECT nickname, name, text, score, review.regdate FROM kaiyum.review LEFT JOIN kaiyum.user USING(unid) LEFT JOIN kaiyum.restaurant USING(rid) WHERE unid = ?",
                unid
            );
            return result[0][0];
        } catch (e) {
            logger.error(e);
            return [];
        }
    },

    writeReview: async (rid, unid, text, score) => {
        try {
            const result = await getConnection("INSERT INTO kaiyum.review (rid, unid, text, score) VALUES (?, ?, ?, ?)", [rid, unid, text, score]);

            return {
                review_id: result[0].insertId,
                message: "success",
            };
        } catch (e) {
            logger.error(e);
            return {
                message: "fail",
            };
        }
    },

    updateImageUrl: async (reviewId, imgUrl) => {
        try {
            const result = await getConnection("UPDATE kaiyum.review SET img = ? WHERE review_id = ?", [imgUrl, reviewId]);

            return {
                message: "success",
            };
        } catch (e) {
            logger.error(e);
            return {
                message: "fail",
            };
        }
    },
};

export default ReviewModel;
