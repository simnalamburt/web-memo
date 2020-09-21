const fastify = require('fastify')
const fastifyCors = require('fastify-cors')

const server = fastify({ logger: true })
server.register(fastifyCors, { origin: 'http://localhost:8000' })

server.get('/', async (request, reply) => {
  return [
    {
      id: 1,
      content:
        'Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante.',
    },
    {
      id: 2,
      content:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    },
  ]
})

server.listen(9494)
