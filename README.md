# 🐾 Kennel & Clinic — Canine Reproduction Veterinary Website (Kenya)

> *"Where good litters begin."*  
> An award-calibre, single-page-first veterinary website built specifically for serious and hobby dog breeders in Kenya.

---

## 🎨 Design System & Palette

- **Bone / Linen Canvas**: `#F4EFE6` (Warm, non-clinical background)
- **Deep Forest Green**: `#1F3A2E` (Authoritative, natural, veterinary trust)
- **Burnt Terracotta Accent**: `#C8553D` (Warm African clay, vital energy)
- **Butter Yellow Mark**: `#E9C46A` (Accent highlights, glowing badges, stars)
- **Charcoal Type**: `#1B1B1B` (Ultra-high contrast, WCAG AAA compliant)
- **Typography**: 
  - Headlines: *Fraunces* (Characterful optical-size serif with mixed roman/italic weights)
  - Body & UI: *Plus Jakarta Sans* (Crisp, modern, highly legible grotesk)
  - Tactile Notes: *Caveat* (Human handwritten notes, authentic signatures, stamp annotations)

---

## 🚀 Key Features & Motion Engine

1. **Preloader & Curtain Wipe**: Sequential SVG paw prints pace across the dark forest screen while a counter climbs to 100%, followed by a smooth polygon `clip-path` curtain reveal.
2. **Custom Magnetic Cursor**: Dual-element cursor (terracotta dot + lagging forest ring driven by `gsap.quickTo`) with dynamic state morphing to display `"VIEW"` or `"🐾"` on hover. Automatically disabled on touch screens and under `prefers-reduced-motion`.
3. **Magnetic CTAs**: Interactive buttons smoothly pull towards the cursor within an 80px radius with elastic snap-back.
4. **Hero with Split Reveals**: Staggered animated lines, live `"Open today until 6:00 pm"` pulsing status chip, and a 26-second continuous rotating `"Pedigree-Safe Screening"` badge.
5. **Horizontal Pinned Journey**: A pinned 5-stage horizontal scroll section powered by GSAP ScrollTrigger, featuring a real-time progress bar tracking pre-breeding to 8-week puppy clearances.
6. **Velocity-Reactive Marquee**: Smooth infinite breed strip (Boerboel, Rhodesian Ridgeback, GSD, Cane Corso, etc.) that speeds up proportionally with scroll velocity.
7. **Interactive Service Rows with Cursor-Following Image Preview**: Hovering each service row smoothly repositions and reveals a floating case photo that follows the mouse with gentle inertia.
8. **Origin UI-Style Accessible Accordion**: Semantic ARIA controls, smooth grid-row expansions, and honest, practical Kenyan breeding guidance (costs, skip-a-heat rules, minimum breeding age).
9. **Litter Wall**: Polaroid masonry gallery with paper drop-shadows, subtle rotations (`-2.5deg` to `+2.2deg`), certified health clearance stamps, and click-to-zoom modal.
10. **Multi-Step Booking Form + WhatsApp Bridge**: 4-step wizard (Owner Info &rarr; Dog Profile &rarr; Service Choice &rarr; Date/Time) with inline validation that generates an instant, pre-filled WhatsApp link containing all variables for immediate booking.
11. **Kenya-Specific Details**: KES pricing, M-Pesa Buy Goods Till badge (# 7842901), tick-fever prophylaxis (Babesia / Ehrlichia), Brucellosis testing, and Kenya Kennel Club (KKC / EAKC) pedigree alignment.
12. **Playful Easter Eggs**: Clicking the header logo triggers a 12-paw runner trail across the screen; dedicated `404.html` page featuring an animated hound chasing its tail.

---

## 📂 Project Structure

```text
d:/SY_STEMS/dogs/
├── index.html            # Main single-page application with complete 12 sections & schema.org
├── 404.html              # Custom 404 page featuring animated dog chasing its tail
├── css/
│   └── styles.css        # Bespoke design tokens, tactile grain, animations, and responsive rules
├── js/
│   └── main.js           # GSAP & ScrollTrigger motion engine, cursor, multi-step booking & easter eggs
├── assets/               # Ready for your high-res photos and custom SVG logos
└── README.md             # Documentation, setup guide & customization instructions
```

---

## ⚡ How to Run Locally

### Option 1: Python Simple Server
```powershell
cd d:\SY_STEMS\dogs
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 2: VS Code Live Server / Antigravity
Open `index.html` with Live Server or click to view in your preferred browser.

---

## 🏷️ Placeholders to Replace Before Launch

| Placeholder | Location in `index.html` | Recommended Kenyan Value |
| :--- | :--- | :--- |
| **Clinic Name** | `<title>`, Header, Footer | e.g. *"Karen Canine Reproduction & Clinic"* or *"Ridgeback & Kennel Vet"* |
| **Phone / WhatsApp Number** | `https://wa.me/254712345678`, `tel:` | Your real Kenyan Safaricom line (e.g. `+254 7XX XXX XXX`) |
| **Emergency Night Hotline** | Footer, Emergency CTA | 24/7 on-call triage cell (e.g. `+254 722 000 999`) |
| **M-Pesa Till Number** | Section 9 (Pricing) | Your Safaricom Buy Goods Till or Paybill Number |
| **Physical Address** | Section 12 (Footer) | Real road/gate number (e.g. *"Karen Plains Road, opposite Karen Country Lodge, Nairobi"*) |
| **Photos of Real Kennels** | Hero, Vet, Litter Wall | Swap Unsplash URLs with real photos of your Nairobi/Naivasha clients and pups |
| **Pricing Figures** | Section 9 (Pricing Cards) | Adjust starting KES values to match your clinic fee schedule |

---

## 💡 5 Ideas to Take It Further

1. **Interactive Progesterone & Ovulation Predictor Tool**
   - Add a client-facing calculator where breeders enter their dam's serial blood progesterone readings (e.g. 2.1 ng/mL, 5.4 ng/mL).
   - Automatically graphs the curve and outputs: *"Predicted Ovulation: Within 24-36 hrs. Optimal Mating Window: Saturday morning & Sunday evening."*

2. **Kenyan Stud Dog Directory & Frozen Semen Bank**
   - Create a vetted registry of health-cleared stud dogs (Boerboels, German Shepherds, Malinois) with verified KKC pedigree papers, Brucella-negative certificates, and hip dysplasia scores.
   - Allows breeders to browse studs and book chilled/frozen semen insemination directly through the clinic.

3. **Litter Waitlist & Puppy Reservation Gateway**
   - Enable certified client breeders to list upcoming confirmed ultrasound litters.
   - Prospective puppy buyers pay a reservation deposit via M-Pesa Daraja API, backed by your clinic's health guarantee.

4. **Digital Whelping Room Companion (PWA / Mobile Web App)**
   - A dedicated mobile tool for breeders during whelping: countdown timers between pups, weight tracking chart for each newborn pup, temperature drop logger, and a one-tap emergency call button.

5. **"The Kenyan Breeder's Journal" (Content Hub & Podcast)**
   - Editorial articles addressing specific East African breeding challenges: preventing tick-borne biliary fever in newborn pups, feeding raw vs. imported kibble, navigating Kenya Kennel Club pedigree transfers, and importing champion bloodlines through JKIA.
