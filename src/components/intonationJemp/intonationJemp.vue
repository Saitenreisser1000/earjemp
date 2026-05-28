<template>
    <exercise-card :disabled="lockInput">
        <template #intro>
            {{ $t('nav.intonation') }}
        </template>

        <template #controls>
            <exercise-toolbar>
                <template #level>
                    <div class="menu-label">{{ $t('common.difficulty') }}</div>
                    <v-btn-toggle
                        v-model="centSpread"
                        class="text-white spread-toggle"
                        density="compact"
                        active-class="primary"
                        background-color="secondary"
                        mandatory
                    >
                        <v-btn :value="25" size="small">1</v-btn>
                        <v-btn :value="15" size="small">2</v-btn>
                        <v-btn :value="10" size="small">3</v-btn>
                        <v-btn :value="5" size="small">4</v-btn>
                    </v-btn-toggle>
                </template>
                <template #options>
                    <div class="menu-label">{{ $t('intonation.tuning') }}</div>
                    <v-btn-toggle
                        v-model="tuning"
                        class="text-white choice-toggle mb-2"
                        density="compact"
                        active-class="primary"
                        background-color="secondary"
                        mandatory
                    >
                        <v-btn value="equal" size="small">{{ $t('intonation.equal') }}</v-btn>
                        <v-btn value="just" size="small">{{ $t('intonation.just') }}</v-btn>
                    </v-btn-toggle>

                    <div class="menu-label">{{ $t('intonation.interval') }}</div>
                    <v-select
                        v-model="selectedInterval"
                        :items="intervals"
                        :item-title="intervalTitle"
                        item-value="value"
                        return-object
                        density="compact"
                        hide-details
                    />

                    <div class="menu-label">{{ $t('common.direction') }}</div>
                    <v-btn-toggle
                        v-model="playOrder"
                        class="text-white direction-toggle"
                        density="compact"
                        active-class="primary"
                        background-color="secondary"
                        mandatory
                    >
                        <v-btn value="increase" size="small">{{ $t('common.up') }}</v-btn>
                        <v-btn value="decrease" size="small">{{ $t('common.down') }}</v-btn>
                        <v-btn value="simultaneous" size="small">=</v-btn>
                    </v-btn-toggle>
                </template>
            </exercise-toolbar>
        </template>

        <template #staff>
            <div class="staff-result-wrap">
                <staff-renderer
                    class="intonation-staff"
                    :notes="notationNotes"
                    :clef="notationClef"
                    :clef-octave="notationClefOctave"
                    :mode="notationMode"
                    :octave-offset="notationOctaveOffset"
                    :feedback-state="notationFeedbackState"
                ></staff-renderer>
                <div v-if="showActiveInterval" class="active-interval">
                    {{ $t('intonation.currentInterval') }}: {{ intervalTitle(activeInterval) }}
                </div>
                <div v-if="answered" class="result-text">
                    {{ resultText }}
                </div>
            </div>
        </template>

        <template #transport>
            <div class="intonation-transport">
                <div class="transport-grid">
                    <v-btn color="success" height="52" class="depth-btn" @click="playAgain">
                        <v-icon v-if="started" size="24">mdi-replay</v-icon>
                        <span v-else>{{ $t('common.start') }}</span>
                    </v-btn>
                    <v-btn color="error" height="52" class="depth-btn" :disabled="!started" @click="playRandom">
                        <v-icon size="24">mdi-skip-next</v-icon>
                    </v-btn>
                </div>
                <div class="variant-row">
                    <v-btn
                        v-for="variant in variants"
                        :key="variant.index"
                        class="variant-play depth-btn"
                        color="primary"
                        :disabled="!started || lockInput"
                        @click="playVariant(variant)"
                    >
                        {{ variant.index }}
                    </v-btn>
                </div>
            </div>
        </template>

        <template #answers>
            <div class="answer-grid">
                <v-btn
                    v-for="variant in variants"
                    :key="`answer-${variant.index}`"
                    color="primary"
                    class="answer-btn depth-btn"
                    :disabled="!started || lockInput"
                    @click="guessResult(variant.index)"
                >
                    {{ variant.index }}
                </v-btn>
            </div>
        </template>
    </exercise-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ExerciseCard from "@/components/common/ExerciseCard";
    import ExerciseToolbar from "@/components/common/ExerciseToolbar";
    import playSounds from "@/components/mixins/playSounds";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import responseMixin from "@/components/mixins/responseMixin";
    import StaffRenderer from "@/features/notation/components/StaffRenderer";

    const INTONATION_INTERVALS = [
        { value: 'random', labelKey: 'intonation.random', random: true },
        { value: 'b2', labelKey: 'intervals.flat2', semitones: 1, justCents: 111.73 },
        { value: '2', labelKey: 'intervals.major2', semitones: 2, justCents: 203.91 },
        { value: 'b3', labelKey: 'intervals.flat3', semitones: 3, justCents: 315.64 },
        { value: '3', labelKey: 'intervals.major3', semitones: 4, justCents: 386.31 },
        { value: '4', labelKey: 'intervals.perfect4', semitones: 5, justCents: 498.04 },
        { value: '#4', labelKey: 'intervals.tritone', semitones: 6, justCents: 590.22 },
        { value: '5', labelKey: 'intervals.perfect5', semitones: 7, justCents: 701.96 },
        { value: 'b6', labelKey: 'intervals.flat6', semitones: 8, justCents: 813.69 },
        { value: '6', labelKey: 'intervals.major6', semitones: 9, justCents: 884.36 },
        { value: 'b7', labelKey: 'intervals.flat7', semitones: 10, justCents: 1017.60 },
        { value: '7', labelKey: 'intervals.major7', semitones: 11, justCents: 1088.27 },
        { value: '8', labelKey: 'intervals.octave', semitones: 12, justCents: 1200 },
        { value: 'b9', labelKey: 'intervals.flat9', semitones: 13, justCents: 1311.73 },
        { value: '9', labelKey: 'intervals.major9', semitones: 14, justCents: 1403.91 }
    ]

    export default {
        name: "intonationJemp",
        components: {ExerciseCard, ExerciseToolbar, StaffRenderer},
        mixins: [toneCalcService, playSounds, responseMixin],
        data() {
            return {
                lockInput: false,
                tuning: 'equal',
                centSpread: 15,
                intervals: INTONATION_INTERVALS,
                selectedInterval: INTONATION_INTERVALS[0],
                activeInterval: null,
                playOrder: 'simultaneous',
                rootTone: null,
                targetTone: null,
                variants: [],
                correctVariant: null,
                started: false,
                answered: false,
                resColor: '#9DA0A9'
            }
        },
        computed: {
            ...mapGetters(['getToneChain']),
            resultText() {
                if (!this.answered) return ''
                return this.resColor === 'green'
                    ? this.$t('stats.correct')
                    : `${this.$t('stats.correct')}: ${this.correctVariant}`
            },
            showActiveInterval() {
                return this.started && this.selectedInterval && this.selectedInterval.random && this.activeInterval
            },
            notationNotes() {
                if (!this.rootTone || !this.targetTone) return []
                if (this.playOrder === 'decrease') return [this.targetTone.name, this.rootTone.name]
                return [this.rootTone.name, this.targetTone.name]
            },
            notationOctaveOffset() {
                return 1
            },
            notationAdjustedOctaves() {
                return this.notationNotes
                    .map((n) => /(\d)$/.exec(n))
                    .filter(Boolean)
                    .map((m) => Number(m[1]) + this.notationOctaveOffset)
            },
            notationClef() {
                if (!this.notationAdjustedOctaves.length) return 'treble'
                return Math.max(...this.notationAdjustedOctaves) <= 3 ? 'bass' : 'treble'
            },
            notationClefOctave() {
                if (!this.notationAdjustedOctaves.length) return ''
                if (this.notationClef === 'bass') {
                    return Math.min(...this.notationAdjustedOctaves) <= 2 ? '8vb' : ''
                }
                return Math.max(...this.notationAdjustedOctaves) >= 6 ? '8va' : ''
            },
            notationMode() {
                return this.playOrder === 'simultaneous' ? 'chord' : 'melody'
            },
            notationFeedbackState() {
                if (this.resColor === 'green') return 'success'
                if (this.resColor === 'indianred') return 'error'
                return 'neutral'
            }
        },
        methods: {
            intervalTitle(item) {
                return item && item.labelKey ? this.$t(item.labelKey) : item.value
            },
            playableIntervals() {
                return this.intervals.filter((interval) => !interval.random)
            },
            resolveActiveInterval() {
                if (!this.selectedInterval || !this.selectedInterval.random) return this.selectedInterval
                const intervals = this.playableIntervals()
                return intervals[this.randomRangeInt({min: 0, max: intervals.length})]
            },
            targetCents(interval = this.activeInterval) {
                return this.tuning === 'equal' ? interval.semitones * 100 : interval.justCents
            },
            rateForCents(cents) {
                return Math.pow(2, cents / 1200)
            },
            randomRootTone() {
                const maxToneId = 32 - this.activeInterval.semitones
                const pool = this.getToneChain.filter((tone) => (
                    /^[A-G][23]$/.test(tone.name) &&
                    tone.toneID >= 14 &&
                    tone.toneID <= maxToneId
                ))
                return pool[this.randomRangeInt({min: 0, max: pool.length})]
            },
            toneBySemitoneDistance(root, semitones) {
                return this.getToneChain.find((tone) => (
                    tone.toneID === root.toneID + semitones &&
                    tone.tone === tone.name.replace('#', 's')
                )) || this.getToneChain.find((tone) => tone.toneID === root.toneID + semitones)
            },
            shuffle(items) {
                const copy = items.slice()
                for (let i = copy.length - 1; i > 0; i--) {
                    const j = this.randomRangeInt({min: 0, max: i + 1})
                    ;[copy[i], copy[j]] = [copy[j], copy[i]]
                }
                return copy
            },
            buildVariants() {
                const offsets = this.shuffle([0, -this.centSpread, this.centSpread])
                this.variants = offsets.map((offset, idx) => ({
                    index: idx + 1,
                    offset,
                    centsFromEqual: this.targetCents() - (this.activeInterval.semitones * 100) + offset
                }))
                this.correctVariant = this.variants.find((variant) => variant.offset === 0).index
            },
            playRandom() {
                this.answered = false
                this.resColor = '#9DA0A9'
                this.activeInterval = this.resolveActiveInterval()
                this.rootTone = this.randomRootTone()
                this.targetTone = this.toneBySemitoneDistance(this.rootTone, this.activeInterval.semitones)
                this.buildVariants()
                this.started = true
                this.playAllVariants()
            },
            playAgain() {
                if (!this.started) {
                    this.playRandom()
                    return
                }
                this.playAllVariants()
            },
            playAllVariants() {
                if (!this.rootTone || !this.targetTone) return
                this.setInputlock(true)
                let start = 150
                for (const variant of this.variants) {
                    this.setExactTimeout(() => this.playVariant(variant), start, 20)
                    start += this.playOrder === 'simultaneous' ? 1500 : 1900
                }
                this.setExactTimeout(() => this.setInputlock(false), start + 300, 20)
            },
            playVariant(variant) {
                if (!this.rootTone || !this.targetTone || !variant) return
                const rootOptions = {fadeMs: 900}
                const targetOptions = {
                    rate: this.rateForCents(variant.centsFromEqual),
                    fadeMs: 900
                }

                if (this.playOrder === 'increase') {
                    this.playAudio(this.rootTone.tone, rootOptions)
                    this.setExactTimeout(() => this.playAudio(this.targetTone.tone, targetOptions), 520, 20)
                    return
                }

                if (this.playOrder === 'decrease') {
                    this.playAudio(this.targetTone.tone, targetOptions)
                    this.setExactTimeout(() => this.playAudio(this.rootTone.tone, rootOptions), 520, 20)
                    return
                }

                this.playAudio(this.rootTone.tone, rootOptions)
                this.playAudio(this.targetTone.tone, targetOptions)
            },
            guessResult(index) {
                if (!this.started || this.answered) return
                const correct = index === this.correctVariant
                this.answered = true
                this.resColor = correct ? 'green' : 'indianred'
                this.recordExerciseResult('intonation', correct)
            }
        },
        watch: {
            tuning() {
                this.started = false
                this.answered = false
                this.resColor = '#9DA0A9'
            },
            selectedInterval() {
                this.started = false
                this.answered = false
                this.activeInterval = null
                this.resColor = '#9DA0A9'
            }
        }
    }
</script>

<style scoped>
    .menu-label {
        color: rgba(0, 0, 0, 0.68);
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.2;
        margin: 4px 0 6px;
    }
    .choice-toggle,
    .spread-toggle,
    .direction-toggle {
        width: 100%;
    }
    .choice-toggle :deep(.v-btn),
    .spread-toggle :deep(.v-btn),
    .direction-toggle :deep(.v-btn) {
        flex: 1 1 0;
        min-width: 0 !important;
        text-transform: none !important;
    }
    .staff-result-wrap {
        position: relative;
    }
    .intonation-staff {
        width: 100%;
    }
    .active-interval {
        color: rgba(0, 0, 0, 0.66);
        font-size: 0.78rem;
        font-weight: 700;
        line-height: 1.2;
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        text-align: center;
        top: 4px;
    }
    .variant-row,
    .answer-grid,
    .transport-grid {
        display: grid;
        gap: 8px;
        width: 100%;
    }
    .variant-row,
    .answer-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .transport-grid {
        grid-template-columns: 2fr 1fr;
    }
    .intonation-transport {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 24px 0;
        width: 100%;
    }
    .variant-play,
    .answer-btn {
        height: 44px;
        min-width: 0 !important;
    }
    .result-text {
        color: rgba(0, 0, 0, 0.72);
        font-size: 0.85rem;
        font-weight: 700;
        line-height: 1.2;
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        text-align: center;
        bottom: 10px;
    }
    .depth-btn {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.28);
        filter: brightness(0.96);
    }
</style>
