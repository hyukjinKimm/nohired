const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

// 파일 로그 경로: logs/development | logs/production (NODE_ENV)

const envLabel =
  process.env.NODE_ENV === "production" ? "production" : "development";
const logDir = path.resolve(__dirname, "logs", envLabel);

fs.mkdirSync(logDir, { recursive: true });

const fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.json(),
);

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: fileFormat,
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

logger.on("error", (err) => {
  console.error("[winston transport]", err);
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

module.exports = logger;
