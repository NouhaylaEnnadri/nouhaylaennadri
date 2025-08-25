# Nouhayla Ennadri — Blog

A production blog built with **Next.js**, **Tailwind CSS + DaisyUI**, and **Hygraph (GraphQL)**. Deployed on **Vercel**.

**Live**: https://noylblog.vercel.app  
**Repo**: https://github.com/NouhaylaEnnadri/nouhaylaennadri  <!-- update after rename -->

## Features
- Hygraph-powered posts (GraphQL)
- Categories & tags
- Responsive UI + dark mode (DaisyUI)
- SEO: dynamic metadata + Open Graph image
- Fast images via `next/image`

## Tech Stack
Next.js • Tailwind CSS • DaisyUI • Hygraph (GraphQL) • Vercel

## Screenshots
> Add 2–3 images in `/docs/screenshots/` and embed them here:
![Home](docs/screenshots/home.png)
![Post](docs/screenshots/post.png)

## Getting Started
```bash
git clone https://github.com/NouhaylaEnnadri/nouhaylaennadri.git
cd nouhaylaennadri
npm i
cp .env.example .env.local
# Fill in your Hygraph endpoint + token
npm run dev
