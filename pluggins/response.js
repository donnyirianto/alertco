// responseFormat.js
import fp from 'fastify-plugin';

function responseFormatPlugin(fastify, options, done) {
  // Register a decorator to format responses
  fastify.decorateReply('format', function (code,message,data,message_dev) {
    
    if(!message_dev){
      this.header('Content-Type', 'application/json').send({
        code: code,
        message: message,
        data :data,
      });
    }else{
      this.header('Content-Type', 'application/json').send({
        code: code,
        message: message,
        error: message_dev,
      });
    }
    
  });

  done();
}

export default fp(responseFormatPlugin, {
  name: 'response-format-plugin',
});
