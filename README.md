# fetchQuery

`fetchQuery` is a lightweight, fast, and flexible JavaScript library designed to
simplify making HTTP requests. It supports both **synchronous** and
**asynchronous** operations and provides a built-in **caching mechanism** to
optimize performance. Whether you're building web applications or integrating
with APIs, `fetchQuery` makes it easy to send and manage HTTP requests.

## Key Features

- **Synchronous and Asynchronous Support**: Choose between synchronous or
  asynchronous request handling.
- **Caching**: Automatically caches GET request responses to avoid redundant
  network calls and improve performance.
- **Custom Headers and Request Body**: Easily send custom headers and request
  bodies with your HTTP requests.
- **Minimal Dependencies**: Lightweight and fast, with minimal external
  dependencies.
- **Simple API**: Clean and intuitive API inspired by popular libraries like
  Axios.
- **Cross-Browser Compatibility**: Works across all major browsers, including
  modern browsers that support `fetch`.

## Installation

You can install `fetchQuery` using npm or yarn:

### npm

```bash
npm install fetch-query
```

## Usage

### Basic Example (Asynchronous)

You can make asynchronous requests using async/await:

```js
import fetchQuery from "fetch-query";

// GET request
async function fetchData() {
	try {
		const data = await fetchQuery.get(
			"https://jsonplaceholder.typicode.com/todos/1",
		);
		console.log(data);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

fetchData();
```

### Basic Example (Synchronous)

You can also perform synchronous requests (blocking) if needed:

```js
import fetchQuery from "fetch-query";

// GET request (synchronous)
try {
	const data = fetchQuery.get("https://jsonplaceholder.typicode.com/todos/1");
	console.log(data);
} catch (error) {
	console.error("Error fetching data:", error);
}
```

### GET Request with Headers

You can easily pass custom headers in your requests:

```js
const headers = {
	Authorization: "Bearer your-token",
	"Custom-Header": "value",
};

async function fetchDataWithHeaders() {
	try {
		const data = await fetchQuery.get(
			"https://jsonplaceholder.typicode.com/todos/1",
			headers,
		);
		console.log(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

fetchDataWithHeaders();
```

### POST Request with Body and Headers

For `POST` requests, you can send both a body and custom headers:

```js
const postData = {
	title: "New Todo",
	completed: false,
};

const headers = {
	Authorization: "Bearer your-token",
	"Content-Type": "application/json",
};

async function createTodo() {
	try {
		const data = await fetchQuery.post(
			"https://jsonplaceholder.typicode.com/todos",
			postData,
			headers,
		);
		console.log(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

createTodo();
```

### Caching in GET Requests

`fetchQuery` automatically caches the results of `GET` requests and reuses them
for identical requests to avoid redundant network calls.

```js
async function fetchDataWithCache() {
	try {
		const data1 = await fetchQuery.get(
			"https://jsonplaceholder.typicode.com/todos/1",
		);
		console.log("First Fetch:", data1);

		// Second call will return cached data
		const data2 = await fetchQuery.get(
			"https://jsonplaceholder.typicode.com/todos/1",
		);
		console.log("From Cache:", data2);
	} catch (error) {
		console.error("Error:", error);
	}
}

fetchDataWithCache();
```

### Custom Cache Expiration

By default, the cache expires after 1 hour. You can adjust this by changing the
`cacheExpirationTime` in the code.

```js
const cacheExpirationTime = 60 * 60 * 1000; // 1 hour by default
```

## API Reference

### Methods

- **`get(url, headers)`**: Sends a GET request to the specified URL with
  optional headers. Returns the response data.
- **`post(url, data, headers)`**: Sends a POST request to the specified URL with
  the provided data and optional headers. Returns the response data.
- **`put(url, data, headers)`**: Sends a PUT request to the specified URL with
  the provided data and optional headers. Returns the response data.
- **`delete(url, headers)`**: Sends a DELETE request to the specified URL with
  optional headers. Returns the response data.

### Parameters

- **url**: The URL to send the request to.
- **data**: The data to send with the request (for POST and PUT requests).
- **headers**: Optional headers to include with the request.

### Example of Request with Custom Headers

```js
const customHeaders = {
	Authorization: "Bearer token",
	"Content-Type": "application/json",
};

fetchQuery
	.get("https://jsonplaceholder.typicode.com/todos/1", customHeaders)
	.then((response) => console.log(response))
	.catch((error) => console.error(error));
```

### Cache Configuration

- **Cache Expiration**: By default, GET requests are cached for **1 hour**. You
  can modify the expiration time if needed.
- **Disabling Cache**: You can disable cache for certain requests by passing a
  specific flag in the request options.

## Contributing

We welcome contributions! If you find a bug or would like to suggest a new
feature, please open an issue or create a pull request. Please follow the
standard GitHub practices for contributing, including forking the repo and
creating a separate branch for your changes.

### Steps to contribute:

1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes.
5. Commit your changes with clear and descriptive commit messages.
6. Push your changes to your fork.
7. Submit a pull request for review.

## License

`fetchQuery` is licensed under the MIT License. See the [LICENSE](LICENSE) file
for more details.

## Credits

- Based on the
  [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and
  inspired by the `axios` library.

---

Feel free to modify or expand the README as your project grows, but this should
give a solid foundation for anyone interested in using or contributing to
`fetchQuery`.
