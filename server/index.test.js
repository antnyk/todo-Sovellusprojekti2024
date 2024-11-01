import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";

describe("GET Tasks", () => {
	// runs the todo.sql file
	before(() => {
		initializeTestDb();
	});

	it("should get all tasks", async () => {
		const response = await fetch("http://localhost:3001/");
		const data = await response.json();
		expect(response.status).to.equal(200);
		expect(data).to.be.an("array").that.is.not.empty;
		expect(data[0]).to.include.all.keys("id", "description");
	});

	it("should not get all tasks. Invalid route", async () => {
		const response = await fetch("http://localhost:3001/ajffgsdfgfdsg");
		expect(response.status).to.equal(404);
	});
});

describe("POST task", () => {
	const email = "hi@mail.com";
	const password = "hi";
	insertTestUser(email, password);
	const token = getToken(email);

	it("Should make a post", async () => {
		const response = await fetch("http://localhost:3001/create", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ description: "a task from test" }),
		});
		const data = await response.json();
		expect(response.status).to.equal(200);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id");
	});

	it("POST task should not be succesful. No description", async () => {
		const response = await fetch("http://localhost:3001/create", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ description: null }),
		});
		const data = await response.json();
		expect(response.status).to.equal(500);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
	});
});

describe("DELETE task", () => {
	const email = "testmail2@mail.com";
	const password = "pass1234";
	insertTestUser(email, password);
	const token = getToken(email);

	it("Should delete a task", async () => {
		const response = await fetch("http://localhost:3001/delete/1", {
			method: "delete",
			headers: {
				Authorization: token,
			},
		});
		const data = await response.json();
		expect(response.status).to.equal(200);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id");
	});

	it("Should not delete a task with SQL injection", async () => {
		const response = await fetch(
			"http://localhost:3001/delete/id=0 or id > 0",
			{
				method: "delete",
				headers: {
					Authorization: token,
				},
			}
		);
		const data = await response.json();
		expect(response.status).to.equal(500);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
	});
});
