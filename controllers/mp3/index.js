import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
import { promises as fsPromises } from 'fs';
const { readFile } = fsPromises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (fastify, opts, done) => {
    fastify.get('/user/:id', async (req, reply) => {
        try {
            const {id} = req.params
            const filePath = join(__dirname, '..', '..', 'public', `VOICE_USER_${id.toUpperCase()}.mp3`);
            const fileBuffer = await readFile(filePath);
            console.log(`Ada Request pembacaan file ${filePath} ${fileBuffer.length}`)
            reply.header('Content-Type', 'audio/mpeg');
            reply.header('Content-Length', fileBuffer.length);
            reply.send(fileBuffer);
            return reply;
        } catch (error) {
            console.log(`Error`, error);
            return reply.code(404).send('File Tidak Ditemukan');
        }
    });
    fastify.get('/urgent/:id', async (req, reply) => {
        try {
            const {id} = req.params
            const filePath = join(__dirname, '..', '..', 'public', `VOICE_URGENT_${id.toUpperCase()}.mp3`);
            const fileBuffer = await readFile(filePath);            
            reply.header('Content-Type', 'audio/mpeg');
            reply.header('Content-Length', fileBuffer.length);
            reply.send(fileBuffer);

            return reply;
        } catch (error) {
            console.log(`Error`, error);
            return reply.code(404).send('File Tidak Ditemukan');
        }
    });

    fastify.get('/inprogress/:id', async (req, reply) => {
        try {
            const {id} = req.params
            const filePath = join(__dirname, '..', '..', 'public', `VOICE_INPROGRESS_${id.toUpperCase()}.mp3`);
            const fileBuffer = await readFile(filePath);            
            reply.header('Content-Type', 'audio/mpeg');
            reply.header('Content-Length', fileBuffer.length);
            reply.send(fileBuffer);

            return reply;
        } catch (error) {
            console.log(`Error`, error);
            return reply.code(404).send('File Tidak Ditemukan');
        }
    });
    done();
};
