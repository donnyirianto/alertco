import fastifyPlugin from 'fastify-plugin';
import * as mysql from 'mysql2/promise';

 const fastifyMysql2 = (fastify, options, done) =>{
  
  const connection = mysql.createPool(options)
  
  if (!fastify.mysqldml) {
    fastify.decorate('mysqldml', connection)
  }

  fastify.addHook('onClose', (fastify, done) => connection.end().then(done).catch(done))

  done()
}
export const fastifyMysql2DmlPlugin = fastifyPlugin(fastifyMysql2, { name: 'mysqldml' });


