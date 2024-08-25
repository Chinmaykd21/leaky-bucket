# Leaky Bucket Rate Limiting in Next.js

### Overview

This project demonstrates how to implement a rate limiter using the Leaky Bucket algorithm in a Next.js application. The Leaky Bucket algorithm is used to control the rate at which requests are processed, smoothing out bursts of traffic and preventing excessive load on the server.

### Features

- **Leaky Bucket Algorithm**: Implements a basic Leaky Bucket algorithm for rate limiting.
- **Next.js Integration**: Demonstrates how to integrate the algorithm into Next.js API routes.
- **TypeScript**: The project is fully written in TypeScript for type safety and better developer experience.
- **React Frontend**: Includes a simple React component that interacts with the rate-limited API.
- **TailwindCSS**:

### Prerequisites

Ensure you have the following installed:

> [Node.js](https://nodejs.org/en) (version 14.x or later)
> [npm](https://www.npmjs.com/) (version 6.x or later) or Yarn (version 1.x or later)

### Getting Started

- Clone the Repository

```bash
git clone https://github.com/yourusername/leaky-bucket-rate-limiter.git
cd leaky-bucket-rate-limiter
```

### Install Dependencies

```bash
pnpm install
# OR
yarn install
# OR
npm install
```

### Running the Development Server

To start the Next.js development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:3000 to see the application in action.

### Project Structure

- `lib/leaky-bucket.ts`: Contains the implementation of the Leaky Bucket algorithm.
- `app/api/hello/route.ts`: API route in Next.js that applies the Leaky Bucket rate limiting.
- `components/rate-limiter.tsx`: React component that interacts with the rate-limited API.
- `app/page.tsx`: The main page that displays the React component.

### Usage

Once the development server is running:

- Navigate to the homepage (http://localhost:3000).
- Click the "Make API Request" button to send a request to the - rate-limited API.
- If you exceed the allowed number of requests, you will see an error message indicating that too many requests have been made.

### Customization

#### Adjusting Rate Limiting Parameters

You can modify the rate limiting parameters in the `LeakyBucket` class:

- `maxRequests`: The maximum number of requests allowed within the specified interval.
- `interval`: The time window (in milliseconds) during which the requests are counted.

For example, to allow 10 requests per minute, modify the initialization of the `LeakyBucket` in `app/api/hello/route.ts`:

```typescript
const leakyBucket = new LeakyBucket(10, 60 * 1000); // 10 requests per minute
```

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

### Acknowledgments

[Next.js](https://nextjs.org/)
[TypeScript](https://www.typescriptlang.org/)
[TailwindCSS](https://tailwindcss.com/)
