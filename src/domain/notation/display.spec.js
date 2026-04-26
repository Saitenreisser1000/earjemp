import { describe, expect, it } from 'vitest'
import { diatonicIndex, formatDisplayNoteName, loupeNoteTopFor } from '@/domain/notation/display'

describe('notation display helpers', () => {
  it('formats note names for compact display', () => {
    expect(formatDisplayNoteName('C4')).toBe('C2')
    expect(formatDisplayNoteName('Db3')).toBe('Db1')
    expect(formatDisplayNoteName('C2')).toBe('c')
    expect(formatDisplayNoteName('')).toBe('')
  })

  it('computes diatonic indexes with octave offset', () => {
    expect(diatonicIndex('C4')).toBe(28)
    expect(diatonicIndex('D4', 1)).toBe(36)
    expect(diatonicIndex('H2')).toBe(0)
  })

  it('keeps loupe note positions within visible bounds', () => {
    expect(loupeNoteTopFor('E4', 'treble', 1)).toBeGreaterThanOrEqual(-8)
    expect(loupeNoteTopFor('E4', 'treble', 1)).toBeLessThanOrEqual(52)
    expect(loupeNoteTopFor('A2', 'bass', 1)).toBeGreaterThanOrEqual(-8)
  })
})
