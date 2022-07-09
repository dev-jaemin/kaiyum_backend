import UserModel from "../model/UserModel.js";

const UserService = {
    getUser: async (unid) => {
        const user = await UserModel.getUserByUNID(unid);

        console.log(user);

        return user;
    },

    addUser: async (unid, nickname) => {
        const result = await UserModel.addUserByUNID(unid, nickname);

        return result;
    },
};

export default UserService;
