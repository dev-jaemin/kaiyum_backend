import ReviewModel from "../model/ReviewModel.js";

const ReviewService = {
    getReviews: async (rid) => {
        const result = await ReviewModel.getReviews(rid);

        return result;
    },

    getMyReviews: async (unid) => {
        const result = await ReviewModel.getMyReviews(unid);

        return result;
    },

    writeReview: async (body) => {
        const result = await ReviewModel.writeReview(body.rid, body.unid, body.text, body.score);

        return result;
    },

    uploadImage: async (req, res, next) => {
        const url = process.env.HOST + "/image/review/" + req.file.filename;
        const result = await ReviewModel.updateImageUrl(req.query.reviewId, url);

        res.status(201).send(result);
    },
};

export default ReviewService;
