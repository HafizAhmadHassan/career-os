import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';

const ENDPOINT = 'https://formsubmit.co/ajax/ahmadhassan061@gmail.com';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [state, setState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    const form = e.currentTarget;
    setState('sending');
    setError('');

    const data = new FormData(form);
    const body = JSON.stringify({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      _subject: 'New message from career-os',
      _template: 'table',
      _captcha: 'false',
    });

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body,
      });
      const json = await res.json().catch(() => null);
      if (res.ok && (json?.success === 'true' || json === null)) {
        setState('sent');
        form.reset();
      } else {
        setState('error');
        setError(json?.message ?? 'Could not send the message. Please try again or email directly.');
      }
    } catch {
      setState('error');
      setError('Network error — please try again, or email ahmadhassan061@gmail.com directly.');
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get in touch for collaborations, freelance work, or just to say hello.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">Email</h3>
            <a href="mailto:ahmadhassan061@gmail.com" className="mt-1 block text-sm text-primary hover:underline">
              ahmadhassan061@gmail.com
            </a>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">GitHub</h3>
            <a
              href="https://github.com/hafizahmadhassan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-primary hover:underline"
            >
              github.com/hafizahmadhassan
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-border p-6">
          <h3 className="font-medium">Send a Message</h3>
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={4}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>

            {state === 'sent' && (
              <p className="flex items-start gap-2 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                Message sent. Thank you — I&apos;ll get back to you soon.
              </p>
            )}
            {state === 'error' && (
              <p className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}