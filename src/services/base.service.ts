import axios, {Axios} from "axios";
import config from "../config.ts";

class BaseService {
    private readonly _axios: Axios

    constructor() {
        this._axios = axios;
        this._axios.defaults.baseURL = config.base_url
    }

    get axios() {
        return this._axios
    }
}

export default BaseService;