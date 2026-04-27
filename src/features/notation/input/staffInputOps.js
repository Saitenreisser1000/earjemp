export function clampDisplayIndex(displayIndex, { minDisplay, melodyLength }) {
  return Math.max(minDisplay, Math.min(melodyLength - 1, displayIndex))
}

export function displayIndexToUserIndex(displayIndex, minDisplay) {
  return displayIndex - minDisplay
}

export function addInputNoteAt({ userMelody, noteName, displayIndex, minDisplay, melodyLength }) {
  const targetDisplay = clampDisplayIndex(displayIndex, { minDisplay, melodyLength })
  const userIndex = displayIndexToUserIndex(targetDisplay, minDisplay)
  if (userIndex < 0 || userIndex >= userMelody.length) return null

  const nextUserMelody = [...userMelody]
  nextUserMelody.splice(userIndex, 1, noteName)

  return {
    nextUserMelody,
    targetDisplay,
    userIndex,
  }
}

export function adjustInputAt({
  userMelody,
  displayIndex,
  minDisplay,
  melodyLength,
  step,
  pitchSorted,
}) {
  if (!Number.isFinite(step) || step === 0) return null
  const targetDisplay = clampDisplayIndex(displayIndex, { minDisplay, melodyLength })
  const userIndex = displayIndexToUserIndex(targetDisplay, minDisplay)
  const current = userMelody[userIndex]
  if (!current) return null

  const index = pitchSorted.indexOf(current)
  if (index < 0) return null
  const nextIndex = Math.max(0, Math.min(pitchSorted.length - 1, index + step))
  const nextUserMelody = [...userMelody]
  nextUserMelody.splice(userIndex, 1, pitchSorted[nextIndex])

  return {
    nextUserMelody,
    targetDisplay,
    userIndex,
    noteName: pitchSorted[nextIndex],
  }
}

export function toggleAccidentalAt({
  userMelody,
  displayIndex,
  minDisplay,
  melodyLength,
  notePalette,
  notePaletteByName,
  getToneById,
}) {
  const targetDisplay = clampDisplayIndex(displayIndex, { minDisplay, melodyLength })
  const userIndex = displayIndexToUserIndex(targetDisplay, minDisplay)
  const current = userMelody[userIndex]
  if (!current) return null

  const currentTone = notePalette.find((tone) => tone.name === current)
  if (!currentTone || !Array.isArray(currentTone.enh)) return null
  const candidates = currentTone.enh
    .map((id) => getToneById(id))
    .filter((tone) => tone && notePaletteByName[tone.name])
  if (!candidates.length) return null

  const currentIdx = candidates.findIndex((tone) => tone.name === current)
  const nextTone = candidates[(currentIdx + 1 + candidates.length) % candidates.length] || candidates[0]
  const nextUserMelody = [...userMelody]
  nextUserMelody.splice(userIndex, 1, nextTone.name)

  return {
    nextUserMelody,
    targetDisplay,
    userIndex,
    noteName: nextTone.name,
    tone: nextTone,
  }
}
