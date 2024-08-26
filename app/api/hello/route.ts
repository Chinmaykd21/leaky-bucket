import LeakyBucket from "@/lib/leaky-bucket";
import { NextRequest, NextResponse } from "next/server";

const leakyBucket = new LeakyBucket(5, 60 * 1000); // 3 requests per minute

export async function GET(req: NextRequest) {
  // Provided by vercel
  const ip = req.ip ? req.ip : req.headers.get("x-forward-for");

  if (!ip) {
    return NextResponse.json(
      {
        error: "IP not found!!!",
        message: "",
      },
      {
        status: 400,
      }
    );
  }

  if (!leakyBucket.addRequest(ip)) {
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
