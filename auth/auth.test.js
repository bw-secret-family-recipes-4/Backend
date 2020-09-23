const request = require("supertest");

const server = require("../api/server");

const db = require("../data/db.config");

describe('GET /', () => {
    it('has process.env.DB_ENV as testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe("auth router", () => {
    beforeEach(async () =>{
        await db("users").truncate();
    })

    describe("POST /register", () => {
        it("should return a status code of 201", async () => {
            const res = await request(server).post("/auth/register").send({
                username:"joseph",
                password:"pass"
            });
            const users = await db("users");
            expect(res.status).toBe(201);
        })
        it("should return the correct data back to us", async () => {
            await request(server).post("/auth/register").send({
                username:"joseph",
                password:"pass"
            })
            .then(res => {
                expect(res.body.data.username).toBe("joseph");
            })
        })
        it("should return json", async () => {
            await request(server)
                .post("/auth/register").send({
                username:"joey",
                password:"pass"
                })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
    describe("POST /login", () => {
        it("should return 200, and json", async done => {
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
                    expect(res.status).toBe(200);
                    expect(res.type).toMatch(/json/i)
                    done();
                });
        })
        it("should contain a message", async () => {
            await request(server)
                .post("/auth/register").send({
                username:"mojoejojo",
                password:"pass"
                })

            await request(server)
                .post("/auth/login").send({
                username:"mojoejojo",
                password:"pass"
                })
                .then(res => {
                    const expected = {message: "welcome to your recipe app!"}
                 
                    expect(res.body).toMatchObject(expected)
                })
        })
       
    })
})