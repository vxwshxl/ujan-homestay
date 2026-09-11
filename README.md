<p align="center">
  <img src="./public/images/ujan-profile.jpg" width="92" height="92" alt="Ujan Homestay logo" />
</p>

<h1 align="center">Ujan Homestay</h1>

<p align="center">
  A calm, image-led booking website for Ujan Homestay in Hatigaon, Guwahati.
</p>

<p align="center">
  <a href="https://www.instagram.com/ujanhomestay/">Instagram</a>
  ·
  <a href="https://wa.me/919864916371?text=Hi%20Ujan%20Homestay%2C%20I%20want%20to%20book%20a%20stay.">WhatsApp Booking</a>
  ·
  <a href="https://github.com/emilkowalski/skills">Design Skill Reference</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=nextdotjs" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10.26-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="WhatsApp Ready" src="https://img.shields.io/badge/WhatsApp-Booking-128C7E?style=for-the-badge&logo=whatsapp&logoColor=white" />
</p>

---

## Preview

| First View | Gallery |
| --- | --- |
| Brand-forward hero with Ujan imagery, location signal, and direct booking CTA. | Local image gallery using Ujan's public Instagram room and reel assets. |

## Feature Deck

| Surface | What It Does | Why It Matters |
| --- | --- | --- |
| Centered brand header | Keeps the Ujan logo and app name in the middle while booking stays on the right. | The property identity is visible immediately without hiding the conversion action. |
| WhatsApp booking | Uses a `wa.me` deep link with prefilled booking text. | Guests can start a booking without forms, accounts, or friction. |
| Branded hero | Uses a real Ujan visual asset as the first viewport. | The site feels specific to the homestay from second one. |
| Amenities grid | AC rooms, Wi-Fi, parking, kitchen access, safety, and hospitality. | Travelers can scan the stay details quickly. |
| Image proof | Downloaded public Ujan images are stored in `public/images`. | The site does not depend on Instagram CDN at runtime. |
| Motion polish | Press feedback, custom easing, hover guards, reduced-motion handling. | Inspired by Emil Kowalski's `emil-design-eng` skill without adding noisy animation. |

## Stack

```txt
Framework     Next.js 16 App Router
Runtime       React 19
Package mgr   pnpm
Styling       Tailwind CSS 4 + small global CSS polish
Icons         lucide-react
Motion rules  emilkowalski/skills -> emil-design-eng
Booking       WhatsApp deep link
```

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev      # start local development
pnpm build    # production build
pnpm start    # run production server
pnpm lint     # lint the project
```

## Content Notes

The site content is based on Ujan Homestay's public Instagram and indexed listing data:

- Ujan Homestay, Hatigaon, Mother Teresa Path, Guwahati.
- House No. 38, opposite Hatigaon Police Station.
- Booking numbers: `98649-16371` and `88766-33455`.
- Publicly posted stay features: AC rooms, Wi-Fi, parking, kitchen access, clean rooms, safe family-friendly environment.

## Asset Map

```txt
public/images/ujan-profile.jpg  # centered logo/app mark
public/images/ujan-house.jpg    # hero brand visual
public/images/ujan-living.jpg   # room/gallery collage
public/images/ujan-kitchen.jpg  # vertical room preview
public/images/ujan-corner.jpg   # vertical room preview
public/images/ujan-room.jpg     # room detail
```

## Design Direction

Quiet hospitality, not hotel-template noise. The UI keeps a warm green/orange accent system, compact 8px-radius cards, tactile button press states, and short purposeful transitions under 300ms.
