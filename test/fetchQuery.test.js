const fetchQuery = require("../src/modules/fetchQuery");
const request = require("../src/modules/xhrRequest");

jest.mock("../src/modules/xhrRequest", () =>
	jest.fn(() => Promise.resolve({ id: 1, userId: 1, title: "Test fetch" })),
);

describe("FetchQuery", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("GET request works", async () => {
		const response = await fetchQuery.get("https://example.com/api/data");
		expect(response).toEqual({ id: 1, userId: 1, title: "Test fetch" });
		expect(request).toHaveBeenCalledWith(
			"GET",
			"https://example.com/api/data",
			{},
			null,
		);
	});

	test("POST request with body", async () => {
		const postBody = { title: "test title", body: "test body", userId: 1 };
		const response = await fetchQuery.post(
			"https://example.com/api/post",
			postBody,
		);

		expect(response).toEqual({ id: 1, userId: 1, title: "Test fetch" });
		expect(request).toHaveBeenCalledWith(
			"POST",
			"https://example.com/api/post",
			{},
			postBody,
		);
	});

	test("Cache works for GET requests", async () => {
		const url = "https://example.com/api/cached";
		await fetchQuery.get(url);
		await fetchQuery.get(url);

		expect(request).toHaveBeenCalledTimes(1);
	});

	test("Skip cache for GET requests", async () => {
		const url = "https://example.com/api/no-cache";
		await fetchQuery.get(url, {}, true);
		await fetchQuery.get(url, {}, true);

		expect(request).toHaveBeenCalledTimes(2);
	});

	test("setCacheExpirationTime affects cache validity", async () => {
		fetchQuery.setCacheExpirationTime(100);
		const url = "https://example.com/api/expire";
		await fetchQuery.get(url);

		await new Promise((resolve) => setTimeout(resolve, 150));

		await fetchQuery.get(url);

		expect(request).toHaveBeenCalledTimes(2);
	});

	test("Error handling in request", async () => {
		request.mockImplementationOnce(() =>
			Promise.reject(new Error("Network error")),
		);

		await expect(
			fetchQuery.get("https://example.com/api/error"),
		).rejects.toThrow("Network error");
	});
});
