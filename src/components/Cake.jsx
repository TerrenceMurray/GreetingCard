import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Cake() {
  const [blown, setBlown] = useState(false)

  return (
    <div className="cake-wrap" onClick={() => setBlown((b) => !b)} title="psst — click to blow out the candles">
      <motion.svg
        viewBox="0 0 220 200"
        className="cake-svg"
        preserveAspectRatio="xMidYMid meet"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* plate */}
        <ellipse cx="110" cy="180" rx="100" ry="10" fill="#d6cdfb" />
        {/* base layer */}
        <rect x="20" y="120" width="180" height="55" rx="10" fill="#f7c6d9" stroke="#c14b7e" strokeWidth="2" />
        {/* drip */}
        <path
          d="M 22 130 Q 40 152 60 132 Q 80 154 100 132 Q 120 154 140 132 Q 160 154 180 132 Q 195 150 198 130 L 198 122 L 22 122 Z"
          fill="#fff5fa"
          stroke="#c14b7e"
          strokeWidth="2"
        />
        {/* top layer */}
        <rect x="55" y="80" width="110" height="45" rx="8" fill="#9be36a" stroke="#2f6b1a" strokeWidth="2" />
        {/* sprinkles on green frog-themed icing */}
        <circle cx="70" cy="98" r="2" fill="#ff5b8a" />
        <circle cx="95" cy="105" r="2" fill="#ffd166" />
        <circle cx="120" cy="92" r="2" fill="#118ab2" />
        <circle cx="145" cy="105" r="2" fill="#9b5de5" />
        <circle cx="155" cy="95" r="2" fill="#ff5b8a" />
        {/* tiny frog face on cake */}
        <circle cx="85" cy="92" r="2.5" fill="#fff" />
        <circle cx="85" cy="92" r="1.2" fill="#1a1a1a" />
        <circle cx="93" cy="92" r="2.5" fill="#fff" />
        <circle cx="93" cy="92" r="1.2" fill="#1a1a1a" />

        {/* candles */}
        {[80, 110, 140].map((x, i) => (
          <g key={i}>
            <rect x={x - 3} y="55" width="6" height="28" fill="#fff" stroke="#333" strokeWidth="1" />
            <rect x={x - 3} y="62" width="6" height="3" fill="#ff5b8a" />
            <rect x={x - 3} y="72" width="6" height="3" fill="#ffd166" />
            {/* wick */}
            <line x1={x} y1="55" x2={x} y2="50" stroke="#333" strokeWidth="1.5" />
            {/* flame */}
            {!blown && (
              <motion.path
                d={`M ${x} 50 Q ${x - 5} 42 ${x} 32 Q ${x + 5} 42 ${x} 50 Z`}
                fill="#ffb142"
                stroke="#ff7e1a"
                strokeWidth="1"
                animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: `${x}px 50px` }}
              />
            )}
            {/* puff of smoke when blown */}
            {blown && (
              <motion.circle
                cx={x}
                cy={45}
                r={4}
                fill="#cccccc"
                initial={{ opacity: 0.7, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -30, scale: 2 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            )}
          </g>
        ))}
      </motion.svg>
    </div>
  )
}
