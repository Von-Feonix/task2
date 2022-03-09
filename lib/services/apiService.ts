import axios, { AxiosError } from "axios";
import { AES } from "crypto-js";
import { IResponse, QueryParams } from "../model/api";
import { LoginRequest, LoginResponse } from "../model/login";
import {
  AddStudentRequest,
  AddStudentResponse,
  StudentResponse,
  StudentsRequest,
  StudentsResponse,
  UpdateStudentRequest,
  UpdateStudentResponse,
} from "../model/student";
import { RootPath } from "./api-path";
import { storage } from "./storage";
import { message } from "antd";
import { CourseRequest, CourseResponse } from "../model/course";

const baseURL = "http://cms.chtoma.com/api";
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: "json",
});

axiosInstance.interceptors.request.use((config) => {
  console.log(config);
  if (!config.url.includes("login")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + storage?.token,
      },
    };
  }
  return config;
});
type IPath = (string | number)[] | string | number;

class BaseApiService {
  protected async get<T>(path: IPath, params?: QueryParams): Promise<T> {
    path = this.getPath(path);
    path = !!params
      ? `${path}?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : path;

    return axiosInstance
      .get(path)
      .then((res) => res.data)
      .catch((err) => this.errorHandler(err));
  }
  protected async post<T>(path: IPath, params: object): Promise<T> {
    return axiosInstance
      .post(this.getPath(path), params)
      .then((res) => res.data)
      .catch(this.errorHandler);
  }

  protected async put<T>(path: IPath, params: object): Promise<T> {
    return axiosInstance
      .put(this.getPath(path), params)
      .then((res) => res.data)
      .catch(this.errorHandler);
  }

  protected isError(code: number): boolean {
    return !(
      code.toString().startsWith("2") || code.toString().startsWith("3")
    );
  }

  protected showMessage =
    (isSuccessDisplay = false) =>
    (res: IResponse): IResponse => {
      const { code, msg } = res;
      const isError = this.isError(code);

      if (isError) {
        message.error(msg);
      }

      if (isSuccessDisplay && !isError) {
        message.success(msg);
      }

      return res;
    };

  private errorHandler(err: AxiosError<IResponse>): IResponse {
    const msg = err.response?.data.msg ?? "unknown error";
    const code = err.response?.status ?? -1;

    if (!err.response) {
      console.error(
        "%c [ err ]-149",
        "font-size:13px; background:pink; color:#bf2c9f;",
        err
      );
    }

    return { msg, code };
  }

  private getPath(path: IPath): string {
    return !Array.isArray(path) ? String(path) : path.join("/");
  }
}

class ApiService extends BaseApiService {
  login({
    password,
    ...rest
  }: LoginRequest): Promise<IResponse<LoginResponse>> {
    return this.post<IResponse<LoginResponse>>(RootPath.login, {
      ...rest,
      password: AES.encrypt(password, "cms").toString(),
    }).then(this.showMessage());
  }

  getStudents(req?: StudentsRequest): Promise<IResponse<StudentsResponse>> {
    return this.get<IResponse<StudentsResponse>>(
      RootPath.students,
      req as unknown as QueryParams
    );
  }

  addStudent(req: AddStudentRequest): Promise<IResponse<AddStudentResponse>> {
    return this.post([RootPath.students], req).then(this.showMessage(true));
  }

  updateStudent(
    req: UpdateStudentRequest
  ): Promise<IResponse<UpdateStudentResponse>> {
    return this.put([RootPath.students], req).then(this.showMessage(true));
  }

  getStudentById(id: number): Promise<IResponse<StudentResponse>> {
    return this.get([RootPath.students, id]).then(this.showMessage());
  }

  getCourses<T = CourseResponse>(req: Partial<CourseRequest>): Promise<IResponse<T>> {
    return this.get(RootPath.courses, req).then(this.showMessage());
  }
  
}

export const APIService = new ApiService();

export default APIService;
