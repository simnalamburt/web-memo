const fastify = require('fastify')
const fastifyCors = require('fastify-cors')

const server = fastify({ logger: true })
server.register(fastifyCors, { origin: 'http://localhost:3000' })

let lastId = 2
const memos = new Map([
  [
    1,
    'Hello, World!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in bibendum lorem. In viverra erat ipsum, id pretium urna vehicula ut. Proin vel quam ultricies, placerat urna ut, accumsan leo. Vivamus laoreet vestibulum nulla non dictum. Vestibulum non nisl quis risus dictum vestibulum hendrerit ut diam. Sed eget laoreet augue. Integer pulvinar massa scelerisque rhoncus consequat. Vivamus velit mi, suscipit bibendum tincidunt quis, pulvinar a ante.',
  ],
  [
    2,
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  ],
])

server.get('/memos', async () => [...memos.entries()])

server.post('/memos', async (request, reply) => {
  // Return 400 on empty content
  if ((request.body ?? '').trim() === '') {
    reply.statusCode = 400
    return ''
  }

  // Assign ID to the memo and add it to the `memos`
  lastId += 1
  memos.set(lastId, request.body)
  return lastId
})

server.put('/memos/:id', async (request) => {
  // TODO: Check for 404
  const id = request.params.id | 0
  memos.set(id, request.body)
  return ''
})

server.delete('/memos/:id', async (request) => {
  // TODO: Check for 404
  const id = request.params.id | 0
  memos.delete(id)
  return ''
})

server.listen(9494)
