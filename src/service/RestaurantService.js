import RestaurantModel from "../model/RestaurantModel.js";

const RestaurantService = {
    getRestaurants: async (location, start, count) => {
        let result;

        if (location === "all") {
            result = await RestaurantModel.getAllRestaurants();
        } else {
            result = await RestaurantModel.getRestaurantsByLocation(location, parseInt(start), parseInt(count));
        }

        return result;
    },
    getRestaurantByRID: async (rid) => {
        const result = await RestaurantModel.getRestaurantByRID(rid);

        return result;
    },
    getRestaurantsBySearch: async (key) => {
        const decodedKey = decodeURI(key);

        const result = await RestaurantModel.getRestaurantsBySearch(decodedKey);

        return result;
    },
};

export default RestaurantService;
