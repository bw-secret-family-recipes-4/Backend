const request = require('supertest');
const server = require('../api/server');
const db = require("../data/db.config");

describe("recipe router", () => {
    afterAll(async () => {
        await db("recipes").truncate();
    })

    let token = '';

    describe("POST /login", () => {
        it("should return 200", async done => {
            await request(server).post("/auth/register").send({
                username:"jo jo",
                password:"pass"
            });
            
            await request(server)
                .post("/auth/login").send({
                    username:"jo jo",
                    password:"pass"
                })
                .then(res => {
                    console.log(res.body)
                    token = res.body.token
                    expect(res.status).toBe(200);
                    done();
                });
        })
    })

describe("POST /recipes", () => {
    it("should return status code 201", async () => {
         await request(server).post("/recipes").send({
            title: 'broccnana',
            user_id: 1
        })
        .set("authorization", token)
        .then(res => {
            expect(res.status).toBe(201)
        })  
    })
    it("should return the data back to us and return json", () => {
        return request(server).post("/recipes").send({
            title: 'broccnana',
            user_id: 1
        })
        .set("authorization", token)
        .then(res => {
            expect(res.body.title).toBe('broccnana')
            expect(res.type).toMatch(/json/i)
        })
    })
})



describe("GET /recipes", () => {
    it("should return status code 200", async () => {
        await request(server).get("/recipes")
        .set("authorization", token)
        .then(res => {
            expect(res.status).toBe(200)
        })
    })
    it("should return all the recipes", async () => {
        await request(server).get("/recipes")
        .set("authorization", token)
        .then(res => {
            expect(res.body).toHaveLength(2)
        })
    })
    it("should return a specific recipe", async () => {
        await request(server).get("/recipes/1")
        .set("authorization", token)
        .then(res => {
            expect(res.body.title).toBe('broccnana')
        })
    })
    it("should return json", async () => {
        await request(server).get("/recipes/1")
        .set("authorization", token)
        .then(res => {
            expect(res.type).toMatch(/json/i)
        })
    })
    it("should return all recipes for a specific user", async () => {
        await request(server).get("/recipes/users/1")
        .set("authorization", token)
        .then(res => {
            expect(res.body).toHaveLength(2)
        })
    })
})

describe("PUT /recipes/:id", () => {
    it("should edit the recipe", async () => {
        await request(server).put("/recipes/1")
        .send({
            title: 'McChicken',
            user_id: 1
        })
        .set("authorization", token)
        .then(res => {
            expect(res.body.title).toBe('McChicken')
        })
    })
    it("should return status code 200", async () => {
        await request(server).put("/recipes/1")
        .send({
            title: 'McChicken',
            user_id: 1
        })
        .set("authorization", token)
        .then(res => {
            expect(res.status).toBe(200)
        })
    })
    it("should return json", async () => {
        await request(server).put("/recipes/1")
        .send({
            title: 'McChicken',
            user_id: 1
        })
        .set("authorization", token)
        .then(res => {
            expect(res.type).toMatch(/json/i)
        })
    })
})
describe("DELETE /recipes/:id", () => {
    it("should delete the specific recipe", async () => {
        await request(server).delete("/recipes/1")
        .set("authorization", token)
        .then(res => {
            expect(res.body).toBe(1)
        })
    })
    it("should return status code 200 and return json", async () => {
        await request(server).delete("/recipes/2")
        .set("authorization", token)
        .then(res => {
            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)
        })
    })
})
})
