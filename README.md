# A Letter in the Quiet ✉️

An interactive, scroll-driven epistolary web experience built with **Next.js**, **Motion** (Framer Motion), **Lenis Smooth Scroll**, and **Tailwind CSS**.

---

## ✨ Features

- **Word-by-Word Scroll Reveal**: As you scroll down, each word in the letter illuminates progressively with GPU-accelerated opacity, translateY, and subtle blur transforms.
- **Alternating Photo Parallax Sections**: Curated polaroid-style photography cards on alternating left and right sides with scroll-linked parallax, rotation, fine-art captions, and location timestamps.
- **Cinematic Ambient MP4 Video Background**: Smooth looping video background with film grain, vignette, and ambient golden glow. Includes a floating controls dock with play/pause and brightness dimmer.
- **Lenis Smooth Inertia Scrolling**: Silky smooth wheel and touch inertia scrolling for a contemplative reading cadence.
- **Soundtrack Companion & Audio Ready**:
  - Built-in soothing ambient sound generator (Web Audio API rain/breeze soundscape).
  - Ready for your own audio file: simply drop an audio file via the built-in uploader or place it in `public/` to play along with the letter!
- **Interactive Wax Seal**: A vintage stamped wax seal at the bottom of the letter that breaks when clicked to reveal a secret postscript (*P.S.*).
- **Reading Progress Bar**: Minimalist golden shimmer progress indicator and quick scroll-to-top navigation.

---

## 🚀 Getting Started

### 1. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Build for Production

```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── globals.css              # Tailwind CSS styles, Lenis rules, grain & vignette overlays
│   ├── layout.tsx               # Root layout & page metadata
│   └── page.tsx                 # Main letter composition & chapters
└── components/
    ├── SmoothScroll.tsx         # Lenis smooth scrolling provider
    ├── WordReveal.tsx           # Word-by-word scroll-linked reveal engine
    ├── LetterSection.tsx        # Section layout supporting left/right photos
    ├── PhotoCard.tsx            # Parallax polaroid card with adhesive tape & captions
    ├── BackgroundVideo.tsx      # Ambient background MP4 player with control dock
    ├── AudioCompanion.tsx       # Ambient sound generator & custom audio file player
    ├── HeaderNav.tsx            # Top reading progress indicator & quick nav
    └── WaxSeal.tsx              # Interactive seal with hidden postscript
public/
├── background.mp4               # Ambient looping background video
└── images/                      # Curated local photography
    ├── photo-1.jpg              # Sunlight in forest (left)
    ├── photo-2.jpg              # Ocean coastline (right)
    ├── photo-3.jpg              # Cozy warm hands & tea (left)
    └── photo-4.jpg              # Twilight starry sky (right)
```

---

## 🎵 Adding Your Audio File Later

When you have your audio file ready:
1. You can drop it directly into the `public/` folder (e.g. `public/music.mp3` or `public/audio.mp4`).
2. Or you can click the **Sound Companion** button in the bottom-left corner of the website and click **Upload Custom Audio** to test any track immediately in real-time.
