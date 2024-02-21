import autoLoad from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Fastify from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import compress from '@fastify/compress';
import cors from '@fastify/cors';
import redis from '@fastify/redis';
import metricsPlugin from 'fastify-metrics';
import fastifyStatic from '@fastify/static';
import { config } from './config/config.js';
import {fastifyJWTPlugin} from './pluggins/jwt.js';
import {fastifyMysql2Plugin} from './pluggins/mysql.js';
import {fastifyMysql2DmlPlugin} from './pluggins/mysql_dml.js';
import {fastifyTanggalIndoPlugin} from './pluggins/format_date.js';
import mqttPlugin from './pluggins/mqttPlugin.js';
//import responseFormatPlugin from './pluggins/response.js';
import loggerPlugin from './pluggins/logger.js';
import pino from 'pino';
import logger from './pluggins/logger.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pinoPretty = pino.transport({
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss.l'Z'"
    }
});

// Combine the streams
// NOTE: By setting the "level", you can choose what level each individual transport will recieve a log
const streams = [ 
  //{level: 'info', stream: pinoLokiTransport},
  {level: 'info', stream: pinoPretty},
  //{level: 'warn', stream: pinoLokiTransport},
  {level: 'warn', stream: pinoPretty},
  //{level: 'error', stream: pinoLokiTransport},
  {level: 'error', stream: pinoPretty},
  //{level: 'fatal', stream: pinoLokiTransport},
  {level: 'fatal', stream: pinoPretty}
];
 
//Config Fastify 
export const fastify = Fastify({
    // https: {
    //   key: fs.readFileSync(join(__dirname, '/keys/private.pem')),
    //   cert: fs.readFileSync(join(__dirname, '/keys/cacert.pem'))
    // },
    requestIdLogLabel: 'reqID',
    genReqId() {
      return uuidv4();
    },
    logger: {
      stream: pino.multistream(streams),
      level: 'info'
    },   
    disableRequestLogging:true, 
})
await fastify.register(compress,{ encodings: ['gzip'] })
//fastify metrics
await fastify.register(metricsPlugin, { endpoint: '/metrics' });

//Logger Plugin
await fastify.register(loggerPlugin);
 
// JWT Plugin
await fastify.register(fastifyJWTPlugin,{ secret : config.jwt.secret})

// MYSQL Plugin
await fastify.register(fastifyMysql2Plugin,config.db)
await fastify.register(fastifyMysql2DmlPlugin,config.db_dml)

// Format Date Plugin
await fastify.register(fastifyTanggalIndoPlugin)
// Mqtt Plugin
await fastify.register(mqttPlugin)

// REDIS Plugin
await fastify.register(redis, config.redis)

// CORS Plugin
await fastify.register(cors, { 
    origin: '*',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials:true
})  

// await fastify.register(fastifyStatic,{
//   root: join(__dirname, 'statics')
// })
await fastify.register(fastifyStatic,{
  root: join(__dirname, 'public'),
})
// Register Controller (Routing akses untuk client)
await fastify.register(autoLoad, {
  dir: join(__dirname, 'controllers'),
  options: { 
      prefix: '/'
  },
})
