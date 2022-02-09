import "dotenv/config";
import { Cache, CacheClass } from "memory-cache";
import getVisits from "./dboperations";
import Visit from "./types";
import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");

export const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((_req, _res, next) => {
  if (_req.path.substring(0, 8) === "/visits/") return next();
  return _res.status(401).send("Invalid request");
});

const cache: CacheClass<string, Visit[]> = new Cache();

router.route("/visits/:id").get((request, response) => {
  if (cache.get(request.params.id) !== null) {
    response.json(cache.get(request.params.id) as Visit[]);
    return;
  }
  getVisits(request.params.id)
    .then((res) => {
      if (res) {
        response.json(res[0] as Visit[]);
        cache.put(request.params.id, res[0] as Visit[], 600 * 1000);
        return;
      }
    })
    .catch((err) => {
      return response.status(400).send(err);
    });
});

router.route("/visits/:id").post((req, res) => {
  return res.status(403).send(req.method + " cannot be performed here");
});

router.route("/visits/:id").put((req, res) => {
  return res.status(403).send(req.method + " cannot be performed here");
});

router.route("/visits/:id").patch((req, res) => {
  return res.status(403).send(req.method + " cannot be performed here");
});

router.route("/visits/:id").delete((req, res) => {
  return res.status(403).send(req.method + " cannot be performed here");
});

const port = 8000;
app.listen(port);

// eslint-disable-next-line no-console
console.log("API running at " + port);
