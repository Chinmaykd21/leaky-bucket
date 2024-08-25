import RateLimiter from "@/components/rate-limiter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <h1 className="text-3xl italic">Leaky bucket rate limiting example</h1>
      <RateLimiter />
    </main>
  );
}
