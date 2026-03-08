<template>
    <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
        <v-card class="mx-auto bg-blue-grey-lighten-5 d-flex flex-column ga-2" max-width="350" min-height="550" :disabled="lockInput" flat>
            <div class="choose-header">
                <v-btn-toggle
                    v-model="difficulty"
                    class="text-white difficulty-toggle"
                    density="compact"
                    active-class="primary"
                    background-color="secondary"
                    mandatory
                >
                    <v-btn value="easy" size="small">easy</v-btn>
                    <v-btn value="advanced" size="small">advanced</v-btn>
                    <v-btn value="expert" size="small">expert</v-btn>
                </v-btn-toggle>
                <v-menu location="bottom end" :close-on-content-click="false">
                    <template #activator="{ props }">
                        <v-btn
                            v-bind="props"
                            variant="text"
                            size="small"
                            color="primary"
                            prepend-icon="mdi-cog"
                        >
                            options
                        </v-btn>
                    </template>
                <v-card min-width="220" class="pa-2">
                    <v-switch
                        v-model="autoplay"
                        label="autoplay"
                        class="my-0"
                        density="compact"
                        hide-details
                    />
                    <v-switch
                        v-model="showFirstToneHint"
                        label="show 1st note"
                        class="my-0"
                        density="compact"
                        hide-details
                    />
                    <v-select
                        v-model="bpm"
                        :items="bpmOptions"
                        item-title="label"
                        item-value="value"
                        label="BPM"
                        density="compact"
                        hide-details
                        class="mt-1"
                    />
                </v-card>
            </v-menu>
        </div>

            <div class="between-slot">
                <div class="staff-input-wrap" @click="handleStaffClick">
                    <staff-renderer
                        :notes="notationNotes"
                        :comparison-notes="showCheckOverlay ? targetMelodyNames : []"
                        :mismatch-indices="showCheckOverlay ? mismatchIndices : []"
                        :clef="notationClef"
                        :feedback-state="notationFeedbackState"
                        :octave-offset="notationOctaveOffset"
                        :optimize-layout="false"
                        :preview-note="hoverNote"
                        :show-insert-marker="targetMelody.length > 0"
                        :insert-index="activeDisplayIndex"
                        :insert-count="melodyLength"
                    />
                    <div
                        class="staff-input-overlay"
                        @mousemove="handleStaffHover"
                        @mouseleave="clearStaffHover"
                        @touchstart.prevent="handleStaffTouchStart"
                        @touchmove.prevent="handleStaffTouchMove"
                        @touchend.prevent="handleStaffTouchEnd"
                        @touchcancel.prevent="handleStaffTouchCancel"
                    ></div>
                    <div
                        v-if="hoverNote"
                        class="hover-note"
                        :style="{ left: `${hoverLeft}px`, top: `${hoverTop}px` }"
                    >
                        {{ hoverNote }}
                    </div>
                </div>
                <div class="text-caption input-hint">{{ inputHint }}</div>
            </div>

            <v-select
                v-model="melodyLength"
                :items="lengthOptions"
                item-title="label"
                item-value="value"
                label="Select Melody Length"
                hide-details
                class="melody-length-select flex-grow-0"
            />

            <div class="mb-2 mt-2 container">
                <v-btn color="primary" width="62.5%" height="52" class="mr-2 depth-btn" @click="playAgain">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn class="button depth-btn" color="primary" width="30%" height="52" @click="playRandomMelody">
                    <span>next</span>
                </v-btn>
            </div>

            <div class="mb-2">
                <v-btn class="mr-2" variant="tonal" size="small" @click="undoInput">undo</v-btn>
                <v-btn class="mr-2" variant="tonal" size="small" @click="clearInput">clear</v-btn>
                <v-btn color="primary" size="small" @click="checkAnswer">check</v-btn>
            </div>
        </v-card>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import toneCalcService from "@/components/mixins/toneCalcService";
import playSounds from "@/components/mixins/playSounds";
import responseMixin from "@/components/mixins/responseMixin";
import StaffRenderer from "@/features/notation/components/StaffRenderer";
import { BPM_OPTIONS, MELODY_LENGTH_OPTIONS } from "@/domain/music/definitions";
import { matchesTonePool } from "@/domain/music/difficulty";

