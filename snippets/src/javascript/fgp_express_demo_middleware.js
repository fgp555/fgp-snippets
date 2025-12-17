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
