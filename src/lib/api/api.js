import axios from "axios";


class Api {
    #url = '';
    #axiosInstance = null;

    constructor(url) {
        this.#url = url;
        this.#axiosInstance = axios.create();
        this.#axiosInstance.defaults.maxRedirects = 10;
    }

    async GetCodeBook() {
        const response = await this.#axiosInstance.get("/codebook.json");
        return response.data;
    }

    async GetUnlabeledSample(username) {
        
        const response = await this.#axiosInstance.post(this.#url + `?what=tus&who=${username}`);
        return response.data;
    }

    async GetUnlabeled(username) {
        
        const response = await this.#axiosInstance.post(this.#url + `?what=tu&who=${username}`);
        return response.data;
    }

    async Label(username,id,label) {
        
        const response = await this.#axiosInstance.post(this.#url + `?what=label&who=${username}&whom=${id}&withwhat=${label}`);
        return response.data;
    }
}

let api;

const ConfigureAPI = (url) => {
    api = new Api(url);
}

export { api, ConfigureAPI };

