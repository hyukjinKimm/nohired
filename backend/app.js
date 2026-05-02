const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
dotenv.config({
  path: `.env.${env}`,
});

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const logger = require("./logger");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const testRouter = require("./routes/test");
const app = express();

app.set("port", process.env.PORT || 9090);

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
    domain: ".nohired.com",
    maxAge: 1000 * 60 * 60 * 24, // 1일
  },
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
  sessionOption.cookie.sameSite = "none";
}
app.use(session(sessionOption));

app.use("/", testRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  logger.error(error.message);
  console.error(err);
});

module.exports = app;
