import { TONE_CHAIN } from '@/domain/music/toneChain'
import {
  applyAccidentalInput,
  clampInputY,
  computeInputYBounds,
  pickClosestNoteName
} from '@/domain/notation/melodyInput'
import { formatToneName, parseToneName } from '@/domain/notation/spelling'

describe('melody input utilities', () => {
  const expertPalette = TONE_CHAIN.filter((tone) => tone.id < 63)

  it('keeps extreme low/high notes addressable via y clamping and nearest-pitch mapping', () => {
    const yByName = {
      C5: 35,
      E1: 165
    }
    const names = Object.keys(yByName)
    const noteY = (name) => yByName[name]

    const bounds = computeInputYBounds(names, noteY, 10)
    expect(bounds).toEqual({ min: 25, max: 175 })

    const clampedTop = clampInputY(-100, names, noteY, 10)
    const clampedBottom = clampInputY(300, names, noteY, 10)

    expect(pickClosestNoteName(clampedTop, names, noteY)).toBe('C5')
    expect(pickClosestNoteName(clampedBottom, names, noteY)).toBe('E1')
  })

  it('applies # and b for entry/edit and keeps boundary tones stable', () => {
    expect(applyAccidentalInput('C4', '#', expertPalette)).toBe('C#4')
    expect(applyAccidentalInput('A4', 'b', expertPalette)).toBe('Ab4')

    // C-flat spelling is not in primary palette, fallback resolves to equivalent pitch B3.
    expect(applyAccidentalInput('C4', 'b', expertPalette)).toBe('B3')

    // Upper and lower boundary handling.
    expect(applyAccidentalInput('B4', '#', expertPalette)).toBe('C5')
    expect(applyAccidentalInput('E1', 'b', expertPalette)).toBe('E1')
  })

  it('roundtrips accidental note names for save/load (# and b)', () => {
    const sharp = parseToneName('C#4')
    const flat = parseToneName('Bb2')

    expect(sharp).toEqual({ letter: 'C', accidental: '#', octave: 4 })
    expect(flat).toEqual({ letter: 'B', accidental: 'b', octave: 2 })

    expect(formatToneName(sharp)).toBe('C#4')
    expect(formatToneName(flat)).toBe('Bb2')

    // Regression: multi-digit octaves stay parseable.
    expect(parseToneName('Bb12')).toEqual({ letter: 'B', accidental: 'b', octave: 12 })
  })
})
