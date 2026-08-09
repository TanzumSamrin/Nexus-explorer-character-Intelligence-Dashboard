function createLogEntry(
  level,
  message,
  context,
  error
) {
  return {
    timestamp:
      new Date().toISOString(),

    level,

    context,

    message,

    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
  };
}

export function logInfo(
  message,
  context = "App"
) {
  const entry =
    createLogEntry(
      "INFO",
      message,
      context
    );

  console.info(
    `[${entry.timestamp}] [${entry.level}] [${entry.context}]`,
    entry.message
  );
}

export function logWarn(
  message,
  context = "App"
) {
  const entry =
    createLogEntry(
      "WARN",
      message,
      context
    );

  console.warn(
    `[${entry.timestamp}] [${entry.level}] [${entry.context}]`,
    entry.message
  );
}

export function logError(
  message,
  context = "App",
  error = null
) {
  const entry =
    createLogEntry(
      "ERROR",
      message,
      context,
      error
    );

  console.error(
    `[${entry.timestamp}] [${entry.level}] [${entry.context}]`,
    entry.message,
    entry.error || ""
  );
}