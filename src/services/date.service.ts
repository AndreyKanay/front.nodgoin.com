import BaseService from "./base.service.ts";

class DateService extends BaseService {
    async getCurrentDate() {
        const response = await this.axios.get("https://worldtimeapi.org/api/timezone/Etc/UTC");
        return new Date(response.data.utc_datetime)
    }
}

const dateService = new DateService();

export default dateService;