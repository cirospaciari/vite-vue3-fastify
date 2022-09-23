export default function (fastify, opts, done) {
    fastify.get('/hello', function (request, reply) {
        reply.send({ hello: 'world' })
    })
    done()
}
  