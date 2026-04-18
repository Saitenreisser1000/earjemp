const EASY_PLUS_TRIAD_VALUES = [1, 0, 3, 2]
const EASY_PLUS_INVERSION_OPTIONS = [
    { inversion: 0 },
    { inversion: 1 },
    { inversion: 2 }
]

function maxRangeForEasyPlusInversion(chord, inversion) {
    if (inversion === 1) return Math.max(chord.maxRange, 12)
    if (inversion === 2) return Math.max(chord.maxRange, chord.toneSteps[0] + 12)
    return chord.maxRange
}

export function isEasyPlusDifficulty(difficulty) {
    return difficulty === 'easy+'
}

function normalizeChordQuality(text = '') {
    const normalized = String(text).trim().toLowerCase()
    if (normalized === 'major') return 'Major'
    if (normalized === 'minor') return 'Minor'
    if (normalized === 'augmented') return 'Augmented'
    if (normalized === 'diminished') return 'Diminished'
    return String(text)
}

export function easyPlusChordLabel(chord, inversion) {
    const quality = normalizeChordQuality(chord?.text)
    if (inversion === 1) return `${quality} 6`
    if (inversion === 2) return `${quality} 4 6`
    return `${quality} root`
}

export function createEasyPlusChordOptions(chordOptions = []) {
    const triadOrder = EASY_PLUS_TRIAD_VALUES
        .map((value) => chordOptions.find((chord) => chord.value === value))
        .filter(Boolean)

    return triadOrder.flatMap((chord) => EASY_PLUS_INVERSION_OPTIONS.map((option) => ({
        ...chord,
        toneSteps: [...chord.toneSteps],
        lineDist: [...chord.lineDist],
        baseValue: chord.value,
        baseText: chord.text,
        inversion: option.inversion,
        value: `easyplus-${chord.value}-${option.inversion}`,
        text: easyPlusChordLabel(chord, option.inversion),
        maxRange: maxRangeForEasyPlusInversion(chord, option.inversion)
    })))
}

export function applyTriadInversion(chordTones, inversion, raiseOctave) {
    if (!Array.isArray(chordTones) || chordTones.length < 3) return chordTones
    const [root, third, fifth] = chordTones
    const raise = (tone) => (typeof raiseOctave === 'function' ? raiseOctave(tone) : tone)

    if (inversion === 1) return [third, fifth, raise(root)]
    if (inversion === 2) return [fifth, raise(root), raise(third)]
    return chordTones
}
