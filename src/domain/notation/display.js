import { parseToneName } from '@/domain/notation/spelling'

export function diatonicIndex(noteName, octaveOffset = 0) {
  const parsed = parseToneName(noteName || '')
  if (!parsed) return 0
  const letter = parsed.letter.toLowerCase()
  const octave = Number(parsed.octave) + octaveOffset
  const map = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 }
  return octave * 7 + map[letter]
}

export function formatDisplayNoteName(noteName) {
  const parsed = parseToneName(noteName || '')
  if (!parsed) return noteName || ''

  const letter = parsed.letter
  const accidental = parsed.accidental || ''
  const displayOctave = parsed.octave - 2

  if (displayOctave <= 0) {
    return letter.toLowerCase() + accidental.toLowerCase()
  }
  return letter.toUpperCase() + accidental + String(displayOctave)
}

export function loupeNoteTopFor(noteName, clef, octaveOffset = 1) {
  const bottomIndex = clef === 'bass' ? 18 : 30
  const idx = diatonicIndex(noteName, octaveOffset)
  const bottomY = 40
  const stepPx = 4
  const y = bottomY - ((idx - bottomIndex) * stepPx)
  return Math.max(-8, Math.min(52, y))
}
