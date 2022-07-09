import express from "express";
import UserService from "../service/UserService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await UserService.getUser(req.query["unid"]);

    res.send(data);
});

router.post("/", async (req, res) => {
    const result = await UserService.addUser(req.query["unid"], req.query["nickname"]);
    console.log(result);

    res.send(result);
});

export default router;
