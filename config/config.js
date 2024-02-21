import dotenv from 'dotenv';
import Joi from 'joi';
import { URL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: new URL('../.env', import.meta.url).pathname }); 

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    EMAIL_HOST: Joi.string().default('192.168.131.201').description('EMAIL HOST'), 
    EMAIL_USER: Joi.string().default('iris_admin').description('EMAIL USER'), 
    EMAIL_PASS: Joi.string().default('irisadmin').description('EMAIL PASS'), 
    EMAIL_PORT: Joi.number().default(25).description('EMAIL PORT'),
    EMAIL_FROM: Joi.string().default('iris_admin@regmlg.indomaret.co.id').description('EMAIL PORT'),
    
    REDIS_HOST: Joi.string().required().description('REDIS HOST'),
    REDIS_PORT: Joi.number().required().description('REDIS PORT'),
    REDIS_PASS: Joi.string().required().description('REDIS PASSWORD'),

    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_REFRESH_SECRET:Joi.string().required().description('JWT Refresh Secret key'),
    JWT_ACCESS_EXPIRATION: Joi.number()
      .default(60)
      .description('default 60 minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION: Joi.number()
      .default(480)
      .description('default 480 minutes after which refresh tokens expire'), 

    PORT: Joi.number().default(8000).description('PORT RUNNING - ORI WEB SERVICE'),
    APP_LOKASI: Joi.string().required().description('Database MySQL HOST GLOBAL'),
    DB_HOST: Joi.string().required().description('Database MySQL HOST GLOBAL'),
    DB_USER: Joi.string().required().description('Database MySQL USERNAME GLOBAL'),
    DB_PASS: Joi.string().required().description('Database MySQL PASSWORD GLOBAL'),
    DB_PORT: Joi.number().required().description('Database MySQL PORT GLOBAL'),
    DB_NAME: Joi.string().required().description('Database MySQL GLOBAL'),
    DB_POOLING_LIMIT: Joi.number().required().description('Database MySQL POOLING LIMIT GLOBAL'),
    DB_MAXIDLE: Joi.number().required().description('Database MySQL MAX IDLE GLOBAL'),
    DB_IDETIMEOUT: Joi.number().required().description('Database MySQL IDLE TIMEOUT GLOBAL'),
    DB_KEEPALIVE: Joi.boolean().required().description('Database MySQL KEEPALIVE GLOBAL'),

    DB_HOST_DML: Joi.string().required().description('Database MySQL HOST DML GLOBAL'),
    DB_USER_DML: Joi.string().required().description('Database MySQL USERNAME DML GLOBAL'),
    DB_PASS_DML: Joi.string().required().description('Database MySQL PASSWORD DML GLOBAL'),
    DB_PORT_DML: Joi.number().required().description('Database MySQL PORT DML GLOBAL'),
    DB_NAME_DML: Joi.string().required().description('Database MySQL DML GLOBAL'),
    DB_POOLING_LIMIT_DML: Joi.number().required().description('Database MySQL POOLING LIMIT DML GLOBAL'),
    DB_MAXIDLE_DML: Joi.number().required().description('Database MySQL MAX IDLE DML GLOBAL'),
    DB_IDETIMEOUT_DML: Joi.number().required().description('Database MySQL IDLE TIMEOUT DML GLOBAL'),
    DB_KEEPALIVE_DML: Joi.boolean().required().description('Database MySQL KEEPALIVE DML GLOBAL')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

 export const config = {
  env: envVars.NODE_ENV,
  url_web: envVars.URL_WEB,
  email_host: envVars.EMAIL_HOST,
  email_port: envVars.EMAIL_PORT,
  email_user: envVars.EMAIL_USER,
  email_pass: envVars.EMAIL_PASS,
  email_from: envVars.EMAIL_FROM,
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASS
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    secret_refresh: envVars.JWT_REFRESH_SECRET,
    accessExpiration: envVars.JWT_ACCESS_EXPIRATION,
    refreshExpiration: envVars.JWT_REFRESH_EXPIRATION
  },
  app_lokasi: envVars.APP_LOKASI,
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
    port: envVars.DB_PORT,
    connectionLimit: envVars.DB_POOLING_LIMIT,
    waitForConnections: true,
    queueLimit: 0,
    maxIdle: envVars.DB_MAXIDLE,
    idleTimeout: envVars.DB_IDETIMEOUT,
    enableKeepAlive: envVars.DB_KEEPALIVE,
    dateStrings: true,
    multipleStatements: true
  },
  db_dml: {
    host: envVars.DB_HOST_DML,
    user: envVars.DB_USER_DML,
    password: envVars.DB_PASS_DML,
    database: envVars.DB_NAME_DML,
    port: envVars.DB_PORT_DML,
    connectionLimit: envVars.DB_POOLING_LIMIT_DML,
    waitForConnections: true,
    queueLimit: 0,
    maxIdle: envVars.DB_MAXIDLE_DML,
    idleTimeout: envVars.DB_IDETIMEOUT_DML,
    enableKeepAlive: envVars.DB_KEEPALIVE_DML,
    dateStrings: true,
    multipleStatements: true
  }
};