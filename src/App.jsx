import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Frog from './components/Frog'
import Confetti from './components/Confetti'
import Background from './components/Background'
import Cake from './components/Cake'
import { playHappyBirthday, stopMusic, subscribeMusic, playFart } from './utils/audio'
import './index.css'

const FRIEND_NAME = 'Ashaki'

const QUIRKY_NOTES = [
  'one (1) thicc frog, signed sealed delivered to ashaki',
  'may your year be as iconic as a frog booty',
  'you are the funkiest amphibian i know',
  'wishing you a year full of weird little joys',
  'staying weird is a full-time job and you nail it',
]

const HEART_COLORS = ['#ff5b8a', '#ffd166', '#06d6a0', '#9b5de5']

export default function App() {
  const [scene, setScene] = useState('intro')
  const [burst, setBurst] = useState(0)
  const [note, setNote] = useState(0)
  const [pokes, setPokes] = useState(0)
  const [hearts, setHearts] = useState([])

  const openCard = () => {
    setScene('party')
    setBurst((b) => b + 1)
    playHappyBirthday()
  }

  useEffect(() => {
    return () => stopMusic()
  }, [])

  const onPoke = () => {
    setPokes((p) => p + 1)
    setNote((n) => (n + 1) % QUIRKY_NOTES.length)
    setBurst((b) => b + 1)
    playFart()

    const stamp = Date.now()
    const fresh = Array.from({ length: 4 }).map((_, i) => ({
      id: stamp + i,
      x: (Math.random() - 0.5) * 110,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      delay: i * 0.06,
      drift: (Math.random() - 0.5) * 60,
      scale: 0.7 + Math.random() * 0.6,
    }))
    setHearts((h) => [...h, ...fresh])
    setTimeout(() => {
      setHearts((h) => h.filter((x) => !fresh.find((n) => n.id === x.id)))
    }, 2400)
  }

  return (
    <div className="app">
      <Background />

      <AnimatePresence mode="wait">
        {scene === 'intro' ? (
          <IntroScene key="intro" onOpen={openCard} />
        ) : (
          <PartyScene
            key="party"
            burst={burst}
            note={QUIRKY_NOTES[note]}
            pokes={pokes}
            hearts={hearts}
            onPoke={onPoke}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function IntroScene({ onOpen }) {
  return (
    <motion.div
      className="scene intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="hint"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        a lil something for you
      </motion.h2>

      <motion.button
        className="present"
        onClick={onOpen}
        whileHover={{ scale: 1.06, rotate: -2 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Open your present"
      >
        <svg viewBox="0 0 220 220" width="220" height="220">
          <defs>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8fb7" />
              <stop offset="100%" stopColor="#c14b7e" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb6cf" />
              <stop offset="100%" stopColor="#e17aa1" />
            </linearGradient>
          </defs>
          <rect x="30" y="80" width="160" height="120" rx="8" fill="url(#boxGrad)" stroke="#7a2c4e" strokeWidth="3" />
          <rect x="100" y="80" width="20" height="120" fill="#ffd166" stroke="#a37a14" strokeWidth="2" />
          <rect x="20" y="60" width="180" height="34" rx="6" fill="url(#lidGrad)" stroke="#7a2c4e" strokeWidth="3" />
          <rect x="100" y="60" width="20" height="34" fill="#ffd166" stroke="#a37a14" strokeWidth="2" />
          <ellipse cx="92" cy="58" rx="22" ry="14" fill="#ffd166" stroke="#a37a14" strokeWidth="2" />
          <ellipse cx="128" cy="58" rx="22" ry="14" fill="#ffd166" stroke="#a37a14" strokeWidth="2" />
          <circle cx="110" cy="58" r="8" fill="#ffd166" stroke="#a37a14" strokeWidth="2" />
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="78" cy="120" r="10" fill="#9be36a" stroke="#2f6b1a" strokeWidth="2" />
            <circle cx="142" cy="120" r="10" fill="#9be36a" stroke="#2f6b1a" strokeWidth="2" />
            <circle cx="78" cy="122" r="5" fill="#fff" />
            <circle cx="142" cy="122" r="5" fill="#fff" />
            <circle cx="79" cy="124" r="2.5" fill="#1a1a1a" />
            <circle cx="143" cy="124" r="2.5" fill="#1a1a1a" />
          </motion.g>
        </svg>
      </motion.button>

      <motion.p
        className="tap-hint"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        tap the box
      </motion.p>
    </motion.div>
  )
}

function PartyScene({ burst, note, pokes, hearts, onPoke }) {
  const title = `HAPPY BIRTHDAY ${FRIEND_NAME.toUpperCase()}!`

  return (
    <motion.div
      className="scene party"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <Confetti burstKey={burst} count={70} />

      <Balloons />

      <MusicButton />


      <h1 className="title" aria-label={title}>
        {title.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="title-char-wrap"
            initial={{ y: -120, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              delay: 0.3 + i * 0.04,
              type: 'spring',
              stiffness: 240,
              damping: 12,
            }}
            style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
          >
            <motion.span
              className="title-char"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.4 + i * 0.05,
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        a quirky lil frog for an even quirkier human
      </motion.p>

      <div className="stage">
        <WaterRipple />
        <LilyPad />
        <Frog onPoke={onPoke} />

        <div className="hearts-layer" aria-hidden>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="float-heart"
              style={{ left: `calc(50% + ${h.x}px)` }}
              initial={{ y: 0, opacity: 0, scale: 0 }}
              animate={{
                y: -220,
                x: h.drift,
                opacity: [0, 1, 1, 0],
                scale: [0, h.scale * 1.2, h.scale, h.scale * 0.7],
                rotate: h.drift > 0 ? 18 : -18,
              }}
              transition={{ duration: 1.8, delay: h.delay, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path
                  d="M 12 21 C 12 21 3.5 14 3.5 8 C 3.5 4.5 6.5 2.5 9 2.5 C 10.7 2.5 11.7 3.5 12 4.5 C 12.3 3.5 13.3 2.5 15 2.5 C 17.5 2.5 20.5 4.5 20.5 8 C 20.5 14 12 21 12 21 Z"
                  fill={h.color}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {pokes > 0 && (
          <motion.div
            className="poke-burst"
            key={pokes}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            jiggle!
          </motion.div>
        )}
      </div>

      <Cake />

      <motion.div
        className="note-card"
        key={note}
        initial={{ y: 14, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      >
        <span className="note-pin" />
        {note}
      </motion.div>

      {pokes >= 5 ? (
        <motion.div
          className="achievement"
          initial={{ y: 16, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        >
          ★ Certified Frog Booty Connoisseur ★
        </motion.div>
      ) : (
        <motion.p
          className="poke-hint"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          psst — poke the frog
        </motion.p>
      )}
    </motion.div>
  )
}

function MusicButton() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => subscribeMusic(setPlaying), [])

  const toggle = () => {
    if (playing) stopMusic()
    else playHappyBirthday()
  }

  return (
    <motion.button
      className="music-btn"
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      animate={playing ? { rotate: [0, -3, 3, -3, 0] } : { rotate: 0 }}
      transition={playing ? { duration: 1.4, repeat: Infinity } : {}}
      aria-label={playing ? 'Stop music' : 'Replay birthday song'}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        {playing ? (
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        ) : (
          <path d="M12 5V2L7 7l5 5V8a6 6 0 1 1-6 6H4a8 8 0 1 0 8-9z" />
        )}
      </svg>
      <span>{playing ? 'stop' : 'replay'}</span>
    </motion.button>
  )
}

function Balloons() {
  const balloons = [
    { color: '#ff5b8a', left: 5, delay: 0 },
    { color: '#ffd166', left: 18, delay: 0.4 },
    { color: '#06d6a0', left: 80, delay: 0.2 },
    { color: '#9b5de5', left: 92, delay: 0.6 },
  ]

  return (
    <div className="balloons" aria-hidden>
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="balloon"
          style={{ left: `${b.left}%`, '--bg': b.color }}
          initial={{ y: '120vh' }}
          animate={{ y: '0vh', x: [0, 12, -12, 0] }}
          transition={{
            y: { duration: 1.8, delay: 0.8 + b.delay, ease: 'easeOut' },
            x: { duration: 4, repeat: Infinity, delay: 1.5, ease: 'easeInOut' },
          }}
        >
          <div className="balloon-body" />
          <div className="balloon-tie" />
          <div className="balloon-string" />
        </motion.div>
      ))}
    </div>
  )
}

function WaterRipple() {
  return (
    <div className="ripple-wrap" aria-hidden>
      {[0, 1.6, 3.2].map((delay, i) => (
        <motion.span
          key={i}
          className="ripple"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.55, 0] }}
          transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function LilyPad() {
  return (
    <motion.svg
      className="lilypad"
      viewBox="0 0 380 80"
      preserveAspectRatio="xMidYMid meet"
      animate={{ y: [0, 4, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="190" cy="55" rx="170" ry="20" fill="#3d8a25" stroke="#22591a" strokeWidth="2" />
      <ellipse cx="190" cy="48" rx="170" ry="18" fill="#5fb13a" stroke="#22591a" strokeWidth="2" />
      <path d="M 190 48 L 30 48" stroke="#22591a" strokeWidth="1.5" opacity="0.5" />
      <path d="M 190 48 L 350 48" stroke="#22591a" strokeWidth="1.5" opacity="0.5" />
      {[60, 320].map((tx) => (
        <g key={tx} transform={`translate(${tx}, 40)`}>
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-5"
              rx="3.5"
              ry="6"
              fill="#ffd6e8"
              stroke="#c14b7e"
              strokeWidth="1"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="2.5" fill="#ffd166" />
        </g>
      ))}
    </motion.svg>
  )
}
