const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const envLabel =
  process.env.NODE_ENV === "production" ? "production" : "development";
const logDir = path.join(__dirname, "logs", envLabel);

fs.mkdirSync(logDir, { recursive: true });

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json(),
  ),
  transports: [
    new DailyRotateFile({
      dirname: logDir,
      filename: "log_%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      dirname: logDir,
      filename: "error_%DATE%.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

module.exports = logger;
