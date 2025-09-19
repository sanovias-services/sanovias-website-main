# Developer Docu

## Introduction
See vendor docu for more information about how to start the app locally, learn about the Next.JS framework, or deploy the app on Vercel.

## Configuration files :
* package.json: lists dependencies (next, react, react-dom) and scripts (dev, build, start)
* next.config.ts: used to customise Next.Js behaviour (redirects, environment variables, image optimization, etc.)
* tsconfig.json: configuration of typescript
* eslintrc.json: eslint rules for clean code

## Strcuture (Client/Server)
Client components (Interactive UI elements) run in browser while server components (default) run on server.
* Front-end: React components (pages, layouts, components) running in the browser. The TSX files use JSX syntax (xml injected within javascript) for React components. Files with directive "use client" are client components.
* Back-end: API routes are Node.js functions, running on server side, and can connect to DB, CRM, or perform secure operations. Therefore, no need to setup Express.js in addition. API routes (located in /api/) always run on server side to process HTTP requests and return data (JSON, etc.), not UI elements. That is why the are in .ts format.

## How to run
* Development: (npm run dev) spins up a nodejs server (using vite and turbopack under the hood)
* Production: Can be deployed to Vercel, Nodejs server, or some cloud like AWS. TBD

# Vendor Docu
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
