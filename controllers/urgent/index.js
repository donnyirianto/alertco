import {getData} from '../../services/urgent/index.js';

export default (fastify, opts, done) => {
    fastify.post('/reg1', async (req,reply) => {
        const resp = await getData(fastify,req,'RE01',"VOICE_URGENT_REG1.mp3") 
        reply.code(resp.code).send(resp)
        return reply
    })
    fastify.post('/reg2', async (req,reply) => {
        const resp = await getData(fastify,req,'RE02',"VOICE_URGENT_REG2.mp3") 
        reply.code(resp.code).send(resp)
        return reply
    })
    fastify.post('/reg3', async (req,reply) => {
        const resp = await getData(fastify,req,'RE03',"VOICE_URGENT_REG3.mp3") 
        reply.code(resp.code).send(resp)
        return reply
    })
    fastify.post('/reg4', async (req,reply) => {
        const resp = await getData(fastify,req,'RE03',"VOICE_URGENT_REG4.mp3") 
        reply.code(resp.code).send(resp)
        return reply
    }) 
    done()
}