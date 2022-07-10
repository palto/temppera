import axios from 'axios';
import tough from 'tough-cookie';
import { APIResponse } from './APIResponse.js';
import { FindProjectRow, FindResponse } from './FindResponse.js';
import { APIError } from './APIError.js';

const jarCurrentUrl = 'https://dummy.com';
const findProjectQuery = {"table":"joborder","db":"","vcols":["Id","JobNo_","JobName","StartText","SellToName","ShiptoAddress","ShiptoCity"],"scols":["Id","JobNo_","JobName","StartText","SellToName","ShiptoAddress","ShiptoCity"],"dcols":[],"caption":"","maxrows":50,"limit":0,"where":"Status!='6' AND Status!='8'","mfunc":[],"extra":{},"autofind":"","multi":0,"type":""};

export class TempperaSDK {
    private axios: axios.AxiosInstance
    private jar: tough.CookieJar
    constructor(readonly options: SDKOptions) {
        this.axios = axios.default.create({
            baseURL: options.baseUrl,
            withCredentials: true,
        })
        this.jar = new tough.CookieJar();
        this.axios.interceptors.response.use(resp => {
            resp.headers['set-cookie']?.forEach(cookiestr => {
                this.jar.setCookieSync(cookiestr, jarCurrentUrl)
            })
            return resp;
        })
        this.axios.interceptors.response.use(resp => {
            const body = resp.data;
            if(typeof body === 'string') {
                return resp;
            }

            if(!('Error' in body)) {
                return resp;
            }
            const apiResponse = body as APIResponse;
            if(apiResponse.Error === 0) {
                return resp;
            }

            return Promise.reject(new APIError("API request failed", apiResponse));
        })
        this.axios.interceptors.request.use(config => {
            const headers = config.headers;
            if(!headers) {
                return config;
            }
            headers["Cookie"] = this.jar.getCookieStringSync(jarCurrentUrl);
            return config;
        })
    }

    async login(): Promise<void> {
        try {
            await this.axios.postForm<APIResponse>("/login.php", {
                userid: this.options.username,
                password: this.options.password,
                btnlogin: "Kirjaudu",
                LoginType: 2,
                DelSes: 0
            });
        } catch (error) {
            if(error instanceof APIError) {
                if(error.apiResponse.Error === 1 && error.apiResponse.ErrorMsg === "CONFIRM") {
                    return;
                }
            }
            throw error
        }

        return;
    }

    async logout(): Promise<void> {
        await this.axios.get("/mobi/logout.php");
        return;
    }

    async findProjects(search: string): Promise<FindResponse<FindProjectRow>> {
        const response = await this.axios.postForm<FindResponse<FindProjectRow>>("/apps/yleiset/ajax_find.php", {
            Search: search,
            Action: "Find",
            FName: "cls_suggest",
            Mobi: "1",
            Admin: "0",
            Obj: JSON.stringify(findProjectQuery)
        })

        return response.data;
    }
}

export interface SDKOptions {
    baseUrl: string
    username: string
    password: string
}
