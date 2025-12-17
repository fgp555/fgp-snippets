const express = require("express");
const os = require("os");
const process = require("process");
const { readFileSync } = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

function demoMiddleware(options = {}) {
  const { headerName = "x-request-id", log = console.log, addResponseHeader = true } = options;

  return function (req, res, next) {
    const start = process.hrtime.bigint();

    // Correlation / Request ID
    const requestId = req.headers[headerName] || crypto.randomUUID();
    req.requestId = requestId;

    if (addResponseHeader) {
      res.setHeader(headerName, requestId);
    }

    // Finish handler
    res.on("finish", () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1e6;

      const entry = {
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Math.round(durationMs * 100) / 100,
        ip: req.ip,
        userAgent: req.get("user-agent"),
        timestamp: new Date().toISOString(),
      };

      log(entry);
    });

    next();
  };
}

app.use(demoMiddleware());

// Cache static values at startup (avoid per-request overhead)
const nodeVersion = process.version;
const expressVersion = require("express/package.json").version;
let npmVersion = "unknown";
try {
  npmVersion = readFileSync(require.resolve("npm/package.json"), "utf8");
  npmVersion = JSON.parse(npmVersion).version;
} catch (_) {}

app.get("/", (req, res) => {
  const mem = process.memoryUsage();
  const cpus = os.cpus();

  const response = {
    service: {
      name: "info-service",
      environment: process.env.NODE_ENV || "development",
      pid: process.pid,
      uptimeSeconds: Math.round(process.uptime()),
      startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
    },
    runtime: {
      node: nodeVersion,
      npm: npmVersion,
      express: expressVersion,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      cpu: {
        model: cpus[0]?.model,
        cores: cpus.length,
        loadAvg: os.loadavg(),
      },
      memory: {
        totalMB: Math.round(os.totalmem() / 1024 / 1024),
        freeMB: Math.round(os.freemem() / 1024 / 1024),
        rssMB: Math.round(mem.rss / 1024 / 1024),
        heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
      },
    },
    request: {
      ip: req.ip,
      userAgent: req.get("user-agent"),
      timestamp: new Date().toISOString(),
    },
  };

  res.status(200).json(response);
});

// Lightweight health endpoint for load balancers
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
