import * as db from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  // TODO: Check for 404
  const id = Number.parseInt(params.id)
  const body = await request.text()
  db.updateMemo(id, body)
  return new Response('')
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  // TODO: Check for 404
  const id = Number.parseInt(params.id)
  db.deleteMemo(id)
  return new Response('')
}
