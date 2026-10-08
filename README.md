# Medora

Doctor discovery, appointment UI, doctor profiles, and a PostgreSQL-backed doctor portal built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to a PostgreSQL database.
3. Set `AUTH_SECRET` to a private random string of at least 32 characters. For example, run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and use its output.
4. Generate the Prisma client and apply the schema with `npm run db:generate` and `npm run db:migrate`.
5. Start the app with `npm run dev`.

Doctor accounts can register at `/register`, sign in at `/login`, and manage profile details and video links at `/dashboard`. Profile photos, reel covers, and videos are stored as URLs; upload hosting is not included. Publicly registered doctors with a non-empty bio appear in the directory.

The appointment form currently provides a front-end confirmation only. Appointment requests are not persisted.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
