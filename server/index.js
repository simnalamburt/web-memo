const fastify = require('fastify')

const server = fastify({ logger: true })

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.listen(9494)
