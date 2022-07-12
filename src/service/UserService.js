import UserModel from "../model/UserModel.js";

const UserService = {
    getUser: async (unid) => {
        const user = await UserModel.getUserByUNID(unid);

        console.log(user);

        return user;
    },

    addUser: async (unid, nickname) => {
        const decodedName = decodeURI(nickname);

        const result = await UserModel.addUserByUNID(unid, decodedName);

        return result;
    },

    updateNickname: async (unid, newNickname) => {
        const user = await UserModel.getUserByUNID(unid);

        if (user.changed_nickname) {
            return {
                message: "already changed",
            };
        } else {
            const decodedName = decodeURI(newNickname);
            const result = await UserModel.updateNickName(unid, decodedName);

            return result;
        }
    },
};

export default UserService;
