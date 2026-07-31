import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const address = email.trim().toLowerCase();
  const webhook = process.env.EARLY_ACCESS_WEBHOOK;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: address, source: "cardiom-landing" }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }
  } else {
    // Without a configured destination the signup still succeeds and is
    // recoverable from the server log until the webhook is wired up.
    console.info("[early-access] signup", address);
  }

  return NextResponse.json({ ok: true });
}
