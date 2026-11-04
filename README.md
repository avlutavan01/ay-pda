# AYPDA – Premium 3D Personal Political & Public Profile Website

**Official Digital Identity of Abhishek Yadav (AYPDA)**  
*Digital Creator, Youth Advocate & Public Voice*

---

## 1. Project Overview

AYPDA is an international award-standard, fully responsive, bilingual (English & Hindi) multi-page personal political and public profile website for **Abhishek Yadav**.

Inspired by premium international political leaders' digital platforms (such as the reference design philosophy of the Asif Mahmud website), the site incorporates:
- **Cinematic 3D Hero Section** with depth, floating ambient particles, 3D mouse parallax tracking, and glowing rim lighting.
- **Deep Navy & Emerald Gradient Palette** (`#071426`, `#0A192B`, `#003E32`, with `#1769FF` electric blue and `#16C7A2` turquoise accents).
- **Glassmorphism & Advanced Motion Effects** using GSAP, ScrollTrigger, AOS, and 3D card tilt.
- **Bilingual Multi-Page Architecture** supporting both English (`/en/`) and Hindi (`/hi/`) with automatic language persistence and path preservation when toggling languages.
- **Zero Broken Links and Verified Data Integrity**: Strictly grounded in verified profile details (Aurora Degree College, Secunderabad hometown, Shadnagar current base, Digital Creator category, official Facebook profile) with clearly designated placeholders for upcoming public milestones.

---

## 2. Technology Stack

- **HTML5**: Clean, accessible, semantic markup with Open Graph, Twitter Cards, canonical links, and `hreflang` tags.
- **CSS3 & Custom Variables**: Advanced 3D perspective transforms, neon glows, glassmorphism, responsive clamping, and custom desktop cursor.
- **JavaScript (ES6+)**: Custom mouse tracking, sticky header blur, contact form validation, toast notifications, and language routing.
- **GSAP & ScrollTrigger**: Cinematic hero text staggering, parallax background depth, and smooth timelines.
- **AOS (Animate On Scroll)**: Controlled reveal animations for cards and milestones.
- **VanillaTilt.js**: 3D perspective tilt on interactive cards and portrait.
- **Canvas-Confetti**: Celebratory feedback upon contact form completion.
- **Font Awesome 6 & Google Fonts**: *Plus Jakarta Sans*, *Poppins*, *Hind*, and *Noto Sans Devanagari*.

---

## 3. Directory & File Structure

