const http = require("http");
const https = require("https");

let request;

if (typeof process === "object" && process.versions && process.versions.node) {
	request = function (method, url, headers = {}, body = null) {
		return new Promise((resolve, reject) => {
			const urlObj = new URL(url);
			const isHttps = urlObj.protocol === "https:";
			const client = isHttps ? https : http;

			const options = {
				method,
				headers: headers || {},
			};

			const req = client.request(url, options, (res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					try {
						resolve(JSON.parse(data));
					} catch (error) {
						console.error("Failed to parse JSON:", error);
						reject(new Error("Failed to parse server response"));
					}
				});
			});

			req.on("error", (e) => {
				reject(e);
			});

			if (body) {
				// Check if body can be stringified
				req.write(typeof body === "object" ? JSON.stringify(body) : body);
			}

			req.end();
		});
	};
} else {
	throw new Error("xhrRequest does not support this environment");
}

module.exports = request;
