export default (fastify, opts, done) => {
    fastify.get('/',async (req,reply) => {
        const content = {
            message:"Welcome to API Alert CO",
            author:"INDOMARET GROUP",
            email:"ori@edpreg4.indomaret.com",
            github:"github.com/oriadministration"
        }
        reply.send(content)
        return reply
    })
    // describe route
    fastify.get(`/G001`, async (request, reply) => {
        try {
            reply.sendFile(`G001.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G004`, async (request, reply) => {
        try {
            reply.sendFile(`G004.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G005`, async (request, reply) => {
        try {
            reply.sendFile(`G005.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G009`, async (request, reply) => {
        try {
            reply.sendFile(`G009.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G020`, async (request, reply) => {
        try {
            reply.sendFile(`G020.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G025`, async (request, reply) => {
        try {
            reply.sendFile(`G025.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G026`, async (request, reply) => {
        try {
            reply.sendFile(`G026.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G027`, async (request, reply) => {
        try {
            reply.sendFile(`G027.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G028`, async (request, reply) => {
        try {
            reply.sendFile(`G028.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G029`, async (request, reply) => {
        try {
            reply.sendFile(`G029.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G030`, async (request, reply) => {
        try {
            reply.sendFile(`G030.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G033`, async (request, reply) => {
        try {
            reply.sendFile(`G033.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G034`, async (request, reply) => {
        try {
            reply.sendFile(`G034.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G049`, async (request, reply) => {
        try {
            reply.sendFile(`G049.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G050`, async (request, reply) => {
        try {
            reply.sendFile(`G050.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G080`, async (request, reply) => {
        try {
            reply.sendFile(`G080.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G089`, async (request, reply) => {
        try {
            reply.sendFile(`G089.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G092`, async (request, reply) => {
        try {
            reply.sendFile(`G092.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G105`, async (request, reply) => {
        try {
            reply.sendFile(`G105.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G107`, async (request, reply) => {
        try {
            reply.sendFile(`G107.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G113`, async (request, reply) => {
        try {
            reply.sendFile(`G113.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G116`, async (request, reply) => {
        try {
            reply.sendFile(`G116.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G117`, async (request, reply) => {
        try {
            reply.sendFile(`G117.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G137`, async (request, reply) => {
        try {
            reply.sendFile(`G137.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G143`, async (request, reply) => {
        try {
            reply.sendFile(`G143.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G146`, async (request, reply) => {
        try {
            reply.sendFile(`G146.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G148`, async (request, reply) => {
        try {
            reply.sendFile(`G148.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G149`, async (request, reply) => {
        try {
            reply.sendFile(`G149.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G156`, async (request, reply) => {
        try {
            reply.sendFile(`G156.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G157`, async (request, reply) => {
        try {
            reply.sendFile(`G157.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G158`, async (request, reply) => {
        try {
            reply.sendFile(`G158.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G165`, async (request, reply) => {
        try {
            reply.sendFile(`G165.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G174`, async (request, reply) => {
        try {
            reply.sendFile(`G174.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G177`, async (request, reply) => {
        try {
            reply.sendFile(`G177.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G218`, async (request, reply) => {
        try {
            reply.sendFile(`G218.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G219`, async (request, reply) => {
        try {
            reply.sendFile(`G219.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G224`, async (request, reply) => {
        try {
            reply.sendFile(`G224.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G232`, async (request, reply) => {
        try {
            reply.sendFile(`G232.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G234`, async (request, reply) => {
        try {
            reply.sendFile(`G234.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G236`, async (request, reply) => {
        try {
            reply.sendFile(`G236.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G237`, async (request, reply) => {
        try {
            reply.sendFile(`G237.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G241`, async (request, reply) => {
        try {
            reply.sendFile(`G241.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G242`, async (request, reply) => {
        try {
            reply.sendFile(`G242.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G244`, async (request, reply) => {
        try {
            reply.sendFile(`G244.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G245`, async (request, reply) => {
        try {
            reply.sendFile(`G245.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G257`, async (request, reply) => {
        try {
            reply.sendFile(`G257.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G259`, async (request, reply) => {
        try {
            reply.sendFile(`G259.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G260`, async (request, reply) => {
        try {
            reply.sendFile(`G260.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G263`, async (request, reply) => {
        try {
            reply.sendFile(`G263.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G301`, async (request, reply) => {
        try {
            reply.sendFile(`G301.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G305`, async (request, reply) => {
        try {
            reply.sendFile(`G305.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/G801`, async (request, reply) => {
        try {
            reply.sendFile(`G801.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/reg1`, async (request, reply) => {
        try {
            reply.sendFile(`reg1.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/reg2`, async (request, reply) => {
        try {
            reply.sendFile(`reg2.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/reg3`, async (request, reply) => {
        try {
            reply.sendFile(`reg3.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    });
    fastify.get(`/reg4`, async (request, reply) => {
        try {
            reply.sendFile(`reg4.html`);
            return reply
        } catch (error) {
            reply.code(404).send('File not found');
        }
    }); 
    done()
}
