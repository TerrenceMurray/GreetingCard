import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og.png')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffd6e8"/>
      <stop offset="50%" stop-color="#d6e4ff"/>
      <stop offset="100%" stop-color="#d4f4d8"/>
    </linearGradient>
    <radialGradient id="bodyGrad" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#a8e670"/>
      <stop offset="55%" stop-color="#6fbf42"/>
      <stop offset="100%" stop-color="#3d8a25"/>
    </radialGradient>
    <radialGradient id="bellyGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#fff8d6"/>
      <stop offset="60%" stop-color="#f7e89c"/>
      <stop offset="100%" stop-color="#e6c95a"/>
    </radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff5b8a"/>
      <stop offset="50%" stop-color="#ffd166"/>
      <stop offset="100%" stop-color="#9b5de5"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- decorative balloons -->
  <g opacity="0.85">
    <ellipse cx="100" cy="200" rx="38" ry="48" fill="#ff5b8a" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
    <line x1="100" y1="248" x2="100" y2="380" stroke="rgba(0,0,0,0.25)" stroke-width="1"/>
    <ellipse cx="1100" cy="180" rx="38" ry="48" fill="#9b5de5" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
    <line x1="1100" y1="228" x2="1100" y2="360" stroke="rgba(0,0,0,0.25)" stroke-width="1"/>
    <ellipse cx="180" cy="500" rx="32" ry="42" fill="#ffd166" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
    <line x1="180" y1="542" x2="180" y2="640" stroke="rgba(0,0,0,0.25)" stroke-width="1"/>
    <ellipse cx="1040" cy="490" rx="32" ry="42" fill="#06d6a0" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
    <line x1="1040" y1="532" x2="1040" y2="640" stroke="rgba(0,0,0,0.25)" stroke-width="1"/>
  </g>

  <!-- title -->
  <text x="600" y="140" text-anchor="middle"
        font-family="Comic Sans MS, Comic Neue, Quicksand, sans-serif"
        font-size="76" font-weight="900"
        fill="url(#title)"
        stroke="rgba(122,44,78,0.45)" stroke-width="3" paint-order="stroke fill">
    HAPPY BIRTHDAY ASHAKI!
  </text>

  <text x="600" y="190" text-anchor="middle"
        font-family="Comic Sans MS, Quicksand, sans-serif"
        font-size="28" font-style="italic" fill="#6b3a55">
    a quirky lil frog for an even quirkier human
  </text>

  <!-- frog -->
  <g transform="translate(420, 240)">
    <!-- back legs -->
    <ellipse cx="55" cy="295" rx="58" ry="20" fill="#5fb13a" stroke="#2f6b1a" stroke-width="3"/>
    <ellipse cx="305" cy="295" rx="58" ry="20" fill="#5fb13a" stroke="#2f6b1a" stroke-width="3"/>

    <!-- body silhouette -->
    <path d="M 180 52
             C 240 52, 278 92, 278 138
             C 278 168, 268 188, 262 200
             C 280 198, 328 220, 328 258
             C 328 304, 282 322, 244 314
             C 214 306, 192 292, 180 282
             C 168 292, 146 306, 116 314
             C 78 322, 32 304, 32 258
             C 32 220, 80 198, 98 200
             C 92 188, 82 168, 82 138
             C 82 92, 120 52, 180 52 Z"
          fill="url(#bodyGrad)" stroke="#2f6b1a" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- belly -->
    <path d="M 180 158
             C 210 158, 230 178, 230 200
             C 230 215, 222 228, 218 238
             C 235 240, 268 252, 268 278
             C 268 304, 232 314, 208 308
             C 195 304, 186 296, 180 290
             C 174 296, 165 304, 152 308
             C 128 314, 92 304, 92 278
             C 92 252, 125 240, 142 238
             C 138 228, 130 215, 130 200
             C 130 178, 150 158, 180 158 Z"
          fill="url(#bellyGrad)" opacity="0.92"/>

    <!-- butt crack -->
    <path d="M 180 188 Q 174 240 180 295 Q 186 240 180 188 Z" fill="#2f6b1a" opacity="0.28"/>

    <!-- cheek blush -->
    <ellipse cx="80" cy="285" rx="22" ry="11" fill="#ff9bb6" opacity="0.6"/>
    <ellipse cx="280" cy="285" rx="22" ry="11" fill="#ff9bb6" opacity="0.6"/>

    <!-- eye bumps -->
    <ellipse cx="146" cy="68" rx="26" ry="28" fill="url(#bodyGrad)" stroke="#2f6b1a" stroke-width="3.5"/>
    <ellipse cx="214" cy="68" rx="26" ry="28" fill="url(#bodyGrad)" stroke="#2f6b1a" stroke-width="3.5"/>

    <!-- eyes -->
    <circle cx="146" cy="72" r="14" fill="#fff" stroke="#2f6b1a" stroke-width="2"/>
    <circle cx="214" cy="72" r="14" fill="#fff" stroke="#2f6b1a" stroke-width="2"/>
    <circle cx="146" cy="73" r="7" fill="#1a1a1a"/>
    <circle cx="214" cy="73" r="7" fill="#1a1a1a"/>
    <circle cx="148.5" cy="69.5" r="2.5" fill="#fff"/>
    <circle cx="216.5" cy="69.5" r="2.5" fill="#fff"/>

    <!-- nostrils -->
    <ellipse cx="170" cy="118" rx="2.2" ry="1.5" fill="#2f6b1a"/>
    <ellipse cx="190" cy="118" rx="2.2" ry="1.5" fill="#2f6b1a"/>

    <!-- smile -->
    <path d="M 158 134 Q 180 152 202 134" stroke="#2f6b1a" stroke-width="3.5" stroke-linecap="round" fill="none"/>

    <!-- face blush -->
    <ellipse cx="118" cy="120" rx="12" ry="7" fill="#ff9bb6" opacity="0.6"/>
    <ellipse cx="242" cy="120" rx="12" ry="7" fill="#ff9bb6" opacity="0.6"/>
  </g>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, png)
console.log(`Wrote ${out} (${png.length} bytes)`)
