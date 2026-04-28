import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function Background() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 38,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 40,
      })),
    [],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        top: Math.random() * 80,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 3,
      })),
    [],
  )

  const flies = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        top: 10 + Math.random() * 60,
        delay: Math.random() * 4,
        duration: 14 + Math.random() * 10,
      })),
    [],
  )

  return (
    <div className="bg-layer" aria-hidden>
      {/* drifting bubbles */}
      {bubbles.map((b) => (
        <motion.span
          key={b.id}
          className="bubble"
          style={{ left: `${b.left}%`, width: b.size, height: b.size }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-15vh', x: b.drift, opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* twinkling sparkles */}
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.4,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 1,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* a couple of lazy flies looping around */}
      {flies.map((f) => (
        <motion.div
          key={f.id}
          className="fly"
          style={{ top: `${f.top}%` }}
          initial={{ x: '-10vw' }}
          animate={{ x: '110vw', y: [0, -20, 10, -15, 0] }}
          transition={{
            x: { duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'linear' },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <ellipse cx="12" cy="13" rx="4" ry="2.5" fill="#2a2a2a" />
            <ellipse cx="9" cy="10" rx="4" ry="2.2" fill="#cfeaff" opacity="0.8" />
            <ellipse cx="15" cy="10" rx="4" ry="2.2" fill="#cfeaff" opacity="0.8" />
            <circle cx="12" cy="11" r="1.4" fill="#ff5b8a" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
