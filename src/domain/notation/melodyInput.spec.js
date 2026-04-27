import { describe, expect, it } from 'vitest'
import {
  applyAccidentalInput,
  clampInputY,
  computeInputYBounds,
  findToneByPitchAndAccidental,
  pickBoundedNoteName,
  pickClosestNoteName,
} from '@/domain/notation/melodyInput'

const toneY = {
  C4: 100,
  D4: 90,
  E4: 80,
}

const noteYForName = (name) => toneY[name]

const tones = [
  { name: 'C4', toneID: 60 },
  { name: 'C#4', toneID: 61 },
  { name: 'Db4', toneID: 61 },
  { name: 'D4', toneID: 62 },
  { name: 'Eb4', toneID: 63 },
]

describe('melody input helpers', () => {
  it('computes and clamps input bounds with extra edge reach', () => {
    expect(computeInputYBounds(['C4', 'E4'], noteYForName, 10)).toEqual({ min: 64, max: 116 })
    expect(clampInputY(40, ['C4', 'E4'], noteYForName, 10)).toBe(64)
    expect(clampInputY(140, ['C4', 'E4'], noteYForName, 10)).toBe(116)
  })

  it('picks the closest note by y coordinate', () => {
    expect(pickClosestNoteName(88, ['C4', 'D4', 'E4'], noteYForName)).toBe('D4')
    expect(pickClosestNoteName(79, ['C4', 'D4', 'E4'], noteYForName)).toBe('E4')
  })

  it('clamps out-of-range positions to the highest or lowest available note', () => {
    expect(pickBoundedNoteName(40, ['C4', 'D4', 'E4'], noteYForName)).toBe('E4')
    expect(pickBoundedNoteName(160, ['C4', 'D4', 'E4'], noteYForName)).toBe('C4')
  })

  it('gives top and bottom notes a larger finger-friendly hit margin', () => {
    expect(clampInputY(66, ['C4', 'D4', 'E4'], noteYForName, 8)).toBe(67)
    expect(clampInputY(114, ['C4', 'D4', 'E4'], noteYForName, 8)).toBe(113)
  })

  it('finds a preferred accidental spelling when available', () => {
    expect(findToneByPitchAndAccidental(tones, 61, '#')).toEqual({ name: 'C#4', toneID: 61 })
    expect(findToneByPitchAndAccidental(tones, 61, 'b')).toEqual({ name: 'Db4', toneID: 61 })
  })

  it('falls back to the simplest spelling if exact accidental is missing', () => {
    expect(findToneByPitchAndAccidental(tones, 63, '#')).toEqual({ name: 'Eb4', toneID: 63 })
  })

  it('applies accidental input relative to the selected tone', () => {
    expect(applyAccidentalInput('C4', '#', tones)).toBe('C#4')
    expect(applyAccidentalInput('D4', 'b', tones)).toBe('Db4')
    expect(applyAccidentalInput('C4', '', tones)).toBe('C4')
  })
})
