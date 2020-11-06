export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data: any;
  params: any;
}
