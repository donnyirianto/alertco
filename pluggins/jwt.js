import fastifyPlugin from 'fastify-plugin';

const jwt = async (fastify, options) => {
    fastify.register(import("@fastify/jwt"), {
      secret: options.secret
    })
  
    fastify.decorate("authenticate", async function(request, reply) {
      try {
        
        const decoded = await request.jwtVerify() 
        if (decoded.exp && Date.now() > decoded.exp * 1000 || decoded.exp === undefined) {
          reply.status(401).format(401,'Session anda telah berakhir, silahkan login kembali','',err.message)
        }    
        request.jwtDecoded = decoded;
        
      } catch (err) {
        reply.status(401).format(401,'Session anda telah berakhir, silahkan login kembali','',err.message)
      }
    })
 }

export const fastifyJWTPlugin = fastifyPlugin(jwt,{ name: 'fastify-jwt-plugin' })