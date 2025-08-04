import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export abstract class APIClient {
  protected baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (
          !config.headers["Content-Type"] &&
          !(config.data instanceof FormData)
        ) {
          config.headers.set("Content-Type", "application/json");
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  get<TResponse = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.get<TResponse>(url, config);
  }

  post<TRequest = unknown, TResponse = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.post<TResponse>(url, data, config);
  }

  put<TRequest = unknown, TResponse = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.put<TResponse>(url, data, config);
  }

  patch<TRequest = unknown, TResponse = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.patch<TResponse>(url, data, config);
  }

  delete<TRequest = unknown, TResponse = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.delete<TResponse>(url, { ...config, data });
  }

  request<TRequest = unknown, TResponse = unknown>(
    config: AxiosRequestConfig<TRequest>,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.request<TResponse>(config);
  }
}
