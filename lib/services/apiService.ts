import axios from 'axios'
import { AES } from 'crypto-js';
import { IResponse } from '../model/api';
import { LoginFormValues, LoginResponse } from '../model/login';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseURL = `http://localhost:3000/api`;

const axiosInstance = axios.create({
    baseURL,
    responseType:'json'
});

class ApiService {
    public async login({password,...rest}:LoginFormValues):Promise<IResponse<LoginResponse> | any>{
        const response = await axiosInstance.post((baseURL),{
                 ...rest,
                password:AES.encrypt(password,'cms').toString()
                })
                .then((response) => response.data)
                .catch((err) =>{
                    throw err.message;
                })
        if (response && response.data){
            return response.data ;
        }
        return {};
    }
    // to-do other method : register / logout / forget_password /

}

export const APIService = new ApiService()

export default APIService ;