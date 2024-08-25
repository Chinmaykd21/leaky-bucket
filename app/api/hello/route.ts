import LeakyBucket from "@/lib/leaky-bucket";
import { NextRequest, NextResponse } from "next/server";

const leakyBucket = new LeakyBucket(3, 60 * 1000); // 3 requests per minute

export async function GET(req: NextRequest) {
  // Provided by vercel
  const ip = req.ip!;

  if (!leakyBucket.addRequest(ip)) {
    return NextResponse.json({
      error: "Too many requests. Please try again after some time!",
      message: "",
    });
  }

  return NextResponse.json({
    message: "Hello World!",
    error: "",
  });
}
