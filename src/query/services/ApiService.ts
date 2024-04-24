import axios, { AxiosInstance } from 'axios';

class ApiService {
  private static instance: ApiService;
  private readonly axiosInstance: AxiosInstance;
  private _isTokenSet: boolean = false;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://sh-api-7c55ebb3525c.herokuapp.com/api',
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public setAuthToken(token: string): void {
    console.log(token);
    this.axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    this._isTokenSet = true;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public get isTokenSet(): boolean {
    return this._isTokenSet;
  }
}

export default ApiService;
