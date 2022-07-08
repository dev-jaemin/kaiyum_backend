import express from "express";
import RestaurantService from "../service/RestaurantService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await RestaurantService.getAllRestaurents();

    res.send(data);
});

router.get("/:rid", async (req, res) => {
    const data = await RestaurantService.getRestaurantByRID(req.params["rid"]);

    res.send(data);
});

router.get("/review/:rid", async (req, res) => {
    const data = await RestaurantService.getReviews(req.params["rid"]);

    res.send(data);
});

export default router;
