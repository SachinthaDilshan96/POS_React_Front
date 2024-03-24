import BASE_URL from "./ApiConfig.ts";
import axios, {Axios,AxiosInstance} from "axios";


const instance:AxiosInstance = axios.create({
    baseURL:BASE_URL
});

instance.interceptors.request.use(
    (config)=>{

        let token :string | null = document.cookie.split('; ')
            .find(record=>record.startsWith('token=')) || null;
        token = token?.split('=')[1];
        config.headers.Authorization=token;
        return config;
    },
    (error)=>{return Promise.reject(error)}
);

export default instance;
