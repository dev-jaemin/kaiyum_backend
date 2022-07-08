import dotenv from "dotenv";
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PW,
    database: "kaiyum",
    connectionLimit: 30,
    //date값 예쁘게 받아오기
    dateStrings: "date",
};

export default config;
