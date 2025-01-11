const http = require('http')
const https = require('https')
const zlib = require('zlib')

function request(method, url, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const isHttps = urlObj.protocol === 'https:'
    const client = isHttps ? https : http

    // Merge default headers with provided headers
    const defaultHeaders = {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'fetchquery/1.0',
      'Accept-Encoding': 'gzip, deflate, br',
    }

    const finalHeaders = { ...defaultHeaders, ...headers }

    const options = {
      method,
      headers: finalHeaders,
    }

    const req = client.request(url, options, (res) => {
      const encoding = res.headers['content-encoding']
      let buffer = []

      // Create appropriate stream based on encoding
      let stream = res
      if (encoding === 'br') {
        stream = res.pipe(zlib.createBrotliDecompress())
      } else if (encoding === 'gzip') {
        stream = res.pipe(zlib.createGunzip())
      } else if (encoding === 'deflate') {
        stream = res.pipe(zlib.createInflate())
      }

      // Store the complete response object
      const responseObj = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: {
          transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false,
          },
          adapter: ['xhr', 'http', 'fetch'],
          transformRequest: [null],
          transformResponse: [null],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
          validateStatus: null,
          headers: finalHeaders,
          method,
          url,
          data: body,
        },
        request: req,
      }

      stream.on('data', (chunk) => {
        buffer.push(chunk)
      })

      stream.on('end', () => {
        try {
          const rawData = Buffer.concat(buffer).toString()
          responseObj.data = JSON.parse(rawData)
          resolve(responseObj)
        } catch (error) {
          console.error('Raw response:', Buffer.concat(buffer).toString())
          console.error('Failed to parse JSON:', error)
          reject(new Error('Failed to parse server response'))
        }
      })

      stream.on('error', (error) => {
        reject(error)
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    if (body) {
      req.write(typeof body === 'object' ? JSON.stringify(body) : body)
    }

    req.end()
  })
}

module.exports = request
