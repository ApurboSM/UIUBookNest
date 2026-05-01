# UIUBookNest

The smart campus bookstore for **United International University (UIU)** — curated textbooks, stationery, exam supplies, and UIU merchandise with **BOPIS pickup at the UIU Campus Store** or **Pathao / RedX delivery** across Dhaka. Pay with **bKash, Nagad,** or **Cash on Delivery**.

> Academic capstone — **MGT 3225 E-Business · Spring 2026 · Group 07 Section B**
> Md Abidur Rahman · Tahmeed Imam · Jihan Mahamud · Muhammad Maruf Khan

![UIUBookNest hero](./public/logo.png)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with CSS variables |
| Components | Custom shadcn-style primitives on Radix UI |
| Motion | `framer-motion` for subtle fade-ups |
| Icons | `lucide-react` + inline brand SVGs |
| State (next iteration) | `zustand` |
| Fonts | Playfair Display (headlines) + Inter (body) |

## Brand

- **Primary**: `#E8671A` (orange, matched to the owl-with-book logo)
- **Background**: `#0A0A0A` (deep black)
- **Surfaces**: `#141414` / `#1C1C1C`
- Dark theme by default — extracted from the logo's black background

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build (Turbopack)
pnpm start        # serve the production build
pnpm lint         # ESLint
```

## Project structure

```
uiu-booknest/
├─ public/
│  ├─ logo.png                  # UIU BookNest owl logo
│  └─ books/                    # 17 real textbook covers + placeholders
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             # root layout, fonts, AnnouncementBar/Header/Footer
│  │  ├─ page.tsx               # landing
│  │  ├─ globals.css            # theme tokens (dark + orange)
│  │  ├─ shop/page.tsx
│  │  ├─ shop/[slug]/page.tsx   # dynamic product detail (28 SSG'd routes)
│  │  ├─ courses/page.tsx       # 4 schools, deep-linked to UIU eLMS
│  │  ├─ cart/page.tsx
│  │  ├─ checkout/page.tsx
│  │  ├─ order-confirmation/page.tsx
│  │  ├─ return-policy/page.tsx # full content
│  │  ├─ privacy-notice/page.tsx# full content
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ layout/                # Header, Footer, AnnouncementBar
│  │  ├─ home/                  # Hero, CategoryGrid, FeaturedBooks, BopisBanner, CoursesPreview, HowItWorks, TrustBadges, Newsletter
│  │  ├─ shop/product-card.tsx
│  │  ├─ shared/                # Logo, PageShell, SectionHeading, PriceTag, StockBadge
│  │  └─ ui/                    # Button, Badge, Card, Input, Sheet, Separator
│  ├─ data/
│  │  ├─ categories.ts          # 4 category definitions
│  │  ├─ products.ts            # 28 SKUs (17 textbooks + 4 stationery + 3 exam + 4 merch)
│  │  └─ courses.ts             # 4 schools × departments × sample courses → UIU eLMS deep links
│  ├─ lib/
│  │  ├─ utils.ts               # cn()
│  │  └─ format.ts              # formatBDT() — Bangladeshi taka formatting
│  └─ types/index.ts
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

## MGT 3225 Checklist — Phase Coverage

| Phase | Status | Notes |
|---|---|---|
| **Phase 1 — Setup** | ✅ Done | Next.js project, BDT formatter, brand color `#E8671A`, Playfair + Inter, hero above the fold |
| **Phase 2 — Catalogue** | 🟠 In progress | 28 products across 4 categories already seeded in `data/products.ts`. Featured grid live on landing. Full shop filtering ships next iteration |
| **Phase 3 — Checkout** | ⏭ Up next | Skeleton route present with the full plan inline. Cart store, Student ID field, BOPIS toggle, and bKash/Nagad/COD flow ship next |
| **Phase 4 — Trust Block + Footer** | ✅ Done | DBID placeholder, DCOG-2021 line, return policy, privacy notice, UIU contact all live in footer + dedicated pages |
| **Phase 5 — Final Checks** | 🕒 Later | Will run the incognito purchase journey once Phase 3 ships |

### Bangladesh-specific context (live on homepage)

- ✅ **bKash** mention in hero subhead, BOPIS banner, and floating callout
- ✅ **Nagad** mention in hero subhead and BOPIS banner
- ✅ **Pathao / RedX** delivery option in announcement bar, hero, and BOPIS banner
- ✅ **BDT (৳)** currency symbol on every price (via `formatBDT`)
- ✅ **UIU branding** in logo, hero, courses preview, and footer address
- ✅ **DBID + DCOG-2021 + Consumer Rights Protection Act 2009** in footer + trust badges + privacy notice

## Routes summary (41 total)

```
/                          landing
/shop                      catalogue (skeleton + 4 preview cards)
/shop/[slug]               product detail (28 prerendered)
/courses                   browse by school → UIU eLMS deep links
/cart                      cart skeleton
/checkout                  checkout skeleton
/order-confirmation        confirmation skeleton (with mock order)
/about                     about + team
/contact                   contact channels + form preview
/return-policy             7-day return policy (full)
/privacy-notice            CRPA 2009 / DCOG-2021 (full)
```

## Deferred to next iteration

- Functional cart with Zustand + localStorage
- Shop catalogue with category filter, search results, and stock-aware empty states
- Full checkout with Student ID validation, BOPIS toggle, and payment selector
- Real order generation + email-style confirmation
- About / Contact form wiring

## Credits

- Real textbook covers: Mankiw, Kotler, Griffin, Weygandt, Lynch, Lind, Kelly, Eastwood, Van Schendel, Griffiths, Levin, Mohri, Blyth, Carmona, Godbey, Tewari, Lial.
- UIU eLMS deep links pulled from <https://elms.uiu.ac.bd/>.
- Inspired by, and respectful of, UIU's official brand at <https://www.uiu.ac.bd/>.
