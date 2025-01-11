const request = require("./xhrRequest");

class FetchQuery {
	constructor() {
		this.cache = {};
		this.cacheExpirationTime = 60 * 60 * 1000;
		this.pendingRequests = 0;
	}

	setCacheExpirationTime(time) {
		this.cacheExpirationTime = time;
	}

	async request(method, url, body = null, headers = {}, skipCache = false) {
		const cacheKey = this.generateCacheKey(url, method, body);

		if (
			!skipCache &&
			this.getCacheForKey(cacheKey) &&
			this.isCacheValid(cacheKey)
		) {
			return this.getCacheForKey(cacheKey);
		}

		this.pendingRequests++;

		try {
			const data = await request(method, url, headers, body);
			this.setCacheForKey(cacheKey, data);
			return data;
		} catch (error) {
			console.error("Error in request:", error);
			throw error;
		} finally {
			this.pendingRequests--;
			this.checkAndExit();
		}
	}

	async get(url, headers = {}, skipCache = false) {
		return this.request("GET", url, null, headers, skipCache);
	}

	async post(url, body, headers = {}, skipCache = false) {
		return this.request("POST", url, body, headers, skipCache);
	}

	async put(url, body, headers = {}, skipCache = false) {
		return this.request("PUT", url, body, headers, skipCache);
	}

	async patch(url, body, headers = {}, skipCache = false) {
		return this.request("PATCH", url, body, headers, skipCache);
	}

	async delete(url, body = null, headers = {}, skipCache = false) {
		return this.request("DELETE", url, body, headers, skipCache);
	}

	generateCacheKey(url, method, body) {
		return `${method}-${url}-${JSON.stringify(body)}`;
	}

	getCacheForKey(key) {
		return this.cache[key] ? this.cache[key].data : null;
	}

	setCacheForKey(key, data) {
		this.cache[key] = { data, timestamp: Date.now() };
		setTimeout(() => delete this.cache[key], this.cacheExpirationTime);
	}

	isCacheValid(key) {
		return (
			this.cache[key] &&
			Date.now() - this.cache[key].timestamp < this.cacheExpirationTime
		);
	}

	checkAndExit() {
		if (this.pendingRequests === 0) {
			this.exitIfNoPendingRequests();
		}
	}

	exitIfNoPendingRequests() {
		if (this.pendingRequests === 0) {
			// Commented out process.exit(0) for library use
			// process.exit(0);
		}
	}
}

module.exports = new FetchQuery();
