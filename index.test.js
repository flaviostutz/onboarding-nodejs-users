import supertest from 'supertest'
import app from './app'

describe("POST to /persons", () => {

    describe("given username and height", async () => {
        describe("Test if the username or height is valid", async () => {
            const response = await request(app).post("/persons").send({
                username: "Mario",
                height: "180"
            })
            expect(response.statusCode).toBe(200)
        })
        // Check if user has more than 4 and less than 50 characters
        // Test if height is less than 50 or over 250 cm
        // if all tests pass should save to the database
    })
})