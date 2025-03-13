import * as db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(db.getMemos())
}

export async function POST(request: Request) {
  const body = await request.text()

  // Return 400 on empty content
  if ((body ?? '').trim() === '') {
    return new Response('', { status: 400 })
  }

  return NextResponse.json(db.createMemo(body))
}
