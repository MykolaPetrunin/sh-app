import { Axios, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

interface ApiRes<T> {
  data: T;
  status: number;
  authorization?: string;
}

interface PostRequestParams<BodyDataType = unknown> {
  axios: Axios;
  url: string;
  body?: BodyDataType;
  headers?: Partial<RawAxiosRequestHeaders>;
}

export type ApiMutation = <Response, RequestParams = undefined>({ axios, url, body }: PostRequestParams<RequestParams>) => Promise<ApiRes<Response>>;

type ApiDeleteMutation = <Response>({ axios, url }: PostRequestParams) => Promise<ApiRes<Response>>;

interface ApiType {
  get: <T, Body = undefined>(axios: Axios, url: string, params?: Body) => Promise<ApiRes<T>>;
  post: ApiMutation;
  remove: ApiDeleteMutation;
  patch: ApiMutation;
  put: ApiMutation;
}

const Api: ApiType = {
  get: async (axios, url, params) => {
    const { data, status } = await axios.get<ApiRes<Response>, AxiosResponse>(url, {
      ...(params ? { params } : {}),
    });

    return {
      data,
      status,
    };
  },
  post: async ({ axios, url, body }) => {
    const {
      data,
      status,
      headers: { authorization },
    } = await axios.post<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
      authorization,
    };
  },
  remove: async ({ axios, url, headers, body }) => {
    const { data, status } = await axios.delete<ApiRes<Response>, AxiosResponse>(url, {
      headers,
      data: body,
    });
    return {
      data,
      status,
    };
  },
  patch: async ({ axios, url, body }) => {
    const { data, status } = await axios.patch<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
    };
  },
  put: async ({ axios, url, body }) => {
    const { data, status } = await axios.put<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
    };
  },
};

export default Api;
