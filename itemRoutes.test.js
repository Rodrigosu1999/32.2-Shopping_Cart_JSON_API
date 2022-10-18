// Test file for shopping cart JSON API

process.env.NODE_ENV = "test";

const app = require("./app");
const items = require("./fakeDB");
const request = require("supertest");

let pickles = {name: "pickles", price: 4.99};

beforeEach(() => {
    items.push(pickles);
});

afterEach(() => {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get a list of the items in the shopping list", async () => {
        const resp = await request(app).get("/items");
        expect(resp.statusCode). toBe(200);
        expect(resp.body).toEqual([{name: "pickles", price: 4.99}]);
    }); 
});

describe("POST /items", () => {
    test("Add a new item to the shopping list", async () => {
        const resp = await request(app).post("/items").send({name: "milk", price: 6.49});
        expect(resp.statusCode). toBe(201);
        expect(resp.body).toEqual({added: {name: "milk", price: 6.49}});
    }) 
    test("Testing if value is missing from the body", async () => {
        const resp = await request(app).post("/items").send({name: "milk"});
        expect(resp.statusCode). toBe(400);
    }); 
});

describe("GET /items/:name", () => {
    test("Get a particular item from the shopping list", async () => {
        const resp = await request(app).get("/items/pickles");
        expect(resp.statusCode). toBe(200);
        expect(resp.body).toEqual({name: "pickles", price: 4.99});
    }); 
    test("Set a particular item not in the shopping list", async () => {
        const resp = await request(app).get("/items/chocolate");
        expect(resp.statusCode). toBe(404);
    }); 
});

describe("PATCH /items/:name", () => {
    test("Get a particular item from the shopping list", async () => {
        const resp = await request(app).patch("/items/pickles").send({name: "pickles", price: 4.49});
        expect(resp.statusCode). toBe(201);
        expect(resp.body).toEqual({updated: {name: "pickles", price: 4.49}});
    }); 
    test("Set a particular item not in the shopping list", async () => {
        const resp = await request(app).patch("/items/chocolate").send({name: "pickles", price: 4.49});
        expect(resp.statusCode). toBe(404);
    }); 
    test("Testing patch if value is missing from the body", async () => {
        const resp = await request(app).patch("/items/pickles").send({name: "pickles"});
        expect(resp.statusCode). toBe(400);
    }); 
});

describe("DELETE /items/:name", () => {
    test("Delete a particular item from the shopping list", async () => {
        const resp = await request(app).delete("/items/pickles").send({name: "pickles"});
        expect(resp.statusCode). toBe(200);
        expect(resp.body).toEqual({message: `pickles deleted`});
    }); 
    test("Delete a particular item not in the shopping list", async () => {
        const resp = await request(app).delete("/items/chocolate").send({name: "pickles"});
        expect(resp.statusCode). toBe(404);
    }); 
    test("Testing delete if value is missing from the body", async () => {
        const resp = await request(app).patch("/items/pickles").send();
        expect(resp.statusCode). toBe(400);
    }); 
});