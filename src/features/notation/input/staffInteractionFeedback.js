export function createHoverFeedback(pick) {
  if (!pick?.noteName) return null
  return {
    noteName: pick.noteName,
    hoverLeft: pick.xInWrap + 10,
    hoverTop: Math.max(0, pick.snappedYInWrap - 22),
  }
}

export function createActiveDisplayIndex(slotIndex, { minDisplay, melodyLength }) {
  return Math.max(minDisplay, Math.min(melodyLength - 1, slotIndex))
}
