import RestaurantModel from "../model/RestaurantModel.js";

const RestaurantService = {
    getRestaurants: async (location) => {
        let result;

        if (location === "all") {
            result = await RestaurantModel.getAllRestaurants();
        } else {
            result = await RestaurantModel.getRestaurantsByLocation(location);
        }

        return result;
    },
    getRestaurantByRID: async (rid) => {
        const result = await RestaurantModel.getRestaurantByRID(rid);

        return result;
    },
    // BASE64 인코딩된 key값을 받아야 함.
    getRestaurantsBySearch: async (key) => {
        const decodedKey = decodeURI(key);

        const result = await RestaurantModel.getRestaurantsBySearch(decodedKey);

        return result;
    },
};

export default RestaurantService;
