import { measurePointerPosition, pickSlotIndex } from '@/features/notation/input/staffPointerMapping'

export function createStaffNotePicker({
  noteInputCandidates,
  clampInputY,
  noteYForName,
  mapYToNoteName,
  resolveAccidentalInput,
  pickSlotXs,
  melodyLength,
}) {
  return function pickStaffNote({ clientX, clientY, wrapRect, svgRect }) {
    const { xInWrap, xInSvg, yInSvg } = measurePointerPosition({
      clientX,
      clientY,
      wrapRect,
      svgRect,
    })

    const clampedYInSvg = clampInputY(
      yInSvg,
      noteInputCandidates,
      noteYForName,
      10,
    )

    const baseName = mapYToNoteName(clampedYInSvg)
    const noteName = resolveAccidentalInput(baseName)
    const snappedYInSvg = noteYForName(baseName || noteName)
    const snappedYInWrap = (svgRect.top - wrapRect.top) + snappedYInSvg
    const slotIndex = pickSlotIndex({
      xInSvg,
      staffSlotXs: pickSlotXs,
      maxSlots: Math.max(1, melodyLength),
      svgWidth: svgRect.width,
      leftPadding: 90,
      rightPadding: 22,
    })

    return {
      noteName,
      slotIndex,
      xInWrap,
      xInSvg,
      yInSvg,
      clampedYInSvg,
      snappedYInSvg,
      snappedYInWrap,
    }
  }
}
