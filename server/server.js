import app from './app.js';
import { env } from './config/env.js';
import { connectDb, closeDb } from './config/db.js';

let server;

const startServer = async () => {
  try {
    console.log(`[BOOT] Starting HCM Lite Backend in ${env.NODE_ENV} mode...`);

    // Ensure database connection before accepting incoming traffic
    await connectDb();

    server = app.listen(env.PORT, () => {
      console.log(`[READY] Server running on http://localhost:${env.PORT}`);
      console.log(`[READY] Health check available at http://localhost:${env.PORT}/api/health`);
    });
  } catch (error) {
    console.error(`[FATAL] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing server gracefully...`);

  if (server) {
    server.close(async () => {
      console.log('[SHUTDOWN] HTTP server closed.');
      await closeDb();
      process.exit(0);
    });

    // Force exit if shutdown hangs beyond 10 seconds
    setTimeout(() => {
      console.error('[SHUTDOWN] Forcefully shutting down after timeout.');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION] at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[UNCAUGHT EXCEPTION]:', error);
  process.exit(1);
});

startServer();
