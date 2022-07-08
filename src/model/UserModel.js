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
};

export default UserModel;
