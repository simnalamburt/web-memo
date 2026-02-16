import type { APIEvent } from "@solidjs/start/server";

import * as db from "../lib/db";

export async function GET() {
  return Response.json(db.getMemos());
}

export async function POST({ request }: APIEvent) {
  const body = await request.text();

  // Return 400 on empty content
  if ((body ?? "").trim() === "") {
    return new Response("", { status: 400 });
  }

  return Response.json(db.createMemo(body));
}
