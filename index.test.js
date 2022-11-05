import request from 'supertest'
import app from './index.js'

describe("POST to /persons", () => {

    describe("given username and height", () => {
        test("Test if the username or height is valid", async () => {
            const response = await request(app).post("/persons").send({
                name: "Mario",
                height: "180"
            })
            expect(response.statusCode).toBe(200)
        })
        // Check if user has more than 4 and less than 50 characters
        // Test if height is less than 50 or over 250 cm
        // if all tests pass should save to the database
    })
})