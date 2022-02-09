import axios from "axios";
import { AES } from "crypto-js";
import { IResponse } from "../model/api";
import { LoginFormValues, LoginResponse } from "../model/login";
import getConfig from "next/config";
import {
  AddStudentRequest,
  AddStudentResponse,
  StudentResponse,
  StudentsRequest,
  StudentsResponse,
  UpdateStudentRequest,
  UpdateStudentResponse,
} from "../model/student";
import { RootPath, SubPath } from "./api-path";

const { publicRuntimeConfig } = getConfig();
const baseURL = `http://cms.chtoma.com/api`;

const axiosInstance = axios.create({
  baseURL,
  responseType: "json",
});

class ApiService {
  public async login({
    password,
    ...rest
  }: LoginFormValues): Promise<IResponse<LoginResponse> | any> {
    const response = await axiosInstance
      .post(baseURL, {
        ...rest,
        password: AES.encrypt(password, "cms").toString(),
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err.message;
      });
    if (response && response.data) {
      return response.data;
    }
    return {};
  }

  // to-do other method : register / logout / forget_password /
}

export const APIService = new ApiService();

export default APIService;
