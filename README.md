# LumeLearn — Next-Gen Student Dashboard

A futuristic, highly-animated student learning dashboard built with **Next.js 14 App Router**, **Supabase**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Dark-mode Bento Grid** layout with deep backgrounds and cyan/violet accents
- **Collapsible sidebar** with `layoutId` Framer Motion highlight animation
- **Server Components** for secure, SSR Supabase data fetching
- **Staggered page entrance** animations using `staggerChildren`
- **Spring physics** on all hover interactions (`type: "spring", stiffness: 300, damping: 20`)
- **Animated progress bars** that count up from 0 on card enter
- **Contribution activity graph** (16 weeks × 7 days)
- **`<Suspense>` skeleton loaders** with shimmer pulse animation
- **Graceful error handling** if Supabase is unreachable
- **Fully responsive**: sidebar → icon-only (tablet) → bottom nav (mobile)

## 🏗 Architecture

### Server / Client Component Split

| Component | Type | Reason |
|---|---|---|
| `app/page.tsx` | **Server** | Top-level layout, no interactivity |
| `CoursesSection` | **Server** | Fetches from Supabase via `@supabase/ssr` |
| `Sidebar` | **Client** | Collapse toggle, `layoutId` animations |
| `HeroTile` | **Client** | `whileHover` Framer Motion |
| `CourseCard` | **Client** | Animated progress bar via `useInView` |
| `ActivityTile` | **Client** | Staggered grid animations |
| `BentoGrid` | **Client** | `staggerChildren` orchestration |

The key insight: **data fetching stays on the server** (`CoursesSection` is async RSC), while **animation logic stays on the client**. Framer Motion's `"use client"` boundary is isolated at the leaf level.

### Supabase Security

- Credentials are accessed via `process.env` server-side only — never exposed to the browser
- `@supabase/ssr` with cookie-based auth-ready client
- Row Level Security enabled on the `courses` table

### Animation Strategy (Zero Layout Shifts)

All animations use **only `transform` and `opacity`** — no width/height/margin changes during animation, which would trigger layout/paint.

- `whileHover={{ scale: 1.015 }}` — GPU-composited
- Progress bar uses `motion.div` with animated `width` (this is fine since it's inside a fixed-height container)
- Stagger: `containerVariants.staggerChildren: 0.09s` with `y: 24 → 0` spring

## 🚀 Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourname/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/seed.sql`
3. Copy your **Project URL** and **anon public key** from Settings → API

### 3. Environment Variables

```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 4. Run Locally

```bash
npm run dev
# Open http://localhost:3000
```

## 📦 Deploy on Vercel

```bash
vercel deploy
```

Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel's Environment Variables dashboard.

## 🗂 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, font imports
│   ├── page.tsx            # Dashboard page (Server Component)
│   └── loading.tsx         # Route-level loading state
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx         # Collapsible nav (Client)
│   │   ├── BentoGrid.tsx       # Stagger animation wrapper (Client)
│   │   ├── HeroTile.tsx        # Welcome + streak (Client)
│   │   ├── CourseCard.tsx      # Dynamic course tile (Client)
│   │   ├── CoursesSection.tsx  # Data fetcher (Server)
│   │   ├── ActivityTile.tsx    # Contribution graph (Client)
│   │   └── StatsTile.tsx       # Weekly stats (Client)
│   └── ui/
│       ├── Skeleton.tsx        # Shimmer loaders
│       └── ErrorTile.tsx       # DB error state
├── lib/
│   ├── supabase.ts         # Server Supabase client
│   └── data.ts             # getCourses() fetch helper
├── types/
│   └── index.ts            # TypeScript interfaces
└── supabase/
    └── seed.sql            # DB schema + seed data
```

## Challenges & Decisions

- **`@supabase/ssr` vs `@supabase/supabase-js`**: Used `@supabase/ssr` for proper cookie-based session management and to ensure credentials never leak client-side.
- **Framer Motion + RSC**: Kept all `motion.*` components behind `"use client"` at the leaf level, not hoisted up, to preserve as much server rendering as possible.
- **Activity graph performance**: 112 cells rendered with staggered spring animations — used tiny delays (4ms each) to make it feel like a waterfall without janking the main thread.
