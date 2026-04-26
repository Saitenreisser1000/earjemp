import { describe, expect, it } from 'vitest'
import {
  accidentalComplexity,
  chooseBestSpelling,
  formatToneName,
  normalizeAccidental,
  parseToneName,
} from '@/domain/notation/spelling'

describe('spelling domain helpers', () => {
  it('parses tone names with accidentals and octave', () => {
    expect(parseToneName('C#4')).toEqual({ letter: 'C', accidental: '#', octave: 4 })
    expect(parseToneName('Db3')).toEqual({ letter: 'D', accidental: 'b', octave: 3 })
    expect(parseToneName('H#3')).toBeNull()
  })

  it('normalizes accidental aliases', () => {
    expect(normalizeAccidental('s')).toBe('#')
    expect(normalizeAccidental('##')).toBe('x')
    expect(normalizeAccidental(' X ')).toBe('x')
    expect(normalizeAccidental('')).toBe('')
  })

  it('formats valid tone names and rejects invalid input', () => {
    expect(formatToneName({ letter: 'g', accidental: 'b', octave: 3 })).toBe('Gb3')
    expect(formatToneName({ letter: 'H', accidental: '#', octave: 4 })).toBe('')
    expect(formatToneName({ letter: 'A', accidental: '#', octave: 'x' })).toBe('')
  })

  it('scores accidental complexity sanely', () => {
    expect(accidentalComplexity('')).toBe(0)
    expect(accidentalComplexity('#')).toBe(1)
    expect(accidentalComplexity('bb')).toBe(2)
    expect(accidentalComplexity('x')).toBe(2)
  })

  it('chooses the simplest spelling and respects expected letters', () => {
    const tones = [{ name: 'C#4' }, { name: 'Db4' }, { name: 'B##3' }]
    expect(chooseBestSpelling(tones, 'D')).toEqual({ name: 'Db4' })
    expect(chooseBestSpelling(tones, 'C')).toEqual({ name: 'C#4' })
  })
})
