import express from "express";
import ReviewService from "../service/ReviewService.js";
import multer from "multer";

// storage setting for file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/review");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // 파일 원본이름 저장
    },
});
const upload = multer({ storage: storage }); // 미들웨어 생성

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
    const data = await ReviewService.writeReview(req.body);

    res.send(data);
});

router.post("/image", upload.single("img"), async (req, res, next) => {
    await ReviewService.uploadImage(req, res, next);
});

export default router;