export default {
    name: "melodyJemp",
    components: { StaffRenderer },
    mixins: [toneCalcService, playSounds, responseMixin],
    data() {
        return {
            lockInput: false,
            autoplay: true,
            melodyLength: 5,
            bpm: 80,
            difficulty: 'easy',
            targetMelody: [],
            userMelody: [],
            resColor: '#9DA0A9',
            firstTone: '',
            showFirstToneHint: true,
            hoverNote: '',
            hoverLeft: 0,
            hoverTop: 0,
            showCheckOverlay: false,
            suppressClickUntil: 0,
            lastTapAt: 0,
            touchState: null,
            activeDisplayIndex: 0
        }
    },
    computed: {
        ...mapGetters(['getToneChain']),
        inputHint() {
            return this.isMobileInputMode()
                ? 'tap to set, swipe up/down to adjust, double tap to switch accidental'
                : 'click in staff to draw notes'
        },
        lengthOptions() {
            return MELODY_LENGTH_OPTIONS
        },
        bpmOptions() {
            return BPM_OPTIONS
        },
        notePalette() {
            return this.getToneChain.filter((tone) => tone.id < 63 && matchesTonePool(tone, this.difficulty))
        },
        notationNotes() {
            return this.enteredMelodyNotes
        },
        targetMelodyNames() {
            return this.targetMelody.map((t) => t.name)
        },
        enteredMelodyNotes() {
            if (this.showFirstToneHint && this.targetMelody.length > 0) {
                return [this.targetMelody[0].name, ...this.userMelody].slice(0, this.melodyLength)
            }
            return this.userMelody.slice(0, this.melodyLength)
        },
        notationClef() {
            if (!this.notationNotes.length) return 'treble'
            const maxOctave = Math.max(...this.notationNotes.map((n) => Number((/(\d)$/.exec(n) || [])[1] || 4) + this.notationOctaveOffset))
            return maxOctave <= 3 ? 'bass' : 'treble'
        },
        notationOctaveOffset() {
            return 1
        },
        notationFeedbackState() {
            if (this.resColor === 'green') return 'success'
            if (this.resColor === 'indianred') return 'error'
            return 'neutral'
        },
        maxInputLength() {
            return this.showFirstToneHint ? Math.max(0, this.melodyLength - 1) : this.melodyLength
        },
        mismatchIndices() {
            const target = this.targetMelodyNames
            const entered = this.enteredMelodyNotes
            const length = Math.max(target.length, entered.length)
            const mismatches = []
            for (let i = 0; i < length; i++) {
                if (target[i] !== entered[i]) mismatches.push(i)
            }
            return mismatches
        },
        toneIdByName() {
            const map = {}
            for (const tone of this.getToneChain) map[tone.name] = tone.toneID
            return map
        }
    },
    methods: {
        isMobileInputMode() {
            if (typeof window === 'undefined') return false
            return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900
        },
        triggerHaptic() {
            if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(10)
            }
        },
        playAgain() {
            if (!this.targetMelody.length) {
                this.playRandomMelody()
                return
            }
            this.playTones()
        },
        playRandomMelody() {
            this.clearInput()
            this.resetResponse()
            this.showCheckOverlay = false

            const pool = this.notePalette
            if (!pool.length) return

            this.targetMelody = []
            for (let i = 0; i < this.melodyLength; i++) {
                const idx = this.randomRangeInt({ min: 0, max: pool.length })
                this.targetMelody.push(pool[idx])
            }
            this.activeDisplayIndex = this.showFirstToneHint ? 1 : 0
            this.userMelody = Array(this.maxInputLength).fill(null)
            this.playTones()
        },
        playTones() {
            if (!this.targetMelody.length) return
            this.setInputlock(true)
            this.firstTone = this.targetMelody[0]
            let start = 200
            const delay = Math.round(60000 / this.bpm)
            for (const tone of this.targetMelody) {
                this.setExactTimeout(() => {
                    this.playAudio(tone.tone)
                }, start, 20)
                start += delay
            }
            this.setExactTimeout(() => { this.setInputlock(false) }, start + 100, 20)
        },
        addInputNote(noteName, displayIndex = this.activeDisplayIndex) {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const clampedDisplay = Math.max(minDisplay, Math.min(this.melodyLength - 1, displayIndex))
            const userIndex = clampedDisplay - minDisplay
            if (userIndex < 0 || userIndex >= this.maxInputLength) return
            this.showCheckOverlay = false
            this.userMelody.splice(userIndex, 1, noteName)
            this.activeDisplayIndex = Math.min(this.melodyLength - 1, clampedDisplay + 1)
            this.triggerHaptic()
        },
        handleStaffClick(event) {
            if (!this.targetMelody.length) return
            if (Date.now() < this.suppressClickUntil) return
            const picked = this.pickNoteFromPointerEvent(event)
            if (!picked || !picked.noteName) return
            this.activeDisplayIndex = picked.slotIndex
            this.addInputNote(picked.noteName, picked.slotIndex)
        },
        handleStaffTouchStart(event) {
            if (!this.targetMelody.length) return
            const touch = event.changedTouches?.[0]
            if (!touch) return
            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            this.touchState = {
                startedAt: Date.now(),
                startX: touch.clientX,
                startY: touch.clientY
            }
            if (picked?.noteName) {
                this.hoverNote = picked.noteName
                this.hoverLeft = picked.xInWrap + 10
                this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
            }
        },
        handleStaffTouchMove(event) {
            const touch = event.changedTouches?.[0]
            if (!touch || !this.touchState) return
            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            if (picked?.noteName) {
                this.hoverNote = picked.noteName
                this.hoverLeft = picked.xInWrap + 10
                this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
            }
        },
        handleStaffTouchEnd(event) {
            const touch = event.changedTouches?.[0]
            if (!touch || !this.touchState) return
            this.suppressClickUntil = Date.now() + 400

            const elapsed = Date.now() - this.touchState.startedAt
            const dx = touch.clientX - this.touchState.startX
            const dy = touch.clientY - this.touchState.startY
            const distance = Math.hypot(dx, dy)
            const absDy = Math.abs(dy)
            if (elapsed > 650 && distance < 8) {
                this.touchState = null
                this.clearStaffHover()
                return
            }

            if (absDy >= 24 && absDy > Math.abs(dx)) {
                const step = Math.round((-dy) / 24)
                this.adjustLastInput(step)
                this.touchState = null
                this.clearStaffHover()
                return
            }

            const isDoubleTap = Date.now() - this.lastTapAt < 320
            this.lastTapAt = Date.now()
            if (isDoubleTap) {
                this.toggleLastAccidental()
                this.touchState = null
                this.clearStaffHover()
                return
            }

            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            if (picked?.noteName) {
                this.activeDisplayIndex = picked.slotIndex
                this.addInputNote(picked.noteName, picked.slotIndex)
            }
            this.touchState = null
            this.clearStaffHover()
        },
        handleStaffTouchCancel() {
            this.touchState = null
            this.clearStaffHover()
        },
        adjustLastInput(step) {
            if (!Number.isFinite(step) || step === 0 || !this.maxInputLength) return
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const displayIndex = Math.max(minDisplay, Math.min(this.melodyLength - 1, this.activeDisplayIndex))
            const userIndex = displayIndex - minDisplay
            const current = this.userMelody[userIndex]
            if (!current) return
            // Sort by pitch for deterministic stepping.
            const pitchSorted = [...new Set(this.notePalette.map((tone) => tone.name))]
                .sort((a, b) => (this.toneIdByName[a] || 0) - (this.toneIdByName[b] || 0))
            const index = pitchSorted.indexOf(current)
            if (index < 0) return
            const nextIndex = Math.max(0, Math.min(pitchSorted.length - 1, index + step))
            this.userMelody.splice(userIndex, 1, pitchSorted[nextIndex])
            this.showCheckOverlay = false
            this.triggerHaptic()
        },
        toggleLastAccidental() {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const displayIndex = Math.max(minDisplay, Math.min(this.melodyLength - 1, this.activeDisplayIndex))
            const userIndex = displayIndex - minDisplay
            const current = this.userMelody[userIndex]
            if (!current) return
            const currentTone = this.notePalette.find((tone) => tone.name === current)
            if (!currentTone || !Array.isArray(currentTone.enh)) return
            const candidates = currentTone.enh
                .map((id) => this.getToneChain[id])
                .filter((tone) => tone && this.notePalette.some((p) => p.name === tone.name))
            if (!candidates.length) return
            const currentIdx = candidates.findIndex((tone) => tone.name === current)
            const next = candidates[(currentIdx + 1 + candidates.length) % candidates.length] || candidates[0]
            this.userMelody.splice(userIndex, 1, next.name)
            this.showCheckOverlay = false
            this.triggerHaptic()
        },
        handleStaffHover(event) {
            const picked = this.pickNoteFromPointerEvent(event)
            if (!picked || !picked.noteName) {
                this.clearStaffHover()
                return
            }
            this.hoverNote = picked.noteName
            this.hoverLeft = picked.xInWrap + 10
            this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
        },
        clearStaffHover() {
            this.hoverNote = ''
        },
        pickNoteFromPointerEvent(event) {
            const overlay = event.currentTarget
            const wrap = overlay.closest('.staff-input-wrap')
            if (!wrap) return null
            const svg = wrap.querySelector('svg')
            if (!svg) return null

            const wrapRect = wrap.getBoundingClientRect()
            const svgRect = svg.getBoundingClientRect()
            const xInWrap = event.clientX - wrapRect.left
            const xInSvg = event.clientX - svgRect.left
            const yInSvg = event.clientY - svgRect.top
            const clampedYInSvg = Math.max(0, Math.min(svgRect.height, yInSvg))
            const noteName = this.mapYToNoteName(clampedYInSvg)
            const snappedYInSvg = this.noteYForClef(noteName, this.notationClef)
            const snappedYInWrap = (svgRect.top - wrapRect.top) + snappedYInSvg
            const leftPadding = 90
            const rightPadding = 22
            const slots = Math.max(1, this.melodyLength)
            const usable = Math.max(20, svgRect.width - leftPadding - rightPadding)
            const normalized = Math.max(0, Math.min(usable, xInSvg - leftPadding))
            const slotIndexRaw = Math.floor((normalized / usable) * slots)
            const slotIndex = Math.max(0, Math.min(slots - 1, slotIndexRaw))

            return { noteName, xInWrap, snappedYInWrap, slotIndex }
        },
        mapYToNoteName(y) {
            const candidates = this.notePalette.map((tone) => tone.name)
            if (!candidates.length) return ''

            let best = candidates[0]
            let bestDist = Number.POSITIVE_INFINITY
            for (const name of candidates) {
                const expectedY = this.noteYForClef(name, this.notationClef)
                const dist = Math.abs(expectedY - y)
                if (dist < bestDist) {
                    bestDist = dist
                    best = name
                }
            }
            return best
        },
        noteYForClef(noteName, clef) {
            // SVG coordinates from StaffRenderer/VexFlow: bottom line at y≈55, 5px per diatonic step.
            const bottomIndex = clef === 'bass' ? 18 : 30 // bass G2, treble E4
            const bottomY = 55
            const idx = this.diatonicIndex(noteName, this.notationOctaveOffset)
            const drawingOffsetPx = 40 // one ninth (8 diatonic steps) downward correction
            return bottomY - (idx - bottomIndex) * 5 + drawingOffsetPx
        },
        diatonicIndex(noteName, octaveOffset = 0) {
            const match = /^([A-Ga-g])[^0-9]*(\d)$/.exec(noteName || '')
            if (!match) return 0
            const letter = match[1].toLowerCase()
            const octave = Number(match[2]) + octaveOffset
            const map = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 }
            return octave * 7 + map[letter]
        },
        undoInput() {
            this.showCheckOverlay = false
            this.userMelody.pop()
        },
        clearInput() {
            this.showCheckOverlay = false
            this.userMelody = Array(this.maxInputLength).fill(null)
            this.activeDisplayIndex = this.showFirstToneHint ? 1 : 0
        },
        checkAnswer() {
            const target = this.targetMelodyNames
            const entered = this.enteredMelodyNotes
            const sameLength = entered.length === target.length
            const equal = sameLength && entered.every((n, i) => n === target[i])
            this.showCheckOverlay = true
            this.resColor = equal ? 'green' : 'indianred'
            if (equal && this.autoplay) {
                this.setExactTimeout(() => {
                    this.playRandomMelody()
                }, 1000, 20)
            }
        }
    },
    watch: {
        showFirstToneHint() {
            this.clearInput()
            this.resetResponse()
            this.showCheckOverlay = false
        }
    }
}
</script>

<style scoped>
.exercise-card {
    max-height: calc(90vh - 16px);
    overflow-y: auto;
    overflow-x: hidden;
}
.choose-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}
.difficulty-toggle :deep(.v-btn) {
    text-transform: none !important;
    min-width: 52px;
}
.melody-length-select :deep(.v-field) {
    min-height: 56px !important;
}
.melody-length-select {
    flex: 0 0 auto !important;
}
.between-slot {
    margin-bottom: 10px;
}
.staff-input-wrap {
    position: relative;
    cursor: crosshair;
}
.staff-input-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    touch-action: pan-x;
}
.hover-note {
    position: absolute;
    z-index: 3;
    padding: 2px 6px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.72);
    color: #fff;
    font-size: 12px;
    line-height: 1.1;
    pointer-events: none;
}
.input-hint {
    margin-top: 2px;
}
.container{
    padding: 0;
}
.btn{
    width: 30%;
    height: 50px;
    font-size: 10px;
    text-transform: none !important;
}
.depth-btn {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.28);
    filter: brightness(0.96);
}
</style>
