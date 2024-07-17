import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jobRoutes from "../src/routes/jobRoutes.js";
import { errorHandler } from "../src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

// Setup in-memory MongoDB server for testing
let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  process.env.JWT_SECRET = "testsecret"; // Set JWT secret for testing
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Initialize express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);

describe("Job API", () => {
  let token;
  beforeAll(() => {
    // Generate a mock JWT token with a valid secret and role
    token = jwt.sign(
      { userId: new mongoose.Types.ObjectId(), role: "Employer" },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    console.log("Generated Token:", token);
  });

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("../src/middlewares/authMiddleware.js", () => {
      const originalModule = jest.requireActual(
        "../src/middlewares/authMiddleware.js"
      );
      return {
        ...originalModule,
        protect: (req, res, next) => {
          try {
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
            console.log("Decoded token in protect middleware:", decoded);
            req.user = { _id: decoded.userId, role: decoded.role };
            console.log("Set req.user in protect middleware:", req.user);
            next();
          } catch (err) {
            console.error("Token verification failed:", err);
            res.status(401).json({ message: "Not authorized, token failed" });
          }
        },
      };
    });
  });

  it("should create a new job", async () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds
    const response = await request(app)
      .post("/api/jobs/createJob")
      .set("Cookie", `jwt=${token}`)
      .send({
        title: "Software Engineer",
        description: "Develop and maintain software applications.",
        location: "Remote",
        salary: "100000",
        requirements: "3+ years of experience in software development",
        job_type: "full_time",
      });

    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Job posted successfully");
    expect(response.body.job.title).toBe("Software Engineer");
  });

  it("should fetch all jobs", async () => {
    const response = await request(app).get("/api/jobs/");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return an error for unauthorized job creation", async () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds
    jest.resetModules();
    jest.doMock("../src/middlewares/authMiddleware.js", () => {
      const originalModule = jest.requireActual(
        "../src/middlewares/authMiddleware.js"
      );
      return {
        ...originalModule,
        protect: (req, res, next) => {
          try {
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
            console.log("Decoded token (unauthorized test):", decoded);
            req.user = { _id: decoded.userId, role: "JobSeeker" }; // Not an employer
            next();
          } catch (err) {
            console.error(
              "Token verification failed (unauthorized test):",
              err
            );
            res.status(401).json({ message: "Not authorized, token failed" });
          }
        },
      };
    });

    const response = await request(app)
      .post("/api/jobs/createJob")
      .set("Cookie", `jwt=${token}`)
      .send({
        title: "Software Engineer",
        description: "Develop and maintain software applications.",
        location: "Remote",
        salary: "100000",
        requirements: "3+ years of experience in software development",
        job_type: "full_time",
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Not authorized to create a job");
  });
});
