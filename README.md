# fetchQuery

**fetchQuery** is a lightweight JavaScript library designed to simplify and optimize HTTP requests. It is ideal for web applications and API integrations, offering asynchronous operations and built-in caching for enhanced performance.

## Key Features

- **Asynchronous Operations:** Utilizes modern `async/await` syntax for non-blocking HTTP requests.
- **Caching:** Automatically caches GET request responses to reduce network calls and speed up subsequent requests.
- **Custom Headers and Body:** Supports custom headers and request bodies across all HTTP methods.
- **Minimal Dependencies:** Designed to be lightweight with minimal external dependencies.
- **Intuitive API:** Familiar and easy-to-use interface, inspired by popular HTTP clients like Axios.
- **Browser Compatible:** Works seamlessly across all modern browsers supporting the Fetch API.

## Installation

Install **fetchQuery** using your preferred package manager:

```bash
npm install fetchquery
```

## Usage

### Basic Asynchronous GET Request

```javascript
import fetchQuery from 'fetchquery'

async function fetchData() {
  try {
    const data = await fetchQuery.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
```

### GET Request with Custom Headers

```javascript
const headers = {
  Authorization: 'Bearer your-token',
  'Custom-Header': 'value',
}

async function fetchDataWithHeaders() {
  try {
    const data = await fetchQuery.get(
      'https://jsonplaceholder.typicode.com/todos/1',
      headers,
    )
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

fetchDataWithHeaders()
```

### POST Request with Body and Headers

```javascript
const postData = {
  title: 'New Todo',
  completed: false,
}

const headers = {
  Authorization: 'Bearer your-token',
  'Content-Type': 'application/json',
}

async function createTodo() {
  try {
    const data = await fetchQuery.post(
      'https://jsonplaceholder.typicode.com/todos',
      postData,
      headers,
    )
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

createTodo()
```

### Caching GET Requests

**fetchQuery** automatically caches GET responses to avoid redundant network calls:

```javascript
async function fetchDataWithCache() {
  try {
    const data1 = await fetchQuery.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    console.log('First Fetch:', data1)

    // This will use the cached data
    const data2 = await fetchQuery.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    console.log('From Cache:', data2)
  } catch (error) {
    console.error('Error:', error)
  }
}

fetchDataWithCache()
```

### Custom Cache Expiration

Modify the default cache expiration time (default is 1 hour):

```javascript
// Set cache expiration time in milliseconds
fetchQuery.setCacheExpirationTime(30 * 60 * 1000) // 30 minutes
```

## API Reference

### Methods

- **`get(url, headers)`** - Sends a GET request.

  - `url`: The request URL.
  - `headers`: Optional custom headers.

- **`post(url, data, headers)`** - Sends a POST request.

  - `url`: The request URL.
  - `data`: Request body.
  - `headers`: Optional custom headers.

- **`put(url, data, headers)`** - Sends a PUT request.
- **`patch(url, data, headers)`** - Sends a PATCH request.
- **`delete(url, data, headers)`** - Sends a DELETE request.

### Cache Configuration

- **Cache Expiration:** Default is 1 hour. Configurable via `setCacheExpirationTime()`.
- **Bypassing Cache:** Pass `{ skipCache: true }` to force a new request.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please follow our contributing guidelines and coding standards.

## License

**fetchQuery** is licensed under the [MIT License](LICENSE).

## Credits

Inspired by the Fetch API and libraries like Axios to deliver a seamless HTTP request experience.
