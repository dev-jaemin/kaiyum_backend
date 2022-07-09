import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import menu from "./CampusMenu.json";

import userController from "./src/controller/UserController.js";
import RestaurantController from "./src/controller/RestaurantController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// morgan : 로그를 좀 더 예쁘게 찍어주는 라이브러리
// combined모드가 좀 더 많은 로그 남김
if (process.env.NODE_ENV === "production") {
    app.use(logger("combined"));
} else {
    app.use(logger("dev"));
}

app.use(express.static("public"));

// ROUTER
app.use("/user", userController);
app.use("/restaurant", RestaurantController);

app.get("/campus", (req, res) => {
    const name = req.query["name"];
    console.log(menu[name]);
    res.send({
        name: menu[name],
    });
});

// 위에서부터 순서대로 처리하므로 여기까지 왔다면 404 not found
app.get((req, res) => {
    res.status(404).send("not found");
});

// 서버 실행 코드
app.listen(port, () => {
    console.log(`server is listening at ${process.env.HOST}:${port}`);
});
