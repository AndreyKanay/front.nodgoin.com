import {action, computed, makeAutoObservable} from "mobx";
import config from "../config.ts";
import {userService} from "../services/user.service.ts";
import {getRandomInt} from "../helpers/getRandomInt.ts";

class GameState {
    private _balance: number = 0;
    private _energy: number = 500;
    private _total_energy: number = 500;
    private _coin_step: number = 1;
    private _energy_step: number = 1;
    private _multitap_lvl: number = 0;
    private _speed_lvl: number = 0;
    private _energy_lvl: number = 0;
    private _tiptop: number = 0;
    private _turbo: number = 3;
    private _full_energy: number = 3;
    private _is_rocket:boolean = false;
    private _x:number = 1;
    private _chi = 0;
    private _giga = 0;
    private _dgen = 0;
    private _multi_tap_lvl: number = 0;
    private _regeneration_speed_lvl: number = 0;
    private _energy_limit_lvl: number = 0;
    private _tip_top_bot: boolean = false;
    private _full_energy_boost: number = 3;
    private _turbo_boost: number = 3;

    constructor() {
        makeAutoObservable(this)
        setInterval(() => {
            this.setIsRocket(true);
        }, [20000, 20000, 20000, 25000, 30000, 32500, 35000, 37500, 40000, 45000, 50000][getRandomInt(0, 10)])
    }

    @computed
    setBalance(balance: number) {
        this._balance = Math.floor(balance);
        this._chi += 1
        if (this._chi > 10000) {
            this._chi = 0;
        }

        this._giga += 1
        if (this._giga > 1000001) {
            this._giga = 0;
        }

        this._dgen += 1
        if (this._dgen > 10000001) {
            this._dgen = 0;
        }

        userService.updateUserBalance(this._balance).then(() => {})
    }

    @action.bound
    get chi() {
        return this._chi;
    }

    @action.bound
    get giga() {
        return this._giga;
    }

    @action.bound
    get dgen() {
        return this._dgen;
    }

    @action.bound
    get balance() {
        return this._balance;
    }

    @computed
    setCoinStep(value: number) {
        this._coin_step = value;
    }

    @action.bound
    get coin_step() {
        return this._coin_step;
    }

    @computed
    setEnergyStep(value: number) {
        this._energy_step = value;
    }

    @action.bound
    get energy_step() {
        return this._energy_step;
    }

    @computed
    setEnergy(value: number) {
        this._energy = value;
        userService.updateUserEnergy(Math.round(this._energy)).then(() => {})
    }

    @action.bound
    get energy() {
        return this._energy;
    }

    @computed
    setTotalEnergy(value: number) {
        this._total_energy = value;
    }

    @action.bound
    get total_energy() {
        const result = 500;
        const max = 10000;

        // for (let i = 0; i < this._energy_limit_lvl + 1; i++) {
        //     result += result * 0.25
        // }
        return Math.floor(this.energy_limit_lvl === 0 ? result : max / 10 * this._energy_limit_lvl);
    }

    @action.bound
    get total_raw_energy() {
        return this._total_energy;
    }

    @computed
    setMultitapLvl(value: number) {
        this._multitap_lvl = value;
        localStorage.setItem("_multitap_lvl", String(this._multitap_lvl))
    }

    @action.bound
    get multitap_lvl() {
        return this._multitap_lvl;
    }

    @computed
    setSpeedLvl(value: number) {
        this._speed_lvl = value;
        localStorage.setItem("_speed_lvl", String(this._speed_lvl))
    }

    @action.bound
    get speed_lvl() {
        return this._speed_lvl;
    }

    @computed
    setEnergyLvl(value: number) {
        this._energy_lvl = value;
        localStorage.setItem("_energy_lvl", String(this._energy_lvl))
    }

    @action.bound
    get energy_lvl() {
        return this._energy_lvl;
    }

    @computed
    setTipTopLvl(value: number) {
        this._tiptop = value;
        localStorage.setItem("_tiptop", String(this._tiptop))
    }

    @action.bound
    get tipTop_lvl() {
        return this._tiptop;
    }

    @computed
    setTurbo(value: number) {
        this._turbo = value;
        localStorage.setItem("_turbo", String(this._turbo))
    }

    @action.bound
    get turbo() {
        return this._turbo;
    }

    @computed
    setFullEnergy(value: number) {
        this._full_energy = value;
    }

    @action.bound
    get fullEnergy() {
        return this._full_energy;
    }

    @computed
    setIsRocket(value: boolean) {
        this._is_rocket = value;
    }

    @action.bound
    get is_rocket() {
        return this._is_rocket;
    }

    @computed
    setX(value: number) {
        this._x = value;
        setTimeout(() => {
            this._x = 1
        }, 10000)
    }

    @action.bound
    get x() {
        return this._x;
    }

    @action.bound
    get tap(): number {
        return config.default_coin_on_tap * this._multi_tap_lvl === 0 ? 1 : this._multi_tap_lvl + 1;
    }

    @action.bound
    get multitap_price() {
        let result = 5000;
        for (let i = 0; i < this._multi_tap_lvl; i++) {
            result += result
        }
        return result
    }

    @action.bound
    get speed_price() {
        let result = 40000;
        for (let i = 0; i < this._regeneration_speed_lvl; i++) {
            result += result
        }
        return result
    }

    @action.bound
    get limit_price() {
        let result = 10000;
        for (let i = 0; i < this._energy_limit_lvl; i++) {
            result += result
        }
        return result
    }



    @action.bound
    get speed_energy() {
        let result = 1;
        for (let i = 0; i < this._regeneration_speed_lvl; i++) {
            result += 0.1
        }

        return result;
    }

    @computed
    set_multi_tap_lvl(lvl: number) {
        this._multi_tap_lvl = lvl;
        userService.updateUserMultiTapLVL(lvl).then(() => {})
    }

    @action.bound
    get multi_tap_lvl(): number {
        return this._multi_tap_lvl;
    }

    @computed
    set_regeneration_speed_lvl(lvl: number) {
        this._regeneration_speed_lvl = lvl;
        userService.updateUserRegenerationSpeedLVL(lvl).then(() => {})
    }

    @action.bound
    get regeneration_speed_lvl(): number {
        return this._regeneration_speed_lvl;
    }

    @computed
    set_energy_limit_lvl(lvl: number) {
        this._energy_limit_lvl = lvl;
        userService.updateUserEnergyLimitLVL(lvl).then(() => {})
    }

    @action.bound
    get energy_limit_lvl(): number {
        return this._energy_limit_lvl;
    }

    @computed
    set_tip_top_bot(value: boolean) {
        this._tip_top_bot = value;
        userService.updateUserTipTopBot(value).then(() => {})
    }

    @action.bound
    get tip_top_bot(): boolean {
        return this._tip_top_bot;
    }

    @computed
    set_full_energy_boost(count: number) {
        this._full_energy_boost = count;
        userService.updateUserFullEnergy(count).then(() => {})
    }

    @action.bound
    get full_energy_boost(): number {
        return this._full_energy_boost;
    }

    @computed
    set_turbo_boost(count: number) {
        this._turbo_boost = count;
        userService.updateUserTurbo(count).then(() => {})
    }

    @action.bound
    get turbo_boost(): number {
        return this._turbo_boost;
    }
}

export const gameState = new GameState();