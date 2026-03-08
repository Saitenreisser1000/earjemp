import { chooseBestSpelling, parseToneName, shiftLetter } from "@/domain/notation/spelling";

function toneById(toneChain, id) {
    return toneChain[id]
}

function enharmonicCandidates(toneChain, tone) {
    const candidates = [tone]
    const enh = Array.isArray(tone?.enh) ? tone.enh : []
    for (const id of enh) {
        const candidate = toneById(toneChain, id)
        if (candidate) candidates.push(candidate)
    }
    return candidates
}

export function reduceToneList(toneChain, reduceAmount) {
    return toneChain.filter((tone) => tone.toneID <= 44 - reduceAmount && tone.id < 63)
}

export function switchToneByNotation(toneChain, firstTone, secondTone, lineDist) {
    if (!firstTone || !secondTone) return secondTone
    if (Math.abs(firstTone.linePos - secondTone.linePos) === lineDist) return secondTone

    const candidates = enharmonicCandidates(toneChain, secondTone)
    const validLineCandidates = candidates.filter(
        (candidate) => Math.abs(firstTone.linePos - candidate.linePos) === lineDist
    )
    if (!validLineCandidates.length) return secondTone

    const parsedFirst = parseToneName(firstTone.name)
    const expectedLetter = parsedFirst ? shiftLetter(parsedFirst.letter, lineDist) : ''
    return chooseBestSpelling(validLineCandidates, expectedLetter) || secondTone
}

export function getInterval(toneChain, tone, intervalSteps, lineDist) {
    let newTone = tone
    for (let i = 0; i < intervalSteps; i++) {
        newTone = toneById(toneChain, newTone.next)
    }
    return switchToneByNotation(toneChain, tone, newTone, lineDist)
}

export function getScale(toneChain, rootToneIndex, stepsPattern) {
    const notes = []
    let current = toneById(toneChain, rootToneIndex)
    notes.push(current)

    for (const semitones of stepsPattern) {
        current = getInterval(toneChain, current, semitones, 1)
        notes.push(current)
    }
    return notes
}

