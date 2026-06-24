# Built-in Memories — PWA Setup Guide

## What this gives you
A fully installable app on **Android and iPhone** — looks and feels like a native app,
no browser tabs or address bar visible, works offline, and has a home screen icon.

---

## Step 1 — Deploy to Vercel (free, takes 3 minutes)

Vercel is what your current app uses. Just update it with these new files.

1. Go to your Vercel project dashboard
2. Connect it to a GitHub repo (if not already)
3. Replace the project files with everything in this folder
4. Push to GitHub — Vercel auto-deploys

Or use Vercel CLI:
```bash
npm install -g vercel
npm install
vercel --prod
```

---

## Step 2 — Install on Android

1. Open **Chrome** on your Android phone
2. Go to your app URL (e.g. `https://your-app.vercel.app`)
3. Tap the **⋮ menu** (top right)
4. Tap **"Add to Home screen"**
5. Tap **"Add"** — done ✓

The app will appear on your home screen with the BIM icon.
When you open it, there's no Chrome address bar — full screen like a real app.

---

## Step 3 — Install on iPhone / iPad

1. Open **Safari** on your iPhone (must be Safari, not Chrome)
2. Go to your app URL
3. Tap the **Share button** (box with arrow, bottom center)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **"Add"** — done ✓

The app opens in full screen with no Safari address bar, no tabs.
The BIM splash screen shows while loading.

> ⚠️ iPhone tip: Must use Safari. Chrome on iPhone cannot install PWAs.

---

## File structure

```
bim-pwa/
├── index.html              ← Updated with all PWA meta tags
├── package.json            ← Includes vite-plugin-pwa
├── vite.config.ts          ← PWA plugin configured
├── tsconfig.json
├── tsconfig.node.json
├── src/
│   ├── App.tsx             ← Your full app with Google Sheets sync
│   └── main.tsx
└── public/
    ├── manifest.json       ← PWA manifest (name, icons, colors)
    ├── sw.js               ← Service worker (offline support)
    └── icons/
        ├── icon-72x72.png
        ├── icon-96x96.png
        ├── icon-128x128.png
        ├── icon-144x144.png
        ├── icon-152x152.png
        ├── icon-192x192.png
        ├── icon-384x384.png
        ├── icon-512x512.png
        ├── apple-touch-icon.png     ← iOS home screen icon
        ├── apple-splash-*.png       ← iOS launch screens (7 sizes)
```

---

## What works offline
- Viewing existing bookings, financials, dashboard
- The app shell loads from cache

## What needs internet
- Google Sheets sync (save/restore)
- Font loading (cached after first visit)
