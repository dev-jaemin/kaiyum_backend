import express from "express";
import UserService from "../service/UserService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await UserService.getUser(req.query["unid"]);

    res.send(data);
});

export default router;
