<template>
    <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
        <v-card class="mx-auto bg-blue-grey-lighten-5 d-flex flex-column ga-2" max-width="350" min-height="550" :disabled="lockInput" flat>
            <div class="intro-copy">
                {{ $t('intro.inversions') }}
            </div>
            <div class="choose-header">
                <v-spacer></v-spacer>
                <v-menu location="bottom end" :close-on-content-click="false">
                    <template #activator="{ props }">
                        <v-btn
                            v-bind="props"
                            variant="text"
                            size="small"
                            color="primary"
                            prepend-icon="mdi-cog"
                        >
                            {{ $t('common.options') }}
                        </v-btn>
                    </template>
                    <v-card min-width="220" class="pa-2">
                        <v-switch
                            v-model="autoplay"
                            :label="$t('common.autoplay')"
                            class="my-0"
                            density="compact"
                            hide-details
                        />
                        <v-select
                            v-model="resultDisplayMs"
                            :items="resultDisplayOptions"
                            item-title="label"
                            item-value="value"
                            :label="$t('common.resultDisplay')"
                            density="compact"
                            hide-details
                            class="mt-1"
                        />
                    </v-card>
                </v-menu>
            </div>
            <div class="between-slot">
                <div class="staff-result-wrap">
                    <staff-renderer
                        :notes="notationNotes"
                        :clef="notationClef"
                        :clef-octave="notationClefOctave"
                        mode="chord"
                        :octave-offset="notationOctaveOffset"
                        :feedback-state="notationFeedbackState"
                    ></staff-renderer>
                    <div v-if="successDetail" class="success-detail">{{ successDetail }}</div>
                </div>
            </div>
            <div class="controls-row">
                <v-btn-toggle
                    v-model="playOrder"
                    class="text-white play-order-toggle"
                    dense
                    active-class="primary"
                    background-color="secondary"
                    multiple
                    mandatory
                >
                    <v-btn value="increase">
                        <span>{{ $t('common.up') }}</span>
                    </v-btn>
                    <v-btn value="decrease">
                        <span>{{ $t('common.down') }}</span>
                    </v-btn>
                    <v-btn value="simultaneous">
                        <span>=</span>
                    </v-btn>
                </v-btn-toggle>
                <v-select
                    v-model="selectedInversions"
                    :items="inversions"
                    :item-title="inversionTitle"
                    item-value="value"
                    return-object
                    :label="$t('common.selectInversions')"
                    multiple
                    density="compact"
                    hide-details
                    class="inversion-inline-select"
                >
                    <template #selection></template>
                </v-select>
            </div>
            <chord-play @playAgain="playAgain" @playRandomChord="playRandom"></chord-play>
            <div>
                <v-btn
                    v-for="item in selectedInversions"
                    :key="item.value"
                    @click="guessResult(item.text)"
                    class="mb-2 mr-2 btn depth-btn"
                    color="primary"
                    size="x-large"
                >
                    {{ inversionTitle(item) }}
                </v-btn>
            </div>
        </v-card>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex';
    import chordPlay from "@/components/chordjemp/chordPlay";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";
    import StaffRenderer from "@/features/notation/components/StaffRenderer";

    const INVERSION_OPTIONS = [
        { text: 'major root', labelKey: 'inversions.majorRoot', value: 'major-root', toneSteps: [4, 3], lineDist: [2, 2], maxRange: 7 },
        { text: 'major 1st inv.', labelKey: 'inversions.majorFirst', value: 'major-first', toneSteps: [3, 5], lineDist: [2, 3], maxRange: 8 },
        { text: 'major 2nd inv.', labelKey: 'inversions.majorSecond', value: 'major-second', toneSteps: [5, 4], lineDist: [3, 2], maxRange: 9 },
        { text: 'minor root', labelKey: 'inversions.minorRoot', value: 'minor-root', toneSteps: [3, 4], lineDist: [2, 2], maxRange: 7 },
        { text: 'minor 1st inv.', labelKey: 'inversions.minorFirst', value: 'minor-first', toneSteps: [4, 5], lineDist: [2, 3], maxRange: 9 },
        { text: 'minor 2nd inv.', labelKey: 'inversions.minorSecond', value: 'minor-second', toneSteps: [5, 3], lineDist: [3, 2], maxRange: 8 }
    ];

    const cloneOptions = () => JSON.parse(JSON.stringify(INVERSION_OPTIONS));

    export default {
        name: "inversionJemp",
        components: {chordPlay, StaffRenderer},
        mixins: [toneCalcService, playSounds, responseMixin],
        data() {
            const inversions = cloneOptions();
            return {
                lockInput: false,
                result: '',
                resColor: '#9DA0A9',
                inversions,
                selectedInversions: cloneOptions(),
                randomInversion: '',
                reducedList: '',
                firstTone: '',
                secondTone: '',
                thirdTone: '',
                successDetail: '',
                autoplay: true,
                playOrder: ['simultaneous'],
                randomOrder: 'simultaneous',
                hasAnswered: false,
                resultDisplayMs: 1500,
                resultTimer: null,
                resultDisplayOptions: [
                    { label: '0.5s', value: 500 },
                    { label: '1.0s', value: 1000 },
                    { label: '1.5s', value: 1500 },
                    { label: '2.0s', value: 2000 },
                    { label: '3.0s', value: 3000 }
                ]
            }
        },
        computed: {
            ...mapGetters(['getToneChain']),
            notationNotes() {
                if (!this.hasAnswered) return []
                return [this.firstTone, this.secondTone, this.thirdTone]
                    .filter((tone) => tone && tone.name)
                    .map((tone) => tone.name)
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
            notationFeedbackState() {
                if (this.resColor === 'green') return 'success'
                if (this.resColor === 'indianred') return 'error'
                return 'neutral'
            }
        },
        methods: {
            clearResultTimer() {
                if (this.resultTimer) {
                    clearInterval(this.resultTimer)
                    this.resultTimer = null
                }
            },
            hideResult() {
                this.hasAnswered = false
                this.successDetail = ''
                this.resetResponse()
            },
            toneLabel(tone) {
                return tone && tone.name ? tone.name.replace(/\d$/, '') : ''
            },
            inversionTitle(item) {
                return item && item.labelKey ? this.$t(item.labelKey) : ''
            },
            inversionRootTone() {
                if (!this.randomInversion) return ''
                if (this.randomInversion.value.endsWith('-first')) return this.thirdTone
                if (this.randomInversion.value.endsWith('-second')) return this.secondTone
                return this.firstTone
            },
            inversionFiguredBass() {
                if (!this.randomInversion) return ''
                if (this.randomInversion.value.endsWith('-first')) return '6'
                if (this.randomInversion.value.endsWith('-second')) return '4 6'
                return this.$t(this.randomInversion.labelKey)
            },
            inversionDetail() {
                return `${this.toneLabel(this.inversionRootTone())} ${this.inversionFiguredBass()}`
            },
            playRandom() {
                this.clearResultTimer()
                this.successDetail = ''
                if (!Array.isArray(this.selectedInversions) || this.selectedInversions.length === 0) {
                    this.setResult(this.$t('feedback.chooseInversion'))
                    this.resColor = 'indianred'
                    return
                }

                const rand = this.randomRangeInt({min: 0, max: this.selectedInversions.length})
                this.randomInversion = this.selectedInversions[rand]
                this.reducedList = this.reduceToneList(this.randomInversion.maxRange)
                this.randomOrder = this.playOrder[0] || 'simultaneous'
                if (this.playOrder.length > 1) {
                    this.randomOrder = this.playOrder[this.randomRangeInt({min: 0, max: this.playOrder.length})]
                }

                this.setResult(this.randomInversion.text)
                this.resetResponse()
                this.hasAnswered = false
                this.calcFirstTone()
            },
            calcFirstTone() {
                const max = this.reducedList.length
                const min = Math.min(12, Math.max(0, max - 1))
                this.firstTone = this.reducedList[this.randomRangeInt({min, max})]
                this.calcInversion()
            },
            calcInversion() {
                this.secondTone = this.getInterval(this.firstTone, this.randomInversion.toneSteps[0], this.randomInversion.lineDist[0])
                this.thirdTone = this.getInterval(this.secondTone, this.randomInversion.toneSteps[1], this.randomInversion.lineDist[1])
                this.playTones()
            },
            playTones() {
                this.setInputlock(true)
                const chordTones = [this.firstTone, this.secondTone, this.thirdTone]

                if (this.randomOrder === 'simultaneous') {
                    this.setExactTimeout(() => {
                        for (const tone of chordTones) this.playAudio(tone.tone)
                    }, 200, 20)
                    this.setExactTimeout(() => { this.setInputlock(false) }, 1000, 20)
                    return
                }

                const ordered = this.randomOrder === 'decrease' ? chordTones.slice().reverse() : chordTones
                let start = 200
                const delay = 350
                for (const tone of ordered) {
                    this.setExactTimeout(() => { this.playAudio(tone.tone) }, start, 20)
                    start += delay
                }
                this.setExactTimeout(() => { this.setInputlock(false) }, start + 200, 20)
            },
            guessResult(guess) {
                this.clearResultTimer()
                this.hasAnswered = true
                this.successDetail = ''
                if (guess === this.result) {
                    this.resColor = 'green'
                    this.successDetail = this.inversionDetail()
                    if (this.autoplay) {
                        this.resultTimer = this.setExactTimeout(() => {
                            this.resultTimer = null
                            this.playRandom()
                        }, this.resultDisplayMs, 20)
                    } else {
                        this.resultTimer = this.setExactTimeout(() => {
                            this.resultTimer = null
                            this.hideResult()
                        }, this.resultDisplayMs, 20)
                    }
                } else {
                    this.resColor = 'indianred'
                    this.resultTimer = this.setExactTimeout(() => {
                        this.resultTimer = null
                        this.hideResult()
                    }, this.resultDisplayMs, 20)
                }
            }
        },
        beforeUnmount() {
            this.clearResultTimer()
        }
    }
</script>

<style scoped>
    .exercise-card {
        max-height: calc(90vh - 16px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .intro-copy {
        color: rgba(0, 0, 0, 0.68);
        font-size: 0.86rem;
        line-height: 1.25;
        padding: 2px 4px 0;
    }
    .between-slot {
        margin-bottom: 10px;
    }
    .choose-header,
    .controls-row {
        display: flex;
        align-items: center;
    }
    .choose-header {
        justify-content: flex-end;
        margin-bottom: 4px;
    }
    .controls-row {
        gap: 8px;
    }
    .play-order-toggle {
        width: 170px;
        min-width: 170px;
    }
    .play-order-toggle :deep(.v-btn) {
        flex: 1 1 0;
        min-width: 0 !important;
        text-align: center;
    }
    .inversion-inline-select {
        min-width: 136px;
        max-width: 160px;
        flex: 0 1 160px;
    }
    .inversion-inline-select :deep(.v-field) {
        min-height: 38px !important;
    }
    .btn {
        width: 30%;
        height: 50px;
        font-size: 10px;
        text-transform: none !important;
    }
    .staff-result-wrap {
        position: relative;
    }
    .success-detail {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 12px;
        z-index: 2;
        color: #1b5e20;
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1.2;
        text-align: center;
        pointer-events: none;
    }
    .depth-btn {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.28);
        filter: brightness(0.96);
    }
    .v-btn {
        text-transform: none !important;
    }
</style>
