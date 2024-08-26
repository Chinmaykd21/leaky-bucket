import LeakyBucket from "@/lib/leaky-bucket";
import { NextRequest, NextResponse } from "next/server";

const leakyBucket = new LeakyBucket(5, 60 * 1000); // 3 requests per minute

export async function GET(req: NextRequest) {
  // Retrieve the client's IP address from the request object
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1"; // Fallback to localhost

  // If the IP is still undefined, we fallback to 'unknown'
  if (!ip) {
    return NextResponse.json(
      {
        error: "Unable to determine IP address.",
        message: "",
      },
      {
        status: 400, // Bad request since IP is required
      }
    );
  }

  if (!leakyBucket.addRequest(ip as string)) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again after some time!",
        message: "",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60", // Retry after 60 seconds
          "X-RateLimit-Limit": "5", // Maximum requests allowed
          "X-RateLimit-Remaining": "0", // Remaining requests in the current window
          "X-RateLimit-Reset": `${Math.floor(Date.now() / 1000) + 60}`, // Time when the rate limit will reset (Unix timestamp)
        },
      }
    );
  }

  return NextResponse.json(
    {
      message: "Hello World!",
      error: "",
    },
    {
      status: 200,
    }
  );
}
