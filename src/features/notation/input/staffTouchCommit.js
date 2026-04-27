import {
  getTouchMetrics,
  isDoubleTap,
  resolveCommittedPick,
  shouldAdjustPitch,
  shouldRejectTap,
} from '@/features/notation/input/staffInputController'

export function resolveTouchCommit({
  touchState,
  touch,
  lastTapAt,
  now,
  pick,
  pitchStepPx = 24,
}) {
  const metrics = getTouchMetrics(touchState, touch, now)

  if (shouldAdjustPitch(metrics)) {
    return {
      action: 'adjustPitch',
      step: Math.round((-metrics.dy) / pitchStepPx),
      slotIndex: touchState.slotIndex,
      nextLastTapAt: now,
      metrics,
    }
  }

  const doubleTap = !metrics.isLongPress && isDoubleTap(lastTapAt, now)
  if (doubleTap) {
    return {
      action: 'toggleAccidental',
      slotIndex: touchState.slotIndex,
      nextLastTapAt: now,
      metrics,
    }
  }

  if (shouldRejectTap(metrics)) {
    return {
      action: 'reject',
      nextLastTapAt: now,
      metrics,
    }
  }

  const committed = resolveCommittedPick(touchState, pick)
  return {
    action: committed.noteName ? 'commitNote' : 'noop',
    noteName: committed.noteName,
    slotIndex: committed.slotIndex,
    nextLastTapAt: now,
    metrics,
  }
}
