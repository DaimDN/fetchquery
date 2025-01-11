const request = require("./xhrRequest");

jest.mock("http", () => ({
	request: jest.fn((url, options, callback) => {
		const mockResponse = {
			on: jest.fn((event, handler) => {
				if (event === "data") {
					setTimeout(() => handler('{"data":"mock"}'), 0);
				} else if (event === "end") {
					setTimeout(() => handler(), 0);
				}
				return mockResponse;
			}),
		};
		callback(mockResponse);
		return {
			on: jest.fn(),
			write: jest.fn(),
			end: jest.fn(),
		};
	}),
}));

jest.mock("https", () => ({
	request: jest.fn((url, options, callback) => {
		const mockResponse = {
			on: jest.fn((event, handler) => {
				if (event === "data") {
					setTimeout(() => handler('{"data":"mock"}'), 0);
				} else if (event === "end") {
					setTimeout(() => handler(), 0);
				}
				return mockResponse;
			}),
		};
		callback(mockResponse);
		return {
			on: jest.fn(),
			write: jest.fn(),
			end: jest.fn(),
		};
	}),
}));

describe("xhrRequest", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	test("GET request returns parsed JSON", async () => {
		const response = await request("GET", "http://example.com");

		expect(response).toEqual({ data: "mock" });
		expect(require("http").request).toHaveBeenCalled();
	});

	test("POST request with body", async () => {
		const body = { test: "data" };
		const response = await request("POST", "http://example.com", {}, body);

		expect(response).toEqual({ data: "mock" });
		expect(require("http").request).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ method: "POST" }),
			expect.any(Function),
		);
		expect(
			require("http").request.mock.results[0].value.write,
		).toHaveBeenCalledWith(JSON.stringify(body));
	});

	test("Handles HTTPS requests", async () => {
		await request("GET", "https://example.com");
		expect(require("https").request).toHaveBeenCalled();
	});

	test("Handles JSON parsing error", async () => {
		require("http").request.mockImplementationOnce((url, options, callback) => {
			const mockResponse = {
				on: jest.fn((event, handler) => {
					if (event === "data") {
						setTimeout(() => handler("Not JSON"), 0);
					} else if (event === "end") {
						setTimeout(() => handler(), 0);
					}
					return mockResponse;
				}),
			};
			callback(mockResponse);
			return {
				on: jest.fn(),
				write: jest.fn(),
				end: jest.fn(),
			};
		});

		await expect(request("GET", "http://example.com")).rejects.toThrow(
			"Failed to parse server response",
		);
	});
});
