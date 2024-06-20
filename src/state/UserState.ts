import {action, computed, makeAutoObservable} from "mobx";

class UserState {
    private _user_id: string | number = "";
    private _first_name: string = "";
    private _last_name: string = "";
    private _last_visit: Date = new Date();
    private _end_session: Date = new Date();

    constructor() {
        makeAutoObservable(this)
    }

    @action.bound
    get first_name() {
        return this._first_name;
    }

    @computed
    setFirstName(first_name: string) {
        this._first_name = first_name;
    }

    @action.bound
    get last_name() {
        return this._last_name;
    }

    @computed
    setLastName(last_name: string) {
        this._last_name = last_name;
    }

    @action.bound
    get user_id() {
        return this._user_id;
    }

    @computed
    setUserId(user_id: string | number) {
        this._user_id = user_id;
    }

    @action.bound
    get last_visit() {
        return this._last_visit;
    }

    @computed
    setLastVisit(last_visit: Date) {
        this._last_visit = last_visit;
    }

    @action.bound
    get end_session() {
        return this._end_session;
    }

    @computed
    setEndSession(end_session: Date) {
        this._end_session = end_session;
    }
}

export const userState = new UserState();
