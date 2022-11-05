import request from "supertest";
import app from "./index.js";

/*
 *   This test  needs to run fully
 *   it creates a user to test, without the
 *   userTest all the non-POST request will fail
 */

describe("POST to /persons", () => {
  describe("given username and height", () => {
    test("Test if the username or height is valid", async () => {
      const response = await request(app).post("/persons").send({
        name: "testUser",
        height: "180",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Check if user has more than 4 characteres", async () => {
      const response = await request(app).post("/persons").send({
        name: "Mar",
        height: "180",
      });
      expect(response.statusCode).toBe(400);
    });

    test("Check if user has less than 50 characteres", async () => {
      const response = await request(app).post("/persons").send({
        name: "MarioMarioMarioMarioMarioMarioMarioMarioMarioMarioa",
        height: "180",
      });
      expect(response.statusCode).toBe(400);
    });

    test("Check if height is over 50 cm", async () => {
      const response = await request(app).post("/persons").send({
        name: "Mario",
        height: "49",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Check if height is less than 250 cm", async () => {
      const response = await request(app).post("/persons").send({
        name: "Mar",
        height: "251",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("PUT to /persons", () => {
  test("Updating a inexistent user is possible", async () => {
    const response = await request(app).put(
      "/persons/nonExistentUser?test=true"
    );
    expect(response.statusCode).toBe(404);
  });

  test("Updating a existent user is possible", async () => {
    const response = await request(app).put("/persons/userTest?test=true");
    expect(response.statusCode).toBe(202); 
    // expect(response.body).toEqual(expect.stringContaining("successfully"))
  });

  test("Updating a existent user without query return bad query", async () => {
    const response = await request(app).put("/persons/userTest");
    expect(response.statusCode).toBe(400);
  });

  test("Updating a inexistent user without query return not found", async () => {
    const response = await request(app).put("/persons/nonExistentUser");
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE to /persons", () => {
  test("Deleting a user that doesn't exist return not found", async () => {
    const response = await request(app).delete("/persons/nonExistentUser");
    expect(response.statusCode).toBe(404);
  });

  test("Deleting a existent user is possible", async () => {
    const response = await request(app).delete("/persons/testUser"); // Only works if run the POST test
    expect(response.statusCode).toBe(202);
  });
});
