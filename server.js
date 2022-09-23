import Fastify from 'fastify';

import path from 'path';
import fs from 'fs';
import fastifyStatic from '@fastify/static';
import ApiRoutes from './api/routes.js';

const fastify = Fastify({
  logger: process.env.NODE_ENV !== 'production' //disable logs in production
})

//If has dist directory serve static files (production mode mode will always use this)
if(fs.existsSync('./dist')){
    fastify.register(fastifyStatic, {
        root: path.join(process.cwd(), 'dist'),
        prefix: '/'
    })
}

//Always serve routes
fastify.register(ApiRoutes, { prefix: '/api' })

//If has dist directory serve index.html (production mode will always use this)
if(fs.existsSync('./dist')){
    fastify.get('*', ()=> reply.sendFile("./dist/index.html"))
}

// Run the server!
fastify.listen({ port: process.env.PORT || 4567 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})