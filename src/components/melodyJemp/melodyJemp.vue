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
                <div class="staff-input-wrap">
                    <staff-renderer
                        :notes="notationNotes"
                        :comparison-notes="showCheckOverlay ? mismatchSolutionNotes : []"
                        :mismatch-indices="showCheckOverlay ? mismatchIndices : []"
                        :correct-indices="showCheckOverlay ? correctIndices : []"
                        :show-position-numbers="true"
                        :position-number-states="showCheckOverlay ? resultNumberStates : []"
                        :position-number-count="melodyLength"
                        :strike-mismatch-notes="true"
                        :auto-follow-insert-marker="true"
                        :show-persistent-scrollbar="true"
                        :reset-scroll-token="scrollResetToken"
                        :clef="notationClef"
                        :feedback-state="notationFeedbackState"
                        :octave-offset="notationOctaveOffset"
                        :optimize-layout="false"
                        :preview-note="hoverNote"
                        :show-insert-marker="targetMelody.length > 0"
                        :insert-index="activeDisplayIndex"
                        :insert-count="melodyLength"
                        @slot-positions="handleSlotPositions"
                    />
                    <div
                        class="staff-input-overlay"
                        tabindex="0"
                        role="application"
                        aria-label="Melody input staff"
                        @click="handleStaffClick"
                        @mousemove="handleStaffHover"
                        @mouseleave="clearStaffHover"
                        @keydown="handleStaffKeydown"
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
                        {{ formatDisplayNoteName(hoverNote) }}
                    </div>
                    <div
                        v-if="loupeVisible"
                        class="note-loupe"
                        :style="{ left: `${loupeLeft}px`, top: `${loupeTop}px` }"
                    >
                        <div class="loupe-staff">
                            <span
                                v-for="n in 5"
                                :key="`loupe-line-${n}`"
                                class="loupe-line"
                            ></span>
                            <span
                                v-for="(y, idx) in loupeLedgerTops"
                                :key="`loupe-ledger-${idx}`"
                                class="loupe-ledger"
                                :style="{ top: `${y}px` }"
                            ></span>
                            <span class="loupe-note" :style="{ top: `${loupeNoteTop}px` }"></span>
                        </div>
                        <div class="loupe-label">{{ formatDisplayNoteName(loupeNote) }}</div>
                    </div>
                </div>
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
            <div class="input-progress" :class="{ complete: canCheckAnswer }">
                {{ inputProgressText }}
            </div>

            <div class="mb-2 mt-2 container">
                <v-btn color="primary" width="62.5%" height="52" class="mr-2 depth-btn" :disabled="interactionDisabled" @click="playAgain">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn class="button depth-btn" color="primary" width="30%" height="52" :disabled="interactionDisabled || !canCheckAnswer" @click="checkAnswer">
                    <span>check</span>
                </v-btn>
            </div>

            <div class="mb-2 d-flex align-center justify-space-between ga-2">
                <v-btn-toggle
                    v-model="selectedAccidental"
                    density="comfortable"
                    variant="outlined"
                    color="primary"
                    mandatory
                >
                    <v-btn value="">nat</v-btn>
                    <v-btn value="#">#</v-btn>
                    <v-btn value="b">b</v-btn>
                </v-btn-toggle>
                <div>
                    <v-btn class="mr-2" variant="tonal" size="small" :disabled="interactionDisabled" @click="undoInput">undo</v-btn>
                    <v-btn class="mr-2" variant="tonal" size="small" :disabled="interactionDisabled" @click="clearInput">clear</v-btn>
                    <v-btn color="primary" size="small" :disabled="interactionDisabled" @click="playRandomMelody">next</v-btn>
                </div>
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
import {
    createTouchState,
    updateTouchStateWithPick,
} from "@/features/notation/input/staffInputController";
import { createStaffNotePicker } from "@/features/notation/input/staffNotePicker";
import { resolveTouchCommit } from "@/features/notation/input/staffTouchCommit";
import {
    addInputNoteAt,
    adjustInputAt as adjustStaffInputAt,
    toggleAccidentalAt as toggleStaffAccidentalAt,
} from "@/features/notation/input/staffInputOps";
import { BPM_OPTIONS, MELODY_LENGTH_OPTIONS } from "@/domain/music/definitions";
import { matchesTonePool } from "@/domain/music/difficulty";
import { accidentalComplexity, parseToneName } from "@/domain/notation/spelling";
import { applyAccidentalInput, clampInputY, pickBoundedNoteName } from "@/domain/notation/melodyInput";
import { diatonicIndex, formatDisplayNoteName, loupeNoteTopFor } from "@/domain/notation/display";

