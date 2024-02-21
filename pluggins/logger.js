import dayjs from 'dayjs';
import fp from 'fastify-plugin';
import { v4 as uuidv4 } from 'uuid';
 
function loggerPlugin(fastify, options, done) {
    const now = () => Date.now();
    // Register a decorator to format responses 
    fastify.decorateRequest("standardLog", null);
    fastify.addHook("onRequest", async(req, reply) => {
      reply.startTime = now(); 
      fastify.log.info({ reqID: req.id, url: req.raw.url,method: req.raw.method, remoteAddress: req.ip}, "received request"); 
    });

    fastify.addHook("onResponse", async(req, reply) => {  
        if(req.jwtDecoded){                  
          let data = `('${dayjs().format("YYYY-MM-DD HH:mm:ss")}','${reply.raw.statusCode}','${req.jwtDecoded.userweb.nik}','${JSON.stringify({
            reqID: req.id,
            nik: req.jwtDecoded.userweb.nik,
            url: req.raw.url, // url
            method: req.raw.method, // method
            statusCode: reply.raw.statusCode, // statusCode
            remoteAddress: reply.request?.socket.remoteAddress,
            durationMs: now() - reply.startTime, //duration in ms 
          })}')`
          
          await fastify.redis.set(`ori-web-logs-${uuidv4()}`, JSON.stringify(data),'EX', 3600)
        }
        fastify.log.info(
          {
            reqID: req.id,
            url: req.raw.url, // add url 
            method: req.raw.method, // add method
            statusCode: reply.raw.statusCode, // add statusCode
            remoteAddress: reply.request?.socket.remoteAddress,
            durationMs: now() - reply.startTime, // recreate duration in ms - use process.hrtime() - https://nodejs.org/api/process.html#process_process_hrtime_bigint for most accuracy
          },
          "request completed"
        );  
    });  
    done()
}

export default fp(loggerPlugin, {
  name: 'logger-format-plugin',
});
