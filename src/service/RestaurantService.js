import RestaurantModel from "../model/RestaurantModel.js";

const RestaurantService = {
    getAllRestaurents: async () => {
        const result = await RestaurantModel.getAllRestaurants();

        return result;
    },
    getRestaurantByRID: async (rid) => {
        const result = await RestaurantModel.getRestaurantByRID(rid);

        return result;
    },
    getReviews: async (rid) => {
        const result = await RestaurantModel.getReviews(rid);

        return result;
    },
};

export default RestaurantService;
