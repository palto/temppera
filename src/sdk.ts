import axios from 'axios';

export class TempperaSDK {
    private axios: axios.AxiosInstance
    constructor(options: SDKOptions) {
        this.axios = axios.default.create({
            baseURL: options.baseUrl
        })
    }
    async getData(): Promise<string> {
        const response = await this.axios.get<string>("/");
        return response.data
    }
}

export interface SDKOptions {
    baseUrl: string
    username: string
    password: string
}
