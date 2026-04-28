import birthdayTrack from '../lib/scottishperson-sound-effect-happy-birthday-music-box-333245.mp3'
import fart1 from '../lib/apebble-fart-4-228244.mp3'
import fart2 from '../lib/apebble-fart-5-228245.mp3'
import fart3 from '../lib/apebble-fart-8-228248.mp3'

const FARTS = [fart1, fart2, fart3]

let bgAudio = null
const listeners = new Set()

function ensureBg() {
  if (bgAudio) return bgAudio
  bgAudio = new Audio(birthdayTrack)
  bgAudio.preload = 'auto'
  bgAudio.addEventListener('play', () => notify(true))
  bgAudio.addEventListener('pause', () => notify(false))
  bgAudio.addEventListener('ended', () => notify(false))
  return bgAudio
}

function notify(playing) {
  listeners.forEach((cb) => cb(playing))
}

export function subscribeMusic(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function playHappyBirthday() {
  const a = ensureBg()
  a.currentTime = 0
  a.play().catch((err) => {
    console.warn('Audio playback blocked or failed:', err)
    notify(false)
  })
}

export function stopMusic() {
  if (!bgAudio) return
  bgAudio.pause()
  bgAudio.currentTime = 0
}

export function isMusicPlaying() {
  return !!bgAudio && !bgAudio.paused
}

// Frog booty fart on poke. Picks a random one each time so consecutive
// pokes don't sound identical, and creates a fresh element so they can
// overlap if pokes come in fast.
export function playFart() {
  const src = FARTS[Math.floor(Math.random() * FARTS.length)]
  const a = new Audio(src)
  a.volume = 0.7
  a.play().catch(() => {})
}
