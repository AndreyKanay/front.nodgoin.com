import BaseService from "./base.service.ts";

class SquadService extends BaseService {
    async createSquad(name: string, owner: string) {
        await this.axios.post("/v1/squad", {
            name: name,
            owner: owner
        })
    }

    async getTopSquad() {
        const response = await this.axios.get("/v1/squad/rating")
        return response.data;
    }

    async getMySquad(user_id: string) {
        const response = await this.axios.get(`/v1/squad/by_owner/${user_id}`)
        return response.data[0];
    }
}

const squadService = new SquadService();

export default squadService;