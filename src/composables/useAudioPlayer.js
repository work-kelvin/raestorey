import { ref, computed } from 'vue'

const tracks = ref([])
const currentIndex = ref(0)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const audioLevel = ref(0)

let audio = null
let audioContext = null
let analyser = null
let sourceNode = null
let pulseFrame = null

function ensureAudio() {
  if (!audio) {
    audio = new Audio()
    audio.addEventListener('timeupdate', () => {
      currentTime.value = audio.currentTime
    })
    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration || 0
    })
    audio.addEventListener('ended', () => {
      if (currentIndex.value < tracks.value.length - 1) {
        playTrack(currentIndex.value + 1)
      } else {
        isPlaying.value = false
        stopPulseLoop()
      }
    })
  }
  return audio
}

function ensureAnalyser() {
  const player = ensureAudio()
  if (analyser) return analyser

  audioContext = new AudioContext()
  sourceNode = audioContext.createMediaElementSource(player)
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.75
  sourceNode.connect(analyser)
  analyser.connect(audioContext.destination)
  return analyser
}

function startPulseLoop() {
  stopPulseLoop()
  const node = ensureAnalyser()
  const bins = new Uint8Array(node.frequencyBinCount)

  const tick = () => {
    if (!isPlaying.value) {
      audioLevel.value = 0
      return
    }

    node.getByteFrequencyData(bins)
    let sum = 0
    const bassBins = Math.min(12, bins.length)
    for (let i = 0; i < bassBins; i += 1) {
      sum += bins[i]
    }
    audioLevel.value = sum / (bassBins * 255)
    pulseFrame = requestAnimationFrame(tick)
  }

  if (audioContext?.state === 'suspended') {
    audioContext.resume()
  }

  pulseFrame = requestAnimationFrame(tick)
}

function stopPulseLoop() {
  if (pulseFrame) {
    cancelAnimationFrame(pulseFrame)
    pulseFrame = null
  }
  audioLevel.value = 0
}

function loadTrack(index) {
  const track = tracks.value[index]
  if (!track?.audioUrl) return

  const player = ensureAudio()
  player.src = track.audioUrl
  player.load()
  currentIndex.value = index
  currentTime.value = 0
  duration.value = 0
}

export function initPlaylist(playlist) {
  tracks.value = playlist.filter((track) => track.audioUrl)
}

export function playTrack(index) {
  if (index < 0 || index >= tracks.value.length) return

  const player = ensureAudio()
  if (index !== currentIndex.value || !player.src) {
    loadTrack(index)
  }

  player
    .play()
    .then(() => {
      isPlaying.value = true
      startPulseLoop()
    })
    .catch(() => {
      isPlaying.value = false
      stopPulseLoop()
    })
}

export function togglePlayback() {
  const player = ensureAudio()
  if (!player.src && tracks.value.length) {
    playTrack(currentIndex.value)
    return
  }

  if (isPlaying.value) {
    player.pause()
    isPlaying.value = false
    stopPulseLoop()
  } else {
    player
      .play()
      .then(() => {
        isPlaying.value = true
        startPulseLoop()
      })
      .catch(() => {
        isPlaying.value = false
        stopPulseLoop()
      })
  }
}

export function playTrackById(trackId) {
  const index = tracks.value.findIndex((track) => track.id === trackId)
  if (index !== -1) playTrack(index)
}

export function useAudioPlayer() {
  const currentTrack = computed(() => tracks.value[currentIndex.value] ?? null)
  const progress = computed(() =>
    duration.value ? (currentTime.value / duration.value) * 100 : 0,
  )

  function seekTo(percent) {
    const player = ensureAudio()
    if (!duration.value) return
    player.currentTime = (percent / 100) * duration.value
  }

  return {
    tracks,
    currentIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    audioLevel,
    playTrack,
    togglePlayback,
    playTrackById,
    seekTo,
  }
}
