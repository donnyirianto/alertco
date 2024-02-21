import fastifyPlugin from 'fastify-plugin';
import * as mysql from 'mysql2/promise';

 const fastifyMysql2 = (fastify, options, done) =>{
  
  const connection = mysql.createPool(options)
  
  if (!fastify.mysql) {
    fastify.decorate('mysql', connection)
  }

  fastify.addHook('onClose', (fastify, done) => connection.end().then(done).catch(done))

  done()
}
export const fastifyMysql2Plugin = fastifyPlugin(fastifyMysql2, { name: 'mysql' });


