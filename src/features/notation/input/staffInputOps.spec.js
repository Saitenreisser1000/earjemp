import { describe, expect, it } from 'vitest'
import {
  addInputNoteAt,
  adjustInputAt,
  clampDisplayIndex,
  displayIndexToUserIndex,
  toggleAccidentalAt,
} from '@/features/notation/input/staffInputOps'

describe('staffInputOps', () => {
  it('clamps display indexes', () => {
    expect(clampDisplayIndex(-1, { minDisplay: 1, melodyLength: 5 })).toBe(1)
    expect(clampDisplayIndex(9, { minDisplay: 1, melodyLength: 5 })).toBe(4)
  })

  it('maps display indexes to user indexes', () => {
    expect(displayIndexToUserIndex(3, 1)).toBe(2)
  })

  it('adds input notes into the targeted user slot', () => {
    const result = addInputNoteAt({
      userMelody: [null, null, null, null],
      noteName: 'D4',
      displayIndex: 2,
      minDisplay: 1,
      melodyLength: 5,
    })

    expect(result.targetDisplay).toBe(2)
    expect(result.nextUserMelody).toEqual([null, 'D4', null, null])
  })

  it('adjusts input pitch deterministically', () => {
    const result = adjustInputAt({
      userMelody: ['C4', 'D4', null],
      displayIndex: 1,
      minDisplay: 0,
      melodyLength: 3,
      step: 1,
      pitchSorted: ['C4', 'D4', 'E4'],
    })

    expect(result.noteName).toBe('E4')
    expect(result.nextUserMelody).toEqual(['C4', 'E4', null])
  })

  it('toggles accidentals across enharmonic candidates', () => {
    const notePalette = [{ name: 'C#4', enh: [1, 2] }]
    const notePaletteByName = { 'C#4': true, Db4: true }
    const tonesById = {
      1: { name: 'C#4' },
      2: { name: 'Db4' },
    }

    const result = toggleAccidentalAt({
      userMelody: ['C#4'],
      displayIndex: 0,
      minDisplay: 0,
      melodyLength: 1,
      notePalette,
      notePaletteByName,
      getToneById: (id) => tonesById[id],
    })

    expect(result.noteName).toBe('Db4')
    expect(result.nextUserMelody).toEqual(['Db4'])
  })
})
