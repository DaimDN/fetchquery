declare module 'fetchquery' {
  interface Headers {
    [key: string]: string
  }

  interface FetchQueryOptions {
    skipCache?: boolean
  }

  const fetchQuery: {
    get<T>(
      url: string,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    post<T>(url: string, data: any, headers?: Headers): Promise<T>
    put<T>(url: string, data: any, headers?: Headers): Promise<T>
    patch<T>(url: string, data: any, headers?: Headers): Promise<T>
    delete<T>(url: string, data?: any, headers?: Headers): Promise<T>
    setCacheExpirationTime(milliseconds: number): void
  }

  export default fetchQuery
}
