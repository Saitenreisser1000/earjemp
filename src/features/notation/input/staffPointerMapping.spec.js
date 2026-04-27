import { describe, expect, it } from 'vitest'
import {
  clampSlotIndex,
  measurePointerPosition,
  pickSlotIndex,
  pickSlotIndexFromCenters,
  pickSlotIndexFromRange,
} from '@/features/notation/input/staffPointerMapping'

describe('staffPointerMapping', () => {
  it('clamps slot indexes into valid range', () => {
    expect(clampSlotIndex(-1, 5)).toBe(0)
    expect(clampSlotIndex(9, 5)).toBe(4)
  })

  it('picks slot indexes from rendered centers', () => {
    const centers = [100, 150, 200, 250]
    expect(pickSlotIndexFromCenters(90, centers, 4)).toBe(0)
    expect(pickSlotIndexFromCenters(175, centers, 4)).toBe(2)
    expect(pickSlotIndexFromCenters(260, centers, 4)).toBe(3)
  })

  it('falls back to range-based slot picking when centers are missing', () => {
    expect(pickSlotIndexFromRange({ xInSvg: 90, svgWidth: 300, maxSlots: 4 })).toBe(0)
    expect(pickSlotIndexFromRange({ xInSvg: 278, svgWidth: 300, maxSlots: 4 })).toBe(3)
  })

  it('picks slots through the unified helper', () => {
    expect(pickSlotIndex({ xInSvg: 160, staffSlotXs: [100, 150, 200], maxSlots: 3, svgWidth: 300 })).toBe(1)
    expect(pickSlotIndex({ xInSvg: 250, staffSlotXs: [], maxSlots: 3, svgWidth: 300 })).toBe(2)
  })

  it('measures pointer coordinates relative to wrap and svg', () => {
    const wrapRect = { left: 20 }
    const svgRect = { left: 40, top: 10 }
    expect(measurePointerPosition({ clientX: 70, clientY: 50, wrapRect, svgRect })).toEqual({
      xInWrap: 50,
      xInSvg: 30,
      yInSvg: 40,
    })
  })
})