const MELODY_SETTINGS_STORAGE_KEY = 'earjemp:melody-settings'

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
            activeDisplayIndex: 0,
            staffSlotXs: [],
            loupeVisible: false,
            loupeNote: '',
            loupeLeft: 0,
            loupeTop: 0,
            loupeNoteTop: 24,
            scrollResetToken: 0,
            selectedAccidental: ''
        }
    },
    computed: {
        ...mapGetters(['getToneChain']),
        lengthOptions() {
            return MELODY_LENGTH_OPTIONS
        },
        bpmOptions() {
            return BPM_OPTIONS
        },
        notePalette() {
            return this.getToneChain.filter((tone) => tone.id < 63 && matchesTonePool(tone, this.difficulty))
        },
        notePaletteByName() {
            const map = {}
            for (const tone of this.notePalette) map[tone.name] = tone
            return map
        },
        noteInputCandidates() {
            const diatonic = this.notePalette
                .filter((tone) => {
                    const parsed = parseToneName(tone.name)
                    return parsed && !parsed.accidental
                })
                .map((tone) => tone.name)
            return diatonic.length ? diatonic : this.notePalette.map((tone) => tone.name)
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
            const notes = this.notationNotes.filter(Boolean)
            if (!notes.length) return 'treble'

            const bounds = {
                treble: { bottom: 30, top: 38 },
                bass: { bottom: 18, top: 26 }
            }

            const scoreFor = (clef) => {
                const b = bounds[clef]
                let maxLedger = 0
                let sumLedger = 0
                for (const name of notes) {
                    const idx = diatonicIndex(name, this.notationOctaveOffset)
                    const ledgers = idx < b.bottom
                        ? Math.floor((b.bottom - idx) / 2)
                        : idx > b.top
                            ? Math.floor((idx - b.top) / 2)
                            : 0
                    maxLedger = Math.max(maxLedger, ledgers)
                    sumLedger += ledgers
                }
                return (maxLedger * 10) + sumLedger
            }

            return scoreFor('bass') <= scoreFor('treble') ? 'bass' : 'treble'
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
        enteredUserNotesCount() {
            return this.userMelody.filter(Boolean).length
        },
        canCheckAnswer() {
            return !!this.targetMelody.length && this.enteredUserNotesCount >= this.maxInputLength
        },
        interactionDisabled() {
            return this.lockInput || this.soundLoading
        },
        inputProgressText() {
            if (!this.targetMelody.length) return 'Tap play to generate a melody.'
            if (this.canCheckAnswer) return 'All notes entered — ready to check.'
            return `Input progress: ${this.enteredUserNotesCount}/${this.maxInputLength} notes`
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
        correctIndices() {
            const target = this.targetMelodyNames
            const entered = this.enteredMelodyNotes
            const length = Math.min(target.length, entered.length)
            const correct = []
            for (let i = 0; i < length; i++) {
                if (target[i] === entered[i]) correct.push(i)
            }
            return correct
        },
        mismatchSolutionNotes() {
            const target = this.targetMelodyNames
            const entered = this.enteredMelodyNotes
            const length = Math.max(target.length, entered.length)
            const notes = []
            for (let i = 0; i < length; i++) {
                notes.push(target[i] !== entered[i] ? target[i] : null)
            }
            return notes
        },
        resultNumberStates() {
            const target = this.targetMelodyNames
            const entered = this.enteredMelodyNotes
            const states = []
            for (let i = 0; i < this.melodyLength; i++) {
                states.push(target[i] === entered[i] ? 'correct' : 'wrong')
            }
            return states
        },
        toneIdByName() {
            const map = {}
            for (const tone of this.getToneChain) map[tone.name] = tone.toneID
            return map
        },
        loupeLedgerTops() {
            const tops = []
            const topLine = 8
            const bottomLine = 40
            const step = 8 // one staff line distance in loupe
            const y = this.loupeNoteTop

            if (y < topLine) {
                for (let lineY = 0; lineY >= y - 0.1; lineY -= step) tops.push(lineY)
            } else if (y > bottomLine) {
                for (let lineY = bottomLine + step; lineY <= y + 0.1; lineY += step) tops.push(lineY)
            }
            return tops
        }
    },
    mounted() {
        this.loadStoredSettings()
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
        loadStoredSettings() {
            if (typeof window === 'undefined') return
            try {
                const raw = window.localStorage.getItem(MELODY_SETTINGS_STORAGE_KEY)
                if (!raw) return
                const parsed = JSON.parse(raw)
                const difficultyOptions = ['easy', 'advanced', 'expert']
                const bpmValues = BPM_OPTIONS.map((option) => option.value)
                const melodyLengths = MELODY_LENGTH_OPTIONS.map((option) => option.value)

                if (difficultyOptions.includes(parsed?.difficulty)) this.difficulty = parsed.difficulty
                if (bpmValues.includes(parsed?.bpm)) this.bpm = parsed.bpm
                if (melodyLengths.includes(parsed?.melodyLength)) this.melodyLength = parsed.melodyLength
                if (typeof parsed?.autoplay === 'boolean') this.autoplay = parsed.autoplay
                if (typeof parsed?.showFirstToneHint === 'boolean') this.showFirstToneHint = parsed.showFirstToneHint
            } catch (error) {
                // Ignore malformed persisted settings.
            }
        },
        persistSettings() {
            if (typeof window === 'undefined') return
            const payload = {
                difficulty: this.difficulty,
                bpm: this.bpm,
                melodyLength: this.melodyLength,
                autoplay: this.autoplay,
                showFirstToneHint: this.showFirstToneHint,
            }
            window.localStorage.setItem(MELODY_SETTINGS_STORAGE_KEY, JSON.stringify(payload))
        },
        showLoupe(noteName, picked) {
            if (!picked) return
            this.loupeNote = noteName
            this.loupeLeft = picked.xInWrap
            // Keep enough vertical distance so higher expert-range notes stay inside the loupe.
            this.loupeTop = Math.max(-28, picked.snappedYInWrap - 170)
            this.loupeNoteTop = loupeNoteTopFor(noteName, this.notationClef, this.notationOctaveOffset)
            this.loupeVisible = true
        },
        formatDisplayNoteName,
        handleSlotPositions(xs) {
            this.staffSlotXs = Array.isArray(xs) ? xs : []
        },
        nextFreeDisplayIndex() {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            for (let i = 0; i < this.maxInputLength; i++) {
                if (!this.userMelody[i]) return minDisplay + i
            }
            return this.melodyLength
        },
        displayIndexToUserIndex(displayIndex) {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            return displayIndex - minDisplay
        },
        restoreInsertMarker() {
            this.activeDisplayIndex = this.nextFreeDisplayIndex()
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
            this.userMelody = Array(this.maxInputLength).fill(null)
            this.restoreInsertMarker()
            this.scrollResetToken += 1
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
        resolveAccidentalInput(noteName) {
            const resolved = applyAccidentalInput(noteName, this.selectedAccidental, this.notePalette)
            return resolved || noteName
        },
        addInputNote(noteName, displayIndex = this.activeDisplayIndex) {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const result = addInputNoteAt({
                userMelody: this.userMelody,
                noteName,
                displayIndex,
                minDisplay,
                melodyLength: this.melodyLength,
            })
            if (!result) return
            this.showCheckOverlay = false
            this.userMelody = result.nextUserMelody
            this.restoreInsertMarker()
            this.triggerHaptic()
        },
        handleStaffClick(event) {
            if (this.lockInput) return
            if (!this.targetMelody.length) return
            if (Date.now() < this.suppressClickUntil) return
            const picked = this.pickNoteFromPointerEvent(event)
            if (!picked || !picked.noteName) return
            this.activeDisplayIndex = picked.slotIndex
            this.addInputNote(picked.noteName, picked.slotIndex)
        },
        handleStaffTouchStart(event) {
            if (this.lockInput) return
            if (!this.targetMelody.length) return
            const touch = event.changedTouches?.[0]
            if (!touch) return
            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            this.touchState = createTouchState({
                startedAt: Date.now(),
                startX: touch.clientX,
                startY: touch.clientY,
                slotIndex: picked?.slotIndex ?? this.activeDisplayIndex,
                noteName: picked?.noteName || ''
            })
            if (picked && Number.isFinite(picked.slotIndex)) {
                const minDisplay = this.showFirstToneHint ? 1 : 0
                this.activeDisplayIndex = Math.max(minDisplay, Math.min(this.melodyLength - 1, picked.slotIndex))
            }
            if (picked?.noteName) {
                this.hoverNote = picked.noteName
                this.hoverLeft = picked.xInWrap + 10
                this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
                this.showLoupe(picked.noteName, picked)
            }
        },
        handleStaffTouchMove(event) {
            const touch = event.changedTouches?.[0]
            if (this.lockInput || !touch || !this.touchState) return
            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            if (picked?.noteName) {
                this.touchState = updateTouchStateWithPick(this.touchState, picked)
                const minDisplay = this.showFirstToneHint ? 1 : 0
                this.activeDisplayIndex = Math.max(minDisplay, Math.min(this.melodyLength - 1, picked.slotIndex))
                this.hoverNote = picked.noteName
                this.hoverLeft = picked.xInWrap + 10
                this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
                this.showLoupe(picked.noteName, picked)
            }
        },
        handleStaffTouchEnd(event) {
            const touch = event.changedTouches?.[0]
            if (this.lockInput) {
                this.touchState = null
                this.clearStaffHover()
                return
            }
            if (!touch || !this.touchState) return
            this.suppressClickUntil = Date.now() + 400

            const picked = this.pickNoteFromPointerEvent({
                currentTarget: event.currentTarget,
                clientX: touch.clientX,
                clientY: touch.clientY
            })
            const commit = resolveTouchCommit({
                touchState: this.touchState,
                touch,
                lastTapAt: this.lastTapAt,
                now: Date.now(),
                pick: picked,
            })
            this.lastTapAt = commit.nextLastTapAt

            if (commit.action === 'adjustPitch') {
                this.adjustInputAt(commit.step, commit.slotIndex)
                this.touchState = null
                this.clearStaffHover()
                this.restoreInsertMarker()
                return
            }

            if (commit.action === 'toggleAccidental') {
                this.toggleAccidentalAt(commit.slotIndex)
                this.touchState = null
                this.clearStaffHover()
                this.restoreInsertMarker()
                return
            }

            if (commit.action === 'commitNote') {
                this.activeDisplayIndex = commit.slotIndex
                this.addInputNote(commit.noteName, commit.slotIndex)
            }
            this.touchState = null
            this.clearStaffHover()
            this.restoreInsertMarker()
        },
        handleStaffTouchCancel() {
            this.touchState = null
            this.clearStaffHover()
            this.restoreInsertMarker()
        },
        adjustInputAt(step, displayIndex) {
            if (!Number.isFinite(step) || step === 0 || !this.maxInputLength) return
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const pitchSorted = [...new Set(this.notePalette.map((tone) => tone.name))]
                .sort((a, b) => {
                    const diff = (this.toneIdByName[a] || 0) - (this.toneIdByName[b] || 0)
                    if (diff !== 0) return diff
                    const accA = parseToneName(a)?.accidental || ''
                    const accB = parseToneName(b)?.accidental || ''
                    return accidentalComplexity(accA) - accidentalComplexity(accB)
                })
            const result = adjustStaffInputAt({
                userMelody: this.userMelody,
                displayIndex,
                minDisplay,
                melodyLength: this.melodyLength,
                step,
                pitchSorted,
            })
            if (!result) return
            this.userMelody = result.nextUserMelody
            this.showCheckOverlay = false
            this.activeDisplayIndex = result.targetDisplay
            this.triggerHaptic()
        },
        toggleAccidentalAt(displayIndex) {
            const minDisplay = this.showFirstToneHint ? 1 : 0
            const result = toggleStaffAccidentalAt({
                userMelody: this.userMelody,
                displayIndex,
                minDisplay,
                melodyLength: this.melodyLength,
                notePalette: this.notePalette,
                notePaletteByName: this.notePaletteByName,
                getToneById: (id) => this.getToneChain[id],
            })
            if (!result) return
            const parsedNext = parseToneName(result.noteName)
            if (parsedNext) this.selectedAccidental = parsedNext.accidental || ''
            this.userMelody = result.nextUserMelody
            this.showCheckOverlay = false
            this.activeDisplayIndex = result.targetDisplay
            this.triggerHaptic()
        },
        handleStaffHover(event) {
            if (this.lockInput) {
                this.clearStaffHover()
                return
            }
            const picked = this.pickNoteFromPointerEvent(event)
            if (!picked || !picked.noteName) {
                this.clearStaffHover()
                return
            }
            this.hoverNote = picked.noteName
            this.hoverLeft = picked.xInWrap + 10
            this.hoverTop = Math.max(0, picked.snappedYInWrap - 22)
            this.showLoupe(picked.noteName, picked)
        },
        handleStaffKeydown(event) {
            if (this.interactionDisabled || !this.targetMelody.length) return

            const minDisplay = this.showFirstToneHint ? 1 : 0
            const maxDisplay = Math.max(minDisplay, this.melodyLength - 1)

            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                this.activeDisplayIndex = Math.max(minDisplay, this.activeDisplayIndex - 1)
                return
            }
            if (event.key === 'ArrowRight') {
                event.preventDefault()
                this.activeDisplayIndex = Math.min(maxDisplay, this.activeDisplayIndex + 1)
                return
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault()
                this.adjustInputAt(1, this.activeDisplayIndex)
                return
            }
            if (event.key === 'ArrowDown') {
                event.preventDefault()
                this.adjustInputAt(-1, this.activeDisplayIndex)
                return
            }
            if (event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault()
                this.undoInput()
                return
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                if (this.canCheckAnswer) {
                    this.checkAnswer()
                } else {
                    this.playAgain()
                }
            }
        },
        clearStaffHover() {
            this.hoverNote = ''
            this.loupeVisible = false
        },
        pickNoteFromPointerEvent(event) {
            const overlay = event.currentTarget
            const wrap = overlay.closest('.staff-input-wrap')
            if (!wrap) return null
            const svg = wrap.querySelector('svg')
            if (!svg) return null

            const pickNote = createStaffNotePicker({
                noteInputCandidates: this.noteInputCandidates,
                clampInputY,
                noteYForName: (name) => this.noteYForClef(name, this.notationClef),
                mapYToNoteName: (y) => this.mapYToNoteName(y),
                resolveAccidentalInput: (name) => this.resolveAccidentalInput(name),
                pickSlotXs: this.staffSlotXs,
                melodyLength: this.melodyLength,
            })

            return pickNote({
                clientX: event.clientX,
                clientY: event.clientY,
                wrapRect: wrap.getBoundingClientRect(),
                svgRect: svg.getBoundingClientRect(),
            })
        },
        mapYToNoteName(y) {
            const candidates = this.noteInputCandidates
            if (!candidates.length) return ''
            return pickBoundedNoteName(y, candidates, (name) => this.noteYForClef(name, this.notationClef))
        },
        noteYForClef(noteName, clef) {
            // SVG coordinates from StaffRenderer/VexFlow: bottom line at y≈55, 5px per diatonic step.
            const bottomIndex = clef === 'bass' ? 18 : 30 // bass G2, treble E4
            const bottomY = 55
            const idx = diatonicIndex(noteName, this.notationOctaveOffset)
            const drawingOffsetPx = 40 // one ninth (8 diatonic steps) downward correction
            return bottomY - (idx - bottomIndex) * 5 + drawingOffsetPx
        },
        undoInput() {
            this.showCheckOverlay = false
            const lastFilled = this.findLastFilledUserIndex()
            if (lastFilled < 0) {
                this.activeDisplayIndex = this.showFirstToneHint ? 1 : 0
                return
            }
            this.userMelody.splice(lastFilled, 1, null)
            const minDisplay = this.showFirstToneHint ? 1 : 0
            this.activeDisplayIndex = minDisplay + lastFilled
        },
        clearInput() {
            this.showCheckOverlay = false
            this.userMelody = Array(this.maxInputLength).fill(null)
            this.activeDisplayIndex = this.showFirstToneHint ? 1 : 0
            this.scrollResetToken += 1
            this.loupeVisible = false
        },
        findLastFilledUserIndex() {
            for (let i = this.userMelody.length - 1; i >= 0; i--) {
                if (this.userMelody[i]) return i
            }
            return -1
        },
        checkAnswer() {
            if (!this.canCheckAnswer) return
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
            this.persistSettings()
        },
        autoplay() {
            this.persistSettings()
        },
        difficulty() {
            this.persistSettings()
        },
        bpm() {
            this.persistSettings()
        },
        melodyLength() {
            this.persistSettings()
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
    margin-top: 14px;
    margin-bottom: 18px;
}
.input-progress {
    margin-top: 6px;
    margin-bottom: 2px;
    font-size: 13px;
    color: #546e7a;
}
.input-progress.complete {
    color: #2e7d32;
    font-weight: 600;
}
.staff-input-wrap {
    position: relative;
    cursor: crosshair;
    padding-top: 28px;
    padding-bottom: 56px;
}
.staff-input-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    /* Keep the gesture fully in-app so touch note placement and vertical adjustments stay reliable. */
    touch-action: none;
}
.staff-input-overlay:focus-visible {
    outline: 2px solid rgba(25, 118, 210, 0.85);
    outline-offset: 4px;
    border-radius: 10px;
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
.note-loupe {
    position: absolute;
    z-index: 4;
    transform: translateX(-50%);
    min-width: 72px;
    padding: 4px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
    pointer-events: none;
}
.loupe-staff {
    position: relative;
    width: 60px;
    height: 48px;
}
.loupe-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.48);
}
.loupe-line:nth-child(1) { top: 8px; }
.loupe-line:nth-child(2) { top: 16px; }
.loupe-line:nth-child(3) { top: 24px; }
.loupe-line:nth-child(4) { top: 32px; }
.loupe-line:nth-child(5) { top: 40px; }
.loupe-note {
    position: absolute;
    left: 24px;
    width: 12px;
    height: 9px;
    border-radius: 50%;
    background: #111;
    transform: translateY(-50%);
}
.loupe-ledger {
    position: absolute;
    left: 20px;
    width: 20px;
    height: 1px;
    background: rgba(0, 0, 0, 0.7);
}
.loupe-label {
    margin-top: 2px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #111;
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
