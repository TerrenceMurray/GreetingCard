import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Frog({ onPoke }) {
  const [poked, setPoked] = useState(0)

  const handlePoke = () => {
    setPoked((n) => n + 1)
    onPoke?.()
  }

  return (
    <motion.div
      className="frog-wrap"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.svg
        viewBox="0 0 360 360"
        className="frog-svg"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        onClick={handlePoke}
        whileTap={{ scale: 0.96 }}
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#a8e670" />
            <stop offset="55%" stopColor="#6fbf42" />
            <stop offset="100%" stopColor="#3d8a25" />
          </radialGradient>
          <radialGradient id="bellyGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff8d6" />
            <stop offset="60%" stopColor="#f7e89c" />
            <stop offset="100%" stopColor="#e6c95a" />
          </radialGradient>
          <radialGradient id="blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9bb6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff9bb6" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>

        {/* ===== back legs (behind body) ===== */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '180px 290px' }}
        >
          {/* left back leg */}
          <ellipse cx="55" cy="295" rx="58" ry="20" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="3" />
          {[18, 38, 58, 78, 98].map((x) => (
            <ellipse key={`lt${x}`} cx={x} cy={310} rx="7" ry="9" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="2" />
          ))}
          {/* right back leg */}
          <ellipse cx="305" cy="295" rx="58" ry="20" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="3" />
          {[262, 282, 302, 322, 342].map((x) => (
            <ellipse key={`rt${x}`} cx={x} cy={310} rx="7" ry="9" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="2" />
          ))}
        </motion.g>

        {/* ===== body silhouette: head + thicc butt as ONE heart-shape ===== */}
        <motion.g
          style={{ transformOrigin: '180px 200px' }}
          animate={{
            scale: poked ? [1, 1.06, 0.96, 1.03, 1] : [1, 1.015, 1],
          }}
          transition={{
            duration: poked ? 0.55 : 3.4,
            repeat: poked ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          key={`body-${poked}`}
        >
          {/* squish-only animation on the butt half */}
          <motion.g
            style={{ transformOrigin: '180px 245px' }}
            animate={{
              scaleX: poked ? [1, 1.14, 0.94, 1.04, 1] : 1,
              scaleY: poked ? [1, 0.88, 1.08, 0.97, 1] : 1,
            }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            key={`squish-${poked}`}
          >
            {/* main heart-shaped body — head curves into thicc butt */}
            <path
              d="
                M 180 52
                C 240 52, 278 92, 278 138
                C 278 168, 268 188, 262 200
                C 280 198, 328 220, 328 258
                C 328 304, 282 322, 244 314
                C 214 306, 192 292, 180 282
                C 168 292, 146 306, 116 314
                C 78 322, 32 304, 32 258
                C 32 220, 80 198, 98 200
                C 92 188, 82 168, 82 138
                C 82 92, 120 52, 180 52 Z
              "
              fill="url(#bodyGrad)"
              stroke="#2f6b1a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* belly: light heart on the front */}
            <path
              d="
                M 180 158
                C 210 158, 230 178, 230 200
                C 230 215, 222 228, 218 238
                C 235 240, 268 252, 268 278
                C 268 304, 232 314, 208 308
                C 195 304, 186 296, 180 290
                C 174 296, 165 304, 152 308
                C 128 314, 92 304, 92 278
                C 92 252, 125 240, 142 238
                C 138 228, 130 215, 130 200
                C 130 178, 150 158, 180 158 Z
              "
              fill="url(#bellyGrad)"
              opacity="0.92"
            />

            {/* butt crack down the middle */}
            <path
              d="M 180 188 Q 174 240 180 295 Q 186 240 180 188 Z"
              fill="#2f6b1a"
              opacity="0.28"
            />

            {/* dappled spots on cheeks */}
            <circle cx="62" cy="245" r="6" fill="#3d8a25" opacity="0.55" />
            <circle cx="48" cy="275" r="4" fill="#3d8a25" opacity="0.55" />
            <circle cx="90" cy="295" r="5" fill="#3d8a25" opacity="0.55" />
            <circle cx="298" cy="245" r="6" fill="#3d8a25" opacity="0.55" />
            <circle cx="312" cy="275" r="4" fill="#3d8a25" opacity="0.55" />
            <circle cx="270" cy="295" r="5" fill="#3d8a25" opacity="0.55" />

            {/* cheek blush */}
            <ellipse cx="80" cy="285" rx="22" ry="11" fill="url(#blush)" />
            <ellipse cx="280" cy="285" rx="22" ry="11" fill="url(#blush)" />

            {/* shine highlights on cheeks */}
            <ellipse cx="70" cy="225" rx="14" ry="22" fill="#ffffff" opacity="0.32" filter="url(#soft)" />
            <ellipse cx="290" cy="225" rx="14" ry="22" fill="#ffffff" opacity="0.32" filter="url(#soft)" />
          </motion.g>

          {/* ===== head details (face) ===== */}
          {/* eye bumps on top of head */}
          <ellipse cx="146" cy="68" rx="26" ry="28" fill="url(#bodyGrad)" stroke="#2f6b1a" strokeWidth="3.5" />
          <ellipse cx="214" cy="68" rx="26" ry="28" fill="url(#bodyGrad)" stroke="#2f6b1a" strokeWidth="3.5" />

          {/* eyes */}
          <Eye cx={146} cy={72} />
          <Eye cx={214} cy={72} />

          {/* nostrils */}
          <ellipse cx="170" cy="118" rx="2.2" ry="1.5" fill="#2f6b1a" />
          <ellipse cx="190" cy="118" rx="2.2" ry="1.5" fill="#2f6b1a" />

          {/* sweet smile */}
          <motion.path
            d="M 158 134 Q 180 152 202 134"
            stroke="#2f6b1a"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ['M 158 134 Q 180 152 202 134', 'M 158 134 Q 180 158 202 134', 'M 158 134 Q 180 152 202 134'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* tiny tongue tip — only visible mid-smile */}
          <path d="M 175 144 Q 180 150 185 144" fill="#ff7aa1" opacity="0.85" />

          {/* face blush */}
          <ellipse cx="118" cy="120" rx="12" ry="7" fill="url(#blush)" />
          <ellipse cx="242" cy="120" rx="12" ry="7" fill="url(#blush)" />
        </motion.g>

        {/* ===== arms (front feet poking out) ===== */}
        <motion.g
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 215px' }}
        >
          <ellipse cx="42" cy="218" rx="16" ry="22" fill="url(#bodyGrad)" stroke="#2f6b1a" strokeWidth="3" />
          {[28, 42, 56].map((x) => (
            <ellipse key={`la${x}`} cx={x} cy={240} rx="5" ry="7" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="2" />
          ))}
        </motion.g>
        <motion.g
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '318px 215px' }}
        >
          <ellipse cx="318" cy="218" rx="16" ry="22" fill="url(#bodyGrad)" stroke="#2f6b1a" strokeWidth="3" />
          {[304, 318, 332].map((x) => (
            <ellipse key={`ra${x}`} cx={x} cy={240} rx="5" ry="7" fill="#5fb13a" stroke="#2f6b1a" strokeWidth="2" />
          ))}
        </motion.g>

        {/* invisible click target over the butt */}
        <rect
          x="32"
          y="195"
          width="296"
          height="130"
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={handlePoke}
        />
      </motion.svg>
    </motion.div>
  )
}

function Eye({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="14" fill="#fff" stroke="#2f6b1a" strokeWidth="2" />
      <motion.g
        animate={{ x: [0, 2, -2, 0], y: [0, 1, -1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx={cx} cy={cy + 1} r="7" fill="#1a1a1a" />
        <circle cx={cx + 2.5} cy={cy - 2.5} r="2.5" fill="#fff" />
      </motion.g>
      {/* blink lid */}
      <motion.rect
        x={cx - 16}
        y={cy - 16}
        width="32"
        height="32"
        rx="14"
        fill="#5fb13a"
        animate={{ scaleY: [0, 0, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.93, 0.97, 1], ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </g>
  )
}
