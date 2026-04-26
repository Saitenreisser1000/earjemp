import { describe, expect, it } from 'vitest'
import {
  intervalValuesForDifficulty,
  matchesTonePool,
  melodyPitchPattern,
  tonePoolConfig,
} from '@/domain/music/difficulty'

describe('difficulty helpers', () => {
  it('returns narrower pools for easier modes', () => {
    expect(tonePoolConfig('easy')).toEqual({ minToneId: 20, maxToneId: 27, diatonicOnly: true })
    expect(tonePoolConfig('advanced')).toEqual({ minToneId: 20, maxToneId: 32, diatonicOnly: true })
    expect(tonePoolConfig('expert')).toEqual({ minToneId: 0, maxToneId: 44, diatonicOnly: false })
  })

  it('filters tones according to difficulty', () => {
    expect(matchesTonePool({ toneID: 24, name: 'E3' }, 'easy')).toBe(true)
    expect(matchesTonePool({ toneID: 29, name: 'A3' }, 'easy')).toBe(false)
    expect(matchesTonePool({ toneID: 24, name: 'Eb3' }, 'easy')).toBe(false)
    expect(matchesTonePool({ toneID: 24, name: 'Eb3' }, 'expert')).toBe(true)
  })

  it('expands intervals with increasing difficulty', () => {
    expect(intervalValuesForDifficulty('easy')).toEqual([2, 4, 5, 7, 9, 11, 12])
    expect(intervalValuesForDifficulty('advanced')).toContain(10)
    expect(intervalValuesForDifficulty('expert')).toContain(14)
  })

  it('uses appropriate melody pitch patterns', () => {
    expect(melodyPitchPattern('easy').test('C3')).toBe(true)
    expect(melodyPitchPattern('easy').test('C5')).toBe(false)
    expect(melodyPitchPattern('expert').test('F#4')).toBe(false)
    expect(melodyPitchPattern('expert').test('F4')).toBe(true)
  })
})
