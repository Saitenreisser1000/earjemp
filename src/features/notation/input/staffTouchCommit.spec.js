import { describe, expect, it } from 'vitest'
import { resolveTouchCommit } from '@/features/notation/input/staffTouchCommit'

describe('staffTouchCommit', () => {
  const baseTouchState = {
    startedAt: 100,
    startX: 10,
    startY: 10,
    slotIndex: 2,
    lastPickedNoteName: 'C4',
    lastPickedSlotIndex: 2,
  }

  it('returns pitch adjustment for vertical gestures', () => {
    const result = resolveTouchCommit({
      touchState: baseTouchState,
      touch: { clientX: 12, clientY: -20 },
      lastTapAt: 0,
      now: 200,
      pick: null,
    })

    expect(result.action).toBe('adjustPitch')
    expect(result.step).toBe(1)
    expect(result.slotIndex).toBe(2)
  })

  it('returns accidental toggle for double taps', () => {
    const result = resolveTouchCommit({
      touchState: baseTouchState,
      touch: { clientX: 11, clientY: 11 },
      lastTapAt: 50,
      now: 200,
      pick: null,
    })

    expect(result.action).toBe('toggleAccidental')
    expect(result.slotIndex).toBe(2)
  })

  it('rejects moved taps', () => {
    const result = resolveTouchCommit({
      touchState: baseTouchState,
      touch: { clientX: 40, clientY: 40 },
      lastTapAt: 0,
      now: 500,
      pick: null,
    })

    expect(result.action).toBe('reject')
  })

  it('commits a resolved note pick', () => {
    const result = resolveTouchCommit({
      touchState: baseTouchState,
      touch: { clientX: 11, clientY: 11 },
      lastTapAt: 0,
      now: 500,
      pick: { noteName: 'D4', slotIndex: 3 },
    })

    expect(result.action).toBe('commitNote')
    expect(result.noteName).toBe('D4')
    expect(result.slotIndex).toBe(3)
  })

  it('falls back to remembered pick when final pick is missing', () => {
    const result = resolveTouchCommit({
      touchState: baseTouchState,
      touch: { clientX: 11, clientY: 11 },
      lastTapAt: 0,
      now: 500,
      pick: null,
    })

    expect(result.action).toBe('commitNote')
    expect(result.noteName).toBe('C4')
    expect(result.slotIndex).toBe(2)
  })
})
