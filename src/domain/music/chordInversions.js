const EASY_PLUS_TRIAD_VALUES = [1, 0, 3, 2]
const EASY_PLUS_INVERSION_OPTIONS = [
    { inversion: 1, label: '1st inversion' },
    { inversion: 2, label: '2nd inversion' }
]

function maxRangeForEasyPlusInversion(chord, inversion) {
    if (inversion === 1) return Math.max(chord.maxRange, 12)
    if (inversion === 2) return Math.max(chord.maxRange, chord.toneSteps[0] + 12)
    return chord.maxRange
}

export function isEasyPlusDifficulty(difficulty) {
    return difficulty === 'easy+'
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
        text: `${chord.text} (${option.label})`,
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
