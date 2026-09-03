# Honhaar Update Portal (Class Demonstration & Parody)

A modern, responsive class prank & parody web application inspired by the general design and user flow of scholarship portals (such as the Punjab HEC Honhaar Scholarship Program).

> **Important Safety & Legal Notice:**
> - This website is a **fictional class demonstration and harmless parody**.
> - It does **NOT** collect CNIC numbers, passwords, phone numbers, addresses, bank details, or any personal data.
> - No real government logos, trademarks, or copyrighted assets are used.
> - All records, status inquiries, and results are generated purely on the client side.

---

## 🌟 Features

- **Scholarship-Inspired Aesthetic:**
  - Designed with official deep forest green (`#085e35`), gold/amber accents, clean structured layout, and official-style circulars ticker.
- **Home Page (`/`):**
  - Navigation bar with helpline notice and mobile responsive drawer menu.
  - Notice Board ticker with rotating circulars.
  - Hero Section: *"Supporting Students. Building Futures."* with dual call-to-actions.
  - Information Cards: Eligibility Criteria, Application Process, Required Documents Checklist, and Important Dates Schedule.
  - Interactive FAQ Accordion.
  - Footer with legal disclaimers.
- **Application Status Inquiry (`/status`):**
  - Clean, safe status verification form.
  - Requires only a fictional Demo ID (e.g. `DEMO-2026-123`).
  - Includes quick-test sample IDs and auto-fill button.
- **Simulated Verification & Prank Reveal (`/status/result`):**
  - 2.5–3 second realistic loading sequence with rotating messages:
    - *"Verifying demonstration record..."*
    - *"Checking academic information..."*
    - *"Analyzing lecture attendance percentage..."*
    - *"Reviewing scholarship status..."*
    - *"Finalizing result..."*
  - **Prank Reveal:**
    - Confetti celebration animation (`canvas-confetti`).
    - Roman Urdu punchline:
      > **"Janab, application check karne se pehle thori attendance bhi check kar liya karein 😂"**
      > **"Congratulations! Aap officially class prank ka shikar ho chukay hain."**
    - Fake **"100% Pranked"** progress meter.
    - Official-style **"Certified Class Prank Victim"** credential with verification code, date, and humorous attendance deficit stamp (42.5%).
    - Interactive emoji reaction bar with click counters (`😂`, `💀`, `😭`, `☕`, `👏`).
    - **Secret Easter Egg:** Clicking the prank banner 3 times reveals the secret reassurance badge (*"Relax! This is only a class prank. No real information was collected."*).
    - One-click **"Prank a Classmate (Copy Link)"** and **"Try Again"** actions.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Canvas-Confetti & CSS keyframes
- **State/Data:** 100% Client-Side Mock Data (No Database / No API)
- **Deployment:** Vercel-ready

---

## 🛠️ Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run production build:**
   ```bash
   npm run start
   ```

---

## ☁️ Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **Deploy**.
4. The site will deploy instantly with zero additional environment configuration required.
