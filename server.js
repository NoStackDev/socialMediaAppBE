const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");

const config = require("./config");
const connectDb = require("./db/db");

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(
  session({
    name: "sid",
    secret: "thisisasecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(helmet());

// routes
app.use("/api", userRoute);
app.use("/api", postRoute);

app.listen(config.PORT, () => {
  connectDb();
  console.log(`backend server is up and running on port ${config.PORT}`);
});
