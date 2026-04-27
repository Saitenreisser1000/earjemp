import { describe, expect, it } from 'vitest'
import {
  createActiveDisplayIndex,
  createHoverFeedback,
} from '@/features/notation/input/staffInteractionFeedback'

describe('staffInteractionFeedback', () => {
  it('creates hover feedback geometry from a pick', () => {
    expect(createHoverFeedback({ noteName: 'C4', xInWrap: 50, snappedYInWrap: 40 })).toEqual({
      noteName: 'C4',
      hoverLeft: 60,
      hoverTop: 18,
    })
  })

  it('returns null without a note name', () => {
    expect(createHoverFeedback({ xInWrap: 50, snappedYInWrap: 40 })).toBeNull()
  })

  it('clamps active display index', () => {
    expect(createActiveDisplayIndex(-1, { minDisplay: 1, melodyLength: 5 })).toBe(1)
    expect(createActiveDisplayIndex(9, { minDisplay: 1, melodyLength: 5 })).toBe(4)
  })
})
