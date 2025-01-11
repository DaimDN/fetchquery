/**
 * The 'fetchquery' module provides a simplified interface for making HTTP requests
 * with built-in caching, customizable headers, and support for standard HTTP methods.
 */
declare module 'fetchquery' {
  /**
   * Represents a dictionary of HTTP request headers.
   * Each key-value pair maps a header name to its corresponding value.
   * Example: { 'Content-Type': 'application/json' }
   */
  export interface RequestHeaders {
    [key: string]: string
  }

  /**
   * Configuration options for an HTTP request.
   */
  export interface RequestConfig {
    /**
     * Transitional options for JSON parsing and error clarification.
     */
    transitional: {
      /**
       * If true, prevents errors when JSON parsing fails.
       */
      silentJSONParsing: boolean
      /**
       * If true, forces the response data to be parsed as JSON.
       */
      forcedJSONParsing: boolean
      /**
       * If true, provides more detailed timeout error messages.
       */
      clarifyTimeoutError: boolean
    }

    /**
     * Specifies the request adapter(s) for handling the HTTP request.
     * Could be 'xhr', 'http', or custom adapters.
     */
    adapter: string[]

    /**
     * Functions that transform the request data before it is sent.
     */
    transformRequest: ((data: any) => any)[]

    /**
     * Functions that transform the response data after it is received.
     */
    transformResponse: ((data: any) => any)[]

    /**
     * The maximum duration (in milliseconds) before a request times out.
     */
    timeout: number

    /**
     * The name of the cookie used for XSRF protection.
     */
    xsrfCookieName: string

    /**
     * The name of the HTTP header used for XSRF protection.
     */
    xsrfHeaderName: string

    /**
     * The maximum allowed size of the response content in bytes.
     */
    maxContentLength: number

    /**
     * The maximum allowed size of the request body in bytes.
     */
    maxBodyLength: number

    /**
     * Function to validate HTTP response status codes.
     * Returns true for acceptable status codes.
     */
    validateStatus: ((status: number) => boolean) | null

    /**
     * Custom headers to include in the request.
     */
    headers: RequestHeaders

    /**
     * HTTP method to use (GET, POST, PUT, etc.).
     */
    method: string

    /**
     * The URL for the HTTP request.
     */
    url: string

    /**
     * Data payload for POST, PUT, PATCH requests.
     */
    data: any
  }

  /**
   * Represents the structure of an HTTP response.
   * Contains metadata about the response and the data returned.
   */
  export interface Response<T = any> {
    /** HTTP status code (e.g., 200, 404). */
    status: number
    /** HTTP status text (e.g., "OK", "Not Found"). */
    statusText: string
    /** HTTP response headers. */
    headers: Record<string, string>
    /** Original request configuration. */
    config: RequestConfig
    /** Raw request object (platform-specific). */
    request: any
    /** Response data payload. */
    data: T
  }

  /**
   * Core FetchQuery interface providing HTTP request methods and caching.
   */
  export interface FetchQuery {
    /**
     * Internal cache storing responses with timestamps.
     * Used for caching GET requests.
     */
    cache: Record<string, { data: any; timestamp: number }>

    /**
     * Time (in milliseconds) before cached responses expire.
     */
    cacheExpirationTime: number

    /**
     * Number of ongoing HTTP requests.
     */
    pendingRequests: number

    /**
     * Sets the cache expiration duration.
     * @param time Cache expiration time in milliseconds.
     */
    setCacheExpirationTime(time: number): void

    /**
     * Generic request method supporting all HTTP verbs.
     * @param method HTTP method (GET, POST, etc.).
     * @param url Target URL for the request.
     * @param body Optional request body.
     * @param headers Optional custom headers.
     * @param skipCache If true, bypasses the cache.
     */
    request<T = any>(
      method: string,
      url: string,
      body?: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>

    /**
     * Sends a GET request.
     */
    get<T = any>(
      url: string,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>

    /**
     * Sends a POST request with a request body.
     */
    post<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>

    /**
     * Sends a PUT request for updating resources.
     */
    put<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>

    /**
     * Sends a PATCH request for partial updates.
     */
    patch<T = any>(
      url: string,
      body: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>

    /**
     * Sends a DELETE request to remove resources.
     */
    delete<T = any>(
      url: string,
      body?: any,
      headers?: RequestHeaders,
      skipCache?: boolean,
    ): Promise<Response<T>>
  }

  /**
   * Singleton instance of the FetchQuery interface.
   */
  const fetchQuery: FetchQuery
  export default fetchQuery
}
