import { fastify } from './app.js';
import { config } from './config/config.js';

const options = {
  port: config.port, 
  host: '::',
  connectionTimeout : 120000,
  requestTimeout: 120000,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
} 
const server =  fastify.listen( options, function (err) {
  if (err) {
    fastify.log.fatal(err)
    process.exit(1)
  }
  fastify.log.info(`Welcome to API - Alert CO :: v1.0.0`);
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      fastify.log.fatal('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  fastify.log.warn(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  fastify.log.fatal('SIGTERM received');
  if (server) {
    server.close();
  }
});
