const next = require("next");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { execute, subscribe } = require("graphql");
const fs = require("fs");
const http = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
// const url = require("url"); // built-in utility
// const querystring = require("querystring");

require("dotenv").config();

// our packages
const schema = require("./data/schema");

// next.js setup
const port = process.env.PORT || -1;
const url = process.env.URL || "FAILED";
// const url = "192.168.0.27"; //process.env.URL || "FAILED";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const endpointURL = "/graphql";
const endpointIRL = "/graphiql";
const subscriptionsPath = "/subscriptions";
const subscriptionsEndpoint = `wss://${url}:${port}${subscriptionsPath}`;
// const subscriptionsEndpoint = `ws://192.168.0.43:${port}${subscriptionsPath}`;
// const subscriptionsEndpoint = `wss://192.168.0.27:${port}${subscriptionsPath}`;

// const subscriptionsEndpoint = `wss://localhost:${port}${subscriptionsPath}`;
// const subscriptionsEndpoint = `wss://138.197.166.114:${port}${subscriptionsPath}`;
// const subscriptionsEndpoint = `wss://growreel.com:${port}${subscriptionsPath}`;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.M_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("We are connected!"));

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.use(
      "/static",
      express.static(__dirname + "/static", {
        maxAge: "365d"
      })
    );

    server.use(
      cors({
        allowedHeaders: ["Content-Type"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false
      })
    );

    server.use(
      "/graphql",
      bodyParser.json(),
      graphqlExpress((req, res) => {
        return {
          schema,
          context: {
            token: req.headers.authorization
              ? req.headers.authorization.substring("Bearer ".length)
              : ""
          }
        };
      })
    );
    if (process.env.NODE_ENV === "development") {
      server.use(
        "/graphiql",
        graphiqlExpress({
          endpointURL: "/graphql",
          subscriptionsEndpoint: subscriptionsEndpoint
        })
      );
    }

    server.get("/watch/:_id", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("/r/:_id", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("/e/:_id", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("/help", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("/settings", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("/embed/:_id", (req, res) => {
      app.render(req, res, "/", {});
    });

    //THESE ARE REDUNDANT
    // Policy
    server.get("/agreement", (req, res) => {
      app.render(req, res, "/agreement", {});
    });
    server.get("/cookies_policy", (req, res) => {
      app.render(req, res, "/cookies_policy", {});
    });
    server.get("/copyright_notice", (req, res) => {
      app.render(req, res, "/copyright_notice", {});
    });
    server.get("/privacy_policy", (req, res) => {
      app.render(req, res, "/privacy_policy", {});
    });
    server.get("/terms_dataprocessing", (req, res) => {
      app.render(req, res, "/terms_dataprocessing", {});
    });
    server.get("/terms", (req, res) => {
      app.render(req, res, "/terms", {});
    });
    server.get("/robots.txt", (req, res) => {
      res.sendFile(__dirname + "/robots.txt");
    });
    /////////////////////

    server.get("/", (req, res) => {
      app.render(req, res, "/", {});
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    // server.get("*", (req, res) => {
    //   app.render(req, res, "/404", {});
    // });

    const ws = http.createServer(server);
    ws.listen(port, () => {
      console.log(`Apollo Server is now running on http://${url}:${port}`);
      // Set up the WebSocket for handling GraphQL subscriptions
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema
        },
        {
          server: ws,
          path: "/subscriptions"
        }
      );
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
