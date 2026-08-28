export default function ContactPage() {
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
          <form className="mt-4 space-y-3" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
