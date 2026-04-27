import { accidentalComplexity, normalizeAccidental, parseToneName } from '@/domain/notation/spelling'

export function computeInputYBounds(noteNames, noteYForName, margin = 8) {
    if (!Array.isArray(noteNames) || !noteNames.length) {
        return { min: -24, max: 154 }
    }
    const ys = noteNames
        .map((name) => noteYForName(name))
        .filter((y) => Number.isFinite(y))
        .sort((a, b) => a - b)
    if (!ys.length) return { min: -24, max: 154 }

    const topGap = ys.length > 1 ? Math.abs(ys[1] - ys[0]) : 0
    const bottomGap = ys.length > 1 ? Math.abs(ys[ys.length - 1] - ys[ys.length - 2]) : 0
    const expandedMargin = (gap) => Math.max(margin, Math.min(margin + 6, Math.round(gap * 1.25)))
    const topMargin = expandedMargin(topGap)
    const bottomMargin = expandedMargin(bottomGap)

    return {
        min: ys[0] - topMargin,
        max: ys[ys.length - 1] + bottomMargin
    }
}

export function clampInputY(y, noteNames, noteYForName, margin = 8) {
    const bounds = computeInputYBounds(noteNames, noteYForName, margin)
    return Math.max(bounds.min, Math.min(bounds.max, y))
}

export function pickClosestNoteName(y, noteNames, noteYForName) {
    if (!Array.isArray(noteNames) || !noteNames.length) return ''
    let best = noteNames[0]
    let bestDist = Number.POSITIVE_INFINITY

    for (const name of noteNames) {
        const expectedY = noteYForName(name)
        if (!Number.isFinite(expectedY)) continue
        const dist = Math.abs(expectedY - y)
        if (dist < bestDist) {
            bestDist = dist
            best = name
        }
    }
    return best
}

export function pickBoundedNoteName(y, noteNames, noteYForName, edgeBias = 0.75) {
    if (!Array.isArray(noteNames) || !noteNames.length) return ''

    const candidates = noteNames
        .map((name) => ({ name, y: noteYForName(name) }))
        .filter((entry) => Number.isFinite(entry.y))
        .sort((a, b) => a.y - b.y)

    if (!candidates.length) return ''
    if (candidates.length === 1) return candidates[0].name

    const topGap = Math.abs(candidates[1].y - candidates[0].y)
    const bottomGap = Math.abs(candidates[candidates.length - 1].y - candidates[candidates.length - 2].y)
    const topThreshold = candidates[0].y + (topGap * edgeBias)
    const bottomThreshold = candidates[candidates.length - 1].y - (bottomGap * edgeBias)

    if (y <= topThreshold) return candidates[0].name
    if (y >= bottomThreshold) return candidates[candidates.length - 1].name

    return pickClosestNoteName(y, candidates.map((entry) => entry.name), noteYForName)
}

export function findToneByPitchAndAccidental(tones, toneID, preferredAccidental = '') {
    if (!Array.isArray(tones)) return null
    const targetAccidental = normalizeAccidental(preferredAccidental)
    const candidates = tones.filter((tone) => tone && tone.toneID === toneID)
    if (!candidates.length) return null

    if (targetAccidental) {
        const exact = candidates.find((tone) => {
            const parsed = parseToneName(tone.name)
            return parsed && normalizeAccidental(parsed.accidental) === targetAccidental
        })
        if (exact) return exact
    }

    const natural = candidates.find((tone) => {
        const parsed = parseToneName(tone.name)
        return parsed && !normalizeAccidental(parsed.accidental)
    })
    if (natural) return natural

    return [...candidates].sort((a, b) => {
        const parsedA = parseToneName(a.name)
        const parsedB = parseToneName(b.name)
        return accidentalComplexity(parsedA?.accidental || '') - accidentalComplexity(parsedB?.accidental || '')
    })[0]
}

export function applyAccidentalInput(noteName, accidental, tones) {
    const normalized = normalizeAccidental(accidental)
    if (!noteName) return ''
    if (!Array.isArray(tones) || !tones.length) return noteName

    const current = tones.find((tone) => tone.name === noteName)
    if (!current) return noteName

    const semitoneShift = normalized === '#' ? 1 : normalized === 'b' ? -1 : 0
    const targetToneID = current.toneID + semitoneShift
    const resolved = findToneByPitchAndAccidental(tones, targetToneID, normalized)
    return resolved?.name || noteName
}
