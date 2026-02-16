import type { APIEvent } from "@solidjs/start/server";

import * as db from "../../lib/db";

export async function PUT({ request, params }: APIEvent) {
  // TODO: Check for 404
  const idParam = params.id;
  if (!idParam) {
    return new Response("", { status: 400 });
  }

  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    return new Response("", { status: 400 });
  }

  const body = await request.text();
  db.updateMemo(id, body);
  return new Response("");
}

export async function DELETE({ params }: APIEvent) {
  // TODO: Check for 404
  const idParam = params.id;
  if (!idParam) {
    return new Response("", { status: 400 });
  }

  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    return new Response("", { status: 400 });
  }

  db.deleteMemo(id);
  return new Response("");
}
