import { createChordOptions } from '@/domain/music/definitions'
import {
  applyTriadInversion,
  createEasyPlusChordOptions,
  easyPlusChordLabel,
  isEasyPlusDifficulty
} from '@/domain/music/chordInversions'

describe('chordInversions', () => {
  it('detects easy+ difficulty', () => {
    expect(isEasyPlusDifficulty('easy+')).toBe(true)
    expect(isEasyPlusDifficulty('easy')).toBe(false)
  })

  it('creates easy+ triad options with root, first and second inversion labels', () => {
    const chords = createChordOptions()
    const options = createEasyPlusChordOptions(chords)

    expect(options).toHaveLength(12)

    const labels = options.map((option) => option.text)
    expect(labels).toEqual([
      'Major root', 'Major 6', 'Major 4 6',
      'Minor root', 'Minor 6', 'Minor 4 6',
      'Augmented root', 'Augmented 6', 'Augmented 4 6',
      'Diminished root', 'Diminished 6', 'Diminished 4 6'
    ])

    const values = options.map((option) => option.value)
    expect(values).toContain('easyplus-1-0')
    expect(values).toContain('easyplus-0-1')
    expect(values).toContain('easyplus-3-2')
    expect(values).toContain('easyplus-2-2')

    const inversionsByQuality = new Map()
    for (const option of options) {
      const quality = option.baseText
      const list = inversionsByQuality.get(quality) || []
      list.push(option.inversion)
      inversionsByQuality.set(quality, list)
    }

    expect(inversionsByQuality.get('major')).toEqual([0, 1, 2])
    expect(inversionsByQuality.get('minor')).toEqual([0, 1, 2])
    expect(inversionsByQuality.get('augmented')).toEqual([0, 1, 2])
    expect(inversionsByQuality.get('diminished')).toEqual([0, 1, 2])
  })

  it('formats easy+ labels musically', () => {
    expect(easyPlusChordLabel({ text: 'major' }, 0)).toBe('Major root')
    expect(easyPlusChordLabel({ text: 'major' }, 1)).toBe('Major 6')
    expect(easyPlusChordLabel({ text: 'major' }, 2)).toBe('Major 4 6')
    expect(easyPlusChordLabel({ text: 'minor' }, 0)).toBe('Minor root')
    expect(easyPlusChordLabel({ text: 'augmented' }, 1)).toBe('Augmented 6')
    expect(easyPlusChordLabel({ text: 'diminished' }, 2)).toBe('Diminished 4 6')
  })

  it('applies triad inversion ordering and octave raise callback', () => {
    const tones = ['R', '3', '5']
    const raise = (tone) => `${tone}+8`

    expect(applyTriadInversion(tones, 0, raise)).toEqual(['R', '3', '5'])
    expect(applyTriadInversion(tones, 1, raise)).toEqual(['3', '5', 'R+8'])
    expect(applyTriadInversion(tones, 2, raise)).toEqual(['5', 'R+8', '3+8'])
  })
})
