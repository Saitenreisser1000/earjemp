import { describe, expect, it } from 'vitest'
import { createStaffNotePicker } from '@/features/notation/input/staffNotePicker'

describe('staffNotePicker', () => {
  it('turns pointer geometry into a committed note pick', () => {
    const picker = createStaffNotePicker({
      noteInputCandidates: ['C4', 'D4', 'E4'],
      clampInputY: (y) => Math.max(20, Math.min(100, y)),
      noteYForName: (name) => ({ C4: 100, D4: 80, E4: 60 }[name] ?? 80),
      mapYToNoteName: (y) => (y < 70 ? 'E4' : y < 90 ? 'D4' : 'C4'),
      resolveAccidentalInput: (name) => name,
      pickSlotXs: [100, 150, 200],
      melodyLength: 3,
    })

    const pick = picker({
      clientX: 175,
      clientY: 60,
      wrapRect: { left: 20, top: 10 },
      svgRect: { left: 40, top: 30, width: 260 },
    })

    expect(pick.noteName).toBe('E4')
    expect(pick.slotIndex).toBe(1)
    expect(pick.xInWrap).toBe(155)
    expect(pick.snappedYInWrap).toBe(80)
  })

  it('uses the resolved accidental note for snapping fallback', () => {
    const picker = createStaffNotePicker({
      noteInputCandidates: ['C4'],
      clampInputY: (y) => y,
      noteYForName: (name) => ({ C4: 100, 'C#4': 96 }[name] ?? 100),
      mapYToNoteName: () => '',
      resolveAccidentalInput: () => 'C#4',
      pickSlotXs: [],
      melodyLength: 4,
    })

    const pick = picker({
      clientX: 180,
      clientY: 130,
      wrapRect: { left: 10, top: 10 },
      svgRect: { left: 30, top: 20, width: 320 },
    })

    expect(pick.noteName).toBe('C#4')
    expect(pick.snappedYInSvg).toBe(96)
  })
})
