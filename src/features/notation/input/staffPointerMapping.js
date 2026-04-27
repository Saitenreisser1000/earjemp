export function clampSlotIndex(slotIndex, maxSlots) {
  const upper = Math.max(0, maxSlots - 1)
  return Math.max(0, Math.min(upper, slotIndex))
}

export function pickSlotIndexFromCenters(xInSvg, centers, maxSlots) {
  if (!Array.isArray(centers) || centers.length < 2) return null
  const usableCenters = centers.slice(0, maxSlots)
  let chosen = usableCenters.length - 1

  for (let i = 0; i < usableCenters.length - 1; i++) {
    const boundary = (usableCenters[i] + usableCenters[i + 1]) / 2
    if (xInSvg < boundary) {
      chosen = i
      break
    }
  }

  return clampSlotIndex(chosen, maxSlots)
}

export function pickSlotIndexFromRange({
  xInSvg,
  svgWidth,
  maxSlots,
  leftPadding = 90,
  rightPadding = 22,
}) {
  const usable = Math.max(20, svgWidth - leftPadding - rightPadding)
  const normalized = Math.max(0, Math.min(usable, xInSvg - leftPadding))
  const slotIndexRaw = Math.floor((normalized / usable) * maxSlots)
  return clampSlotIndex(slotIndexRaw, maxSlots)
}

export function pickSlotIndex({
  xInSvg,
  staffSlotXs,
  maxSlots,
  svgWidth,
  leftPadding,
  rightPadding,
}) {
  const fromCenters = pickSlotIndexFromCenters(xInSvg, staffSlotXs, maxSlots)
  if (fromCenters !== null) return fromCenters
  return pickSlotIndexFromRange({
    xInSvg,
    svgWidth,
    maxSlots,
    leftPadding,
    rightPadding,
  })
}

export function measurePointerPosition({ clientX, clientY, wrapRect, svgRect }) {
  return {
    xInWrap: clientX - wrapRect.left,
    xInSvg: clientX - svgRect.left,
    yInSvg: clientY - svgRect.top,
  }
}
