import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#ff5b8a', '#ffd166', '#06d6a0', '#118ab2', '#9b5de5', '#f15bb5', '#9be36a']
const SHAPES = ['rect', 'circle', 'triangle']

export default function Confetti({ count = 60, burstKey = 0 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.4 + Math.random() * 2.6,
        rotate: Math.random() * 720 - 360,
        size: 6 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        drift: (Math.random() - 0.5) * 80,
      })),
    [count, burstKey],
  )

  return (
    <div className="confetti-layer" key={burstKey}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.4 : p.size,
            background: p.shape === 'triangle' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : undefined,
            borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : undefined,
            borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : undefined,
          }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            x: p.drift,
            rotate: p.rotate,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}
