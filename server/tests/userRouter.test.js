import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "../helper/test.js";

describe("POST register", () => {
	const email = `testmail_${Date.now()}@mail.com`;
	const password = "pass1234";
	it("should register with valid email and password", async () => {
		const response = await fetch("http://localhost:3001/user/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(201, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id", "email");
	});

	const email2 = `testmail_60${Date.now()}@mail.com`;
	const password2 = "pass";
	it("should not post a user with less than 8 character password", async () => {
		const response = await fetch("http://localhost:3001/user/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email2, password: password2 }),
		});
		const data = await response.json();
		expect(response.status).to.equal(400, data.error);
		expect(data).to.nested.an("object");
		expect(data).to.include.all.keys("error");
	});
});

describe("POST login", () => {
	const email = `testmail_3${Date.now()}@mail.com`;
	const password = "login1234";
	insertTestUser(email, password);
	it("should login with valid email and password", async () => {
		const response = await fetch("http://localhost:3001/user/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(200, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id", "email", "token");
	});
});
