import { app } from "../src/api";
import * as request from "supertest";
import { describe, expect, it } from "@jest/globals";

describe("Checks return from db for visit data", () => {
  it("gets payload", async () => {
    await request(app)
      .get("/api/visits/ad3512a6-91b1-4d7d-a005-6f8764dd0111")
      .expect(200)
      .expect(function (res) {
        expect(res.body[0]).toHaveProperty("payload");
      });
  });
  it("gets same care receiver as requested", async () => {
    await request(app)
      .get("/api/visits/ad3512a6-91b1-4d7d-a005-6f8764dd0111")
      .expect(200)
      .expect(function (res) {
        expect(res.body[0].payload.care_recipient_id).toEqual(
          "ad3512a6-91b1-4d7d-a005-6f8764dd0111"
        );
      });
  });
  it("fails when incorrect api address given", async () => {
    await request(app).get("/pizza/for/breakfast").expect(404);
  });
  it("fails when request is not for api/visits/*", async () => {
    await request(app).get("/api/for/breakfast").expect(401);
  });
  it("fails when bad method given", async () => {
    await request(app)
      .post("/api/visits/ad3512a6-91b1-4d7d-a005-6f8764dd0111")
      .expect(403);
  });
});