```text
Ay-PDA/
├── index.html                  # Root gateway with auto-language routing
├── sitemap.xml                 # Full SEO XML sitemap with hreflang pairs
├── robots.txt                  # Search engine crawling rules
├── README.md                   # Complete documentation
│
├── en/                         # English Multi-Page Site (10 Pages)
│   ├── index.html              # 3D Hero & Homepage
│   ├── about.html              # Biography & Education (Aurora College)
│   ├── journey.html            # Chronological Milestone Timeline
│   ├── vision.html             # PDA Ideology & Strategic Pillars
│   ├── activities.html         # Ground Activities & Searchable Grid
│   ├── news.html               # Press Releases & Updates
│   ├── gallery.html            # Photo Gallery & Interactive Lightbox
│   ├── videos.html             # Video Player Modal & Keynote Speeches
│   ├── achievements.html       # Verified Credentials & Milestone Cards
│   └── contact.html            # Enquiry Form & Verified Social Links
│
├── hi/                         # Hindi Multi-Page Site (10 Pages)
│   ├── index.html              # 3D मुख्य पृष्ठ (होम)
│   ├── about.html              # जीवन परिचय एवं पृष्ठभूमि
│   ├── journey.html            # कालानुक्रमिक जीवन यात्रा
│   ├── vision.html             # दृष्टिकोण व मिशन (पीडीए विचार)
│   ├── activities.html         # सार्वजनिक गतिविधियां व जन-संवाद
│   ├── news.html               # समाचार एवं प्रेस विज्ञप्तियां
│   ├── gallery.html            # फोटो गैलरी (चित्र दीर्घा)
│   ├── videos.html             # वीडियो गैलरी व भाषण
│   ├── achievements.html       # उपलब्धियां एवं प्रमाणित रिकॉर्ड
│   └── contact.html            # सीधा जन-संवाद प्रपत्र व संपर्क
│
├── assets/
│   ├── images/                 # High-resolution SVG vectors & artwork
│   │   ├── logo.svg            # AYPDA brand emblem
│   │   ├── hero-portrait.svg   # 3D Layered leadership portrait
│   │   ├── event-*.svg         # Event & Activity visual assets
│   │   ├── gallery-*.svg       # Gallery masonry photos (1-8)
│   │   ├── news-*.svg          # News article visual banners (1-4)
│   │   └── video-thumb-*.svg   # Video thumbnails (1-4)
│   ├── icons/
│   │   └── favicon.svg         # AYPDA monogram favicon
│   └── fonts/
│
├── css/
│   ├── style.css               # Core styling, glassmorphism, typography
│   ├── animations.css          # 3D motion, cursor styles, preloader
│   ├── responsive.css          # Mobile drawer & touch adaptations
│   └── custom.css              # Devanagari typography, lightbox, modals
│
└── js/
    ├── main.js                 # Preloader, cursor, sticky header, forms
    ├── animations.js           # GSAP timeline, 3D mouse parallax, counters
    ├── gallery.js              # Category filter, search, lightbox, video modal
    └── language.js             # Bilingual URL path switcher
```

---

## 4. How to Run Locally

Because this project is built entirely on native HTML5, CSS3, and modern browser-compatible JavaScript (with standard CDN dependencies), you can run it immediately without complex installation steps.

### Option A: Direct Browser Launch
1. Navigate to `c:\Users\user\Downloads\Ay-PDA\`.
2. Double-click `index.html` (or `en/index.html`) in Windows Explorer.
3. The website will open in your default browser (Chrome, Edge, Firefox, Brave).

### Option B: Local Static Server (Recommended)
If you have any local HTTP server tool installed, you can serve the directory:

**Using Python (if installed):**
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080`

**Using Node / npx:**
```bash
npx serve .
```

**Using VS Code Live Server:**
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 5. Verified Profile Information Summary

- **Name:** Abhishek Yadav
- **Brand Identity:** AYPDA
- **Education:** Aurora Degree College
- **Current Operational Base:** Shadnagar, Telangana
- **Hometown:** Secunderabad, Telangana
- **Category:** Digital Creator (Meta Verified)
- **Primary Social Channel:** [facebook.com/abhishek.yadav.625383/](https://www.facebook.com/abhishek.yadav.625383/)
- **Core Vision:** PDA (Pichhda, Dalit, Alpsankhyak) Social Justice, Youth Skilling, Higher Education Mentorship, and Regional Infrastructure.

---

## 6. Testing & Quality Assurance Checklist

- [x] **3D Hero Section Parallax:** Verified 3D mouse tilt tracking and ambient glow backplate response.
- [x] **Bilingual Switching:** Preserves corresponding page path across `/en/` and `/hi/`.
- [x] **Devanagari Typography:** Optimized font rendering with Google Fonts *Hind* and *Noto Sans Devanagari*.
- [x] **Media Lightbox & Video Player:** Image lightbox opens seamlessly with Next/Prev navigation; video modal launches 16:9 YouTube iframe.
- [x] **Form Validation:** Real-time feedback, celebratory confetti, and toast notification on submit.
- [x] **Zero Broken Assets:** 100% locally generated SVG visual assets for logos, portraits, galleries, and news cards.
- [x] **SEO & Social Metadata:** Full `og:`, `twitter:`, canonical, XML sitemap, and `robots.txt` configured.
