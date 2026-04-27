export function createTouchState({
  startedAt,
  startX,
  startY,
  slotIndex,
  noteName,
}) {
  return {
    startedAt,
    startX,
    startY,
    slotIndex,
    lastPickedNoteName: noteName || '',
    lastPickedSlotIndex: slotIndex,
  }
}

export function updateTouchStateWithPick(touchState, pick) {
  if (!touchState || !pick) return touchState
  return {
    ...touchState,
    slotIndex: Number.isFinite(pick.slotIndex) ? pick.slotIndex : touchState.slotIndex,
    lastPickedNoteName: pick.noteName || touchState.lastPickedNoteName,
    lastPickedSlotIndex: Number.isFinite(pick.slotIndex)
      ? pick.slotIndex
      : touchState.lastPickedSlotIndex,
  }
}

export function getTouchMetrics(touchState, touch, now = Date.now()) {
  if (!touchState || !touch) {
    return {
      elapsed: 0,
      dx: 0,
      dy: 0,
      absDx: 0,
      absDy: 0,
      distance: 0,
      isLongPress: false,
    }
  }

  const dx = touch.clientX - touchState.startX
  const dy = touch.clientY - touchState.startY
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  const distance = Math.hypot(dx, dy)
  const elapsed = now - touchState.startedAt

  return {
    elapsed,
    dx,
    dy,
    absDx,
    absDy,
    distance,
    isLongPress: elapsed >= 220,
  }
}

export function resolveCommittedPick(touchState, pick) {
  const noteName = pick?.noteName || touchState?.lastPickedNoteName || ''
  const slotIndex = Number.isFinite(pick?.slotIndex)
    ? pick.slotIndex
    : Number.isFinite(touchState?.lastPickedSlotIndex)
      ? touchState.lastPickedSlotIndex
      : touchState?.slotIndex

  return {
    noteName,
    slotIndex,
  }
}

export function shouldAdjustPitch(metrics) {
  return metrics.absDy >= 24 && metrics.absDy > Math.abs(metrics.dx)
}

export function shouldRejectTap(metrics) {
  const maxTapDistance = metrics.isLongPress ? 26 : 10
  return metrics.distance > maxTapDistance
}

export function isDoubleTap(lastTapAt, now = Date.now(), threshold = 320) {
  return now - lastTapAt < threshold
}
