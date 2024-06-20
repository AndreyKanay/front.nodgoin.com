import BaseService from "./base.service.ts";
import {AxiosResponse} from "axios";
import {IUser} from "../interfaces/IUser.ts";
import {userState} from "../state/UserState.ts";

class UserService extends BaseService {
    async getUser(id: string) {
        const response:  AxiosResponse<IUser> = await this.axios.get(`/v1/users/${id}?is_telegram_id=true`)
        console.log(response);
        
        return response.data;
    }

    async updateUserLastVisit(date: Date) {
        return await this.axios.post(`/v1/users/${userState.user_id}/last-visit`, {
            last_visit: date
        });
    }

    async updateUserBalance(balance: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/balance`, {
            balance: balance
        });
    }

    async updateUserEnergy(energy: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/energy`, {
            energy: energy
        });
    }

    async updateUserMultiTapLVL(lvl: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/multi-tap-lvl`, {
            lvl: lvl
        });
    }

    async updateUserRegenerationSpeedLVL(lvl: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/regeneration-speed-lvl`, {
            lvl: lvl
        });
    }

    async updateUserEnergyLimitLVL(lvl: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/energy-limit-lvl`, {
            lvl: lvl
        });
    }

    async updateUserTipTopBot(on: boolean) {
        return await this.axios.post(`/v1/users/${userState.user_id}/tip-top-bot`, {
            on: on
        });
    }

    async updateUserFullEnergy(count: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/full-energy-count`, {
            count: count
        });
    }

    async updateUserTurbo(count: number) {
        return await this.axios.post(`/v1/users/${userState.user_id}/turbo-count`, {
            count: count
        });
    }
}

export const userService = new UserService();