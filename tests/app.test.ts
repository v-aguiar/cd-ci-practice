import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/database.js";

const APP = supertest(app);

beforeEach(async () => {
  await prisma.student.deleteMany({});
});

describe("Student tests suite", () => {
  it("should return status 201 and insert two students on db", async () => {
    const students = [
      {
        name: "Fulano",
      },
      {
        name: "Ciclano",
      },
    ];

    const response = await APP.post("/students").send({ students });

    expect(response.status).toBe(201);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
