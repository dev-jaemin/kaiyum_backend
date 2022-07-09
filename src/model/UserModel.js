import logger from "../logger.js";
import { getConnection } from "./db/database.js";

const UserModel = {
    getUserByUNID: async (unid) => {
        try {
            const result = await getConnection("SELECT * FROM kaiyum.user WHERE unid = ?", unid);

            return result[0][0];
        } catch (err) {
            logger.error(err);

            return {};
        }
    },

    addUserByUNID: async (unid, nickname) => {
        try {
            await getConnection(
                "INSERT INTO kaiyum.user (unid, nickname) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM kaiyum.user WHERE unid = ? AND nickname = ?)",
                [unid, nickname, unid, nickname]
            );

            return {
                message: "success",
            };
        } catch (err) {
            logger.error(err);

            return {
                message: "fail",
            };
        }
    },
};

export default UserModel;
