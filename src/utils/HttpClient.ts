import { ACCESS_TOKEN } from '@/constant';
import type { RequestMethod } from 'umi-request';
import umiRequest from 'umi-request';

export function createAuthorizationHeader(access_token?: string): Record<string, any> {
  if (access_token)
    return {
      Authorization: `Bearer ${access_token}`,
    };

  const accessTokenFromStorage = localStorage.getItem(ACCESS_TOKEN);
  if (accessTokenFromStorage)
    return {
      Authorization: `Bearer ${accessTokenFromStorage}`,
    };

  return {};
}

class HttpClient {
  private static instance: HttpClient;
  private request: RequestMethod;
  private constructor() {
    this.request = umiRequest;
    this.request.interceptors.request.use((url: string, options: any) => {
      const { headers } = options;
      const authorizationHeader = createAuthorizationHeader();
      return {
        url,
        options: {
          ...options,
          headers: { ...headers, ...authorizationHeader, 'Access-Control-Allow-Origin': '*' },
        },
      };
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }

  public get<R>(
    url: string = '',
    params?: Record<string, unknown> | URLSearchParams | undefined,
  ): Promise<R> {
    return HttpClient.instance.request.get<R>(url, { params });
  }

  public post<P, R>(url: string = '', data: P | Record<string, unknown>): Promise<R> {
    return HttpClient.instance.request.post<R>(url, { data });
  }

  public put<P, R>(url: string = '', data: P | Record<string, unknown>): Promise<R> {
    return HttpClient.instance.request.put<R>(url, { data });
  }

  public patch<P, R>(url: string = '', data: P | Record<string, unknown>): Promise<R> {
    return HttpClient.instance.request.patch<R>(url, { data });
  }

  public delete<R>(url: string = ''): Promise<R> {
    return HttpClient.instance.request.delete<R>(url);
  }
}

export default HttpClient.getInstance();
