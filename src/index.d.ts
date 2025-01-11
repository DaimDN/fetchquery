// types/index.d.ts
declare module 'fetchquery' {
  export interface RequestHeaders {
    [key: string]: string
  }

  export interface RequestConfig {
    transitional: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
    adapter: string[]
    transformRequest: ((data: any) => any)[]
    transformResponse: ((data: any) => any)[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    validateStatus: ((status: number) => boolean) | null
    headers: RequestHeaders
    method: string
    url: string
    data: any
  }

  export interface Response<T = any> {
    status: number
    statusText: string
    headers: Record<string, string>
    config: RequestConfig
    request: any
    data: T
  }

  export interface FetchQuery {
    cache: Record<string, { data: any; timestamp: number }>
    cacheExpirationTime: number
    pendingRequests: number

    setCacheExpirationTime(time: number): void
    request<T = any>(
      method: string,
      url: string,
      body?: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
    get<T = any>(
      url: string,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
    post<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
    put<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
    patch<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
    delete<T = any>(
      url: string,
      body?: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
  }

  const fetchQuery: FetchQuery
  export default fetchQuery
}
