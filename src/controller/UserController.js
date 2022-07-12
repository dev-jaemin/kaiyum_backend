import express from "express";
import UserService from "../service/UserService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await UserService.getUser(req.query["unid"]);

    res.send(data);
});

router.post("/", async (req, res) => {
    const result = await UserService.addUser(req.query["unid"], req.query["nickname"]);

    res.send(result);
});

router.put("/", async (req, res) => {
    const result = await UserService.updateNickname(req.query["unid"], req.query["newNickname"]);

    res.send(result);
});

export default router;
