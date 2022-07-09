import express from "express";
import RestaurantService from "../service/RestaurantService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await RestaurantService.getRestaurants(req.query["location"]);

    res.send(data);
});

router.get("/detail/:rid", async (req, res) => {
    const data = await RestaurantService.getRestaurantByRID(req.params["rid"]);

    res.send(data);
});

// BASE64 인코딩된 key값을 받아야 함.
router.get("/search", async (req, res) => {
    const data = await RestaurantService.getRestaurantsBySearch(req.query["key"]);

    res.send(data);
});

router.get("/review/:rid", async (req, res) => {
    const data = await RestaurantService.getReviews(req.params["rid"]);

    res.send(data);
});

export default router;
