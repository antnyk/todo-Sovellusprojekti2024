import { expect } from "chai";

describe("GET Tasks", () => {
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
	it("Should make a post", async () => {
		const response = await fetch("http://localhost:3001/create", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
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
	it("Should delete a task", async () => {
		const response = await fetch("http://localhost:3001/delete/1", {
			method: "delete",
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
			}
		);
		const data = await response.json();
		expect(response.status).to.equal(500);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
	});
});