import BaseService from "./base.service.ts";

class RatingService extends BaseService {
    async getUserRating() {
        const response = await this.axios.get('/v1/rating/');
        return response.data;
    }

    async getReferralBalanceRating() {
        const response = await this.axios.get('/v1/rating/referral/balance');
        return response.data;
    }

    async getReferralCountRating() {
        const response = await this.axios.get('/v1/rating/referral/count');
        return response.data;
    }
}

const ratingService = new RatingService();

export default ratingService;