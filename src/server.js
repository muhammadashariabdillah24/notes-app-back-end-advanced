const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NoteService = require('./services/inMemory/NoteService');
const process = require('process')

const init = async () => {
    const notesService = new NoteService();
    const port = process.env.PORT || 5000;

    const server = Hapi.server({
        port: port,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();