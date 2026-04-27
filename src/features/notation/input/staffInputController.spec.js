import { describe, expect, it } from 'vitest'
import {
  createTouchState,
  getTouchMetrics,
  isDoubleTap,
  resolveCommittedPick,
  shouldAdjustPitch,
  shouldRejectTap,
  updateTouchStateWithPick,
} from '@/features/notation/input/staffInputController'

describe('staffInputController', () => {
  it('creates and updates touch state with stable last pick data', () => {
    const created = createTouchState({
      startedAt: 100,
      startX: 10,
      startY: 20,
      slotIndex: 2,
      noteName: 'C4',
    })

    const updated = updateTouchStateWithPick(created, { slotIndex: 4, noteName: 'E4' })
    expect(updated.lastPickedNoteName).toBe('E4')
    expect(updated.lastPickedSlotIndex).toBe(4)
    expect(updated.slotIndex).toBe(4)
  })

  it('computes gesture metrics consistently', () => {
    const state = createTouchState({
      startedAt: 100,
      startX: 10,
      startY: 10,
      slotIndex: 1,
      noteName: 'D4',
    })
    const metrics = getTouchMetrics(state, { clientX: 22, clientY: 34 }, 400)
    expect(metrics.dx).toBe(12)
    expect(metrics.dy).toBe(24)
    expect(metrics.isLongPress).toBe(true)
  })

  it('resolves committed pick from latest stable touch data', () => {
    const state = createTouchState({
      startedAt: 100,
      startX: 0,
      startY: 0,
      slotIndex: 3,
      noteName: 'F4',
    })
    const committed = resolveCommittedPick(state, null)
    expect(committed).toEqual({ noteName: 'F4', slotIndex: 3 })
  })

  it('classifies vertical adjust and tap rejection thresholds', () => {
    expect(shouldAdjustPitch({ absDy: 26, dx: 2 })).toBe(true)
    expect(shouldAdjustPitch({ absDy: 10, dx: 2 })).toBe(false)
    expect(shouldRejectTap({ isLongPress: false, distance: 11 })).toBe(true)
    expect(shouldRejectTap({ isLongPress: true, distance: 20 })).toBe(false)
  })

  it('detects double taps inside the threshold', () => {
    expect(isDoubleTap(1000, 1200)).toBe(true)
    expect(isDoubleTap(1000, 1400)).toBe(false)
  })
})
