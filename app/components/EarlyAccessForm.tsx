"use client";

import { useId, useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="signup-done" role="status">
        <span aria-hidden="true">✓</span> You are on the list. We will write once
        Cardiom opens on the App Store.
      </p>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <label className="signup-label" htmlFor={inputId}>
        Join the early access list
      </label>
      <div className="signup-row">
        <input
          className="signup-input"
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
        />
        <button
          className="button button-primary signup-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {status === "error" ? (
        <p className="signup-error" id={`${inputId}-error`} role="alert">
          That did not go through. Check the address or email{" "}
          <a href="mailto:hello@cardiom.app">hello@cardiom.app</a>.
        </p>
      ) : null}
    </form>
  );
}
