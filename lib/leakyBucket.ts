class LeakyBucket {
  private maxRequests: number;
  private interval: number;
  private bucket: Map<String, { tokens: number[] }>;

  constructor(maxRequests: number, interval: number) {
    this.maxRequests = maxRequests;
    this.interval = interval;
    this.bucket = new Map<String, { tokens: number[] }>();
  }

  // Method to remove tokens that are greater than
  // the interval
  private removeOldToken(bucket: { tokens: number[] }) {
    const now = Date.now();
    bucket.tokens = bucket.tokens.filter(
      (tokenTime) => now - tokenTime < this.interval
    );
  }

  public addRequest(ip: string): boolean {
    // Check if IP has a bucket assigned // If not, create one
    if (!this.bucket.has(ip)) {
      this.bucket.set(ip, { tokens: [] });
    }
    // Get the newly created bucket
    const bucket = this.bucket.get(ip)!;
    // Remove old tokens from the bucket
    this.removeOldToken(bucket);
    // Check if the bucket has space for more
    // requests (tokens)
    if (bucket.tokens.length < this.maxRequests) {
      // If so, add the current time as a new token
      bucket.tokens.push(Date.now());
      return true;
    }
    // otherwise, deny the request (bucket is full)
    return false;
  }
}

export default LeakyBucket;
