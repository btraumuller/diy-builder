# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (Turbopack)
npm run build    # Production build + type-check
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

Node.js is installed via NVM but may not be on the session PATH. If `npm` is not found, prepend `C:\Program Files\nodejs` to `$env:PATH` before running commands:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

There are no tests configured yet.

## Architecture

**Framework:** Next.js 16 App Router with TypeScript, Tailwind CSS v4, and React 19.

**Path alias:** `@/` maps to `src/`.

### Auth (`src/auth.ts`)
NextAuth v5 (beta) is configured here — exports `{ handlers, auth, signIn, signOut }`. Currently uses a placeholder Credentials provider. The `authorize` function is where real DB lookup and password verification should be added. The catch-all route at `src/app/api/auth/[...nextauth]/route.ts` re-exports the handlers. Session strategy is JWT. The custom sign-in page route is `/auth/signin` (not yet created).

### Database (`src/lib/mongodb.ts`)
Exports a single `connectDB()` function that connects Mongoose and caches the connection on the Node.js global to survive hot-reloads in dev. Call `await connectDB()` at the top of any Server Component or API route that needs DB access. Mongoose models should be defined in `src/models/` (not yet created).

### Session (`src/components/SessionProvider.tsx`)
A thin `"use client"` wrapper around NextAuth's `SessionProvider`. It is mounted in `src/app/layout.tsx` so `useSession()` is available anywhere in the tree.

### Environment variables (`.env.local`)
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Mongoose connection string |
| `AUTH_SECRET` | NextAuth signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### Theme
Use the font and stylings that we see from https://www.lowes.com

### Responsiveness
Use make sure that components built stack on devices that have a width of 768px or less

### Accessibility
Make sure that we are applying the WCAG 2.2 guidelines when building our code. 