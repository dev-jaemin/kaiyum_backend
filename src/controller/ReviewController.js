import express from "express";
import ReviewService from "../service/ReviewService.js";

const router = express.Router();

router.get("/restaurant/:rid", async (req, res) => {
    const data = await ReviewService.getReviews(req.params["rid"]);

    res.send(data);
});

router.get("/user/:unid", async (req, res) => {
    const data = await ReviewService.getMyReviews(req.params["unid"]);

    res.send(data);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const data = await ReviewService.writeReview(req.body);

    res.send(data);
});

export default router;
