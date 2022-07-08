import UserModel from "../model/UserModel.js";

const UserService = {
    getUser: async (unid) => {
        const user = await UserModel.getUserByUNID(unid);

        console.log(user);

        return user;
    },
};

export default UserService;
