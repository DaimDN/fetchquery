declare module 'fetchquery' {
  interface Headers {
    [key: string]: string
  }

  interface FetchQueryOptions {
    skipCache?: boolean
  }

  const fetchQuery: {
    get<T = any>(
      url: string,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    post<T = any>(
      url: string,
      data?: any,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    put<T = any>(
      url: string,
      data?: any,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    patch<T = any>(
      url: string,
      data?: any,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    delete<T = any>(
      url: string,
      data?: any,
      headers?: Headers,
      options?: FetchQueryOptions,
    ): Promise<T>
    setCacheExpirationTime(ms: number): void
  }

  export default fetchQuery
}
