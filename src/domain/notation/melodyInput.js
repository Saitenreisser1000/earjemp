import { accidentalComplexity, normalizeAccidental, parseToneName } from '@/domain/notation/spelling'

export function computeInputYBounds(noteNames, noteYForName, margin = 8) {
    if (!Array.isArray(noteNames) || !noteNames.length) {
        return { min: -24, max: 154 }
    }
    const ys = noteNames
        .map((name) => noteYForName(name))
        .filter((y) => Number.isFinite(y))
    if (!ys.length) return { min: -24, max: 154 }
    return {
        min: Math.min(...ys) - margin,
        max: Math.max(...ys) + margin
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

export function pickBoundedNoteName(y, noteNames, noteYForName) {
    if (!Array.isArray(noteNames) || !noteNames.length) return ''

    const candidates = noteNames
        .map((name) => ({ name, y: noteYForName(name) }))
        .filter((entry) => Number.isFinite(entry.y))
        .sort((a, b) => a.y - b.y)

    if (!candidates.length) return ''
    if (y <= candidates[0].y) return candidates[0].name
    if (y >= candidates[candidates.length - 1].y) return candidates[candidates.length - 1].name

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
