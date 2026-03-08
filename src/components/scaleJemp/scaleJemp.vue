<template>
    <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
    <v-card class="mx-auto bg-blue-grey-lighten-5 pb-5 d-flex flex-column ga-2" max-width="350" min-height="550" :disabled=lockInput flat>
        <scaleChoose v-model:autoplay="autoplay" v-model:offset-first="offsetFirst" v-model:difficulty="difficulty" v-model:play-order="playOrder">
            <template #between>
                <staff-renderer :notes="notationNotes" :clef="notationClef" :clef-octave="notationClefOctave" mode="melody" :octave-offset="notationOctaveOffset" :feedback-state="notationFeedbackState"></staff-renderer>
            </template>
        </scaleChoose>
        <scalePlay @playAgain="playAgain" @playRandomScale="playRandom"></scalePlay>
        <guess-scale @guessResult="guessResult" :selection="getSelectedScales"></guess-scale>
    </v-card>
    </v-card>
</template>

<script>
    import scaleChoose from "@/components/scaleJemp/scaleChoose";
    import scalePlay from "@/components/scaleJemp/scalePlay";
    import guessScale from "@/components/scaleJemp/guessScale";
    import {mapGetters} from 'vuex'
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";
    import StaffRenderer from "@/features/notation/components/StaffRenderer";
    import { scaleRootRange } from "@/domain/music/difficulty";

    export default {
        name: "scaleJemp",
        components: {guessScale, scaleChoose, scalePlay, StaffRenderer},
        data() {
            return {
                lockInput: false,
                playLock: false, //avoid secondtone starting a playloop

                offsetFirst: true,
                result: '',
                resColor: '#9DA0A9',

                scale: '',
                reducedScale: '',
                autoplay: true,
                difficulty: 'easy',
                firstTone: '',
                playOrder: ['increase'],
                randomOrder: 'increase'
            }
        },
        computed: {
            ...mapGetters(['getToneChain','getSelectedScales']),
            notationNotes() {
                if (!Array.isArray(this.scale)) return []
                return this.scale.filter((tone) => tone && tone.name).map((tone) => tone.name)
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
        mixins: [toneCalcService, playSounds, responseMixin],
        methods: {

            playRandom() {
                if (!Array.isArray(this.getSelectedScales) || this.getSelectedScales.length === 0) {
                    this.setResult('choose at least one scale');
                    this.resColor = 'indianred';
                    return;
                }

                //calc random scale
                const rootRange = scaleRootRange(this.difficulty);
                let randomRoot = this.randomRangeInt(rootRange);
                let randomScale = this.randomRangeInt({min: 0, max: this.getSelectedScales.length});
                randomScale = this.getSelectedScales[randomScale];

                //fetch scale
                this.scale = this.getScale(randomRoot, randomScale.scale);
                this.reducedScale = this.scale.slice(1);
                this.randomOrder = this.playOrder[0] || 'increase';
                if (this.playOrder.length > 1) {
                    this.randomOrder = this.playOrder[this.randomRangeInt({min: 0, max: this.playOrder.length})]
                }

                //set response
                this.setResult(randomScale.text);
                this.resetResponse();

                //play
                this.playTones()
                //this.logger({root: this.scale[0].name, scale: this.scale});
            },

            playTones() {
                this.setInputlock(true);
                this.playLock = false;
                this.firstTone = this.randomOrder === 'decrease'
                    ? this.scale[this.scale.length - 1]
                    : this.scale[0]
                this.playAudio(this.firstTone.tone)
            },

            playSecond(){
                let timeOffset = 170;
                if(this.offsetFirst){
                    timeOffset = 500;
                }

                if(!this.playLock) {
                    this.playLock = true;
                    this.setExactTimeout(() => {
                        this.playScale()
                    }, timeOffset, 20)

                }
            },

            playScale() {
                let start = 200;
                let delay = 350;
                let sequence = this.reducedScale;

                if (this.randomOrder === 'decrease') {
                    sequence = this.scale.slice(0, -1).reverse();
                } else if (this.randomOrder === 'simultaneous') {
                    sequence = this.scale.slice(1).concat(this.scale.slice(0, -1).reverse());
                }

                for (let tones of sequence) {
                    this.setExactTimeout(() => {
                        this.playAudio(tones.tone);
                    }, start, 20);
                    start += delay;
                }

                //reset inputlock
                this.setExactTimeout(() => {
                    this.setInputlock(false)
                }, start + 200, 20);
            },

            guessResult(guess) {
                if (guess == this.result) {
                    this.resColor = 'green';
                    if(this.autoplay){
                        this.setExactTimeout(() => {
                            this.playRandom()
                        },1000, 20)
                    }
                } else {
                    this.resColor = 'indianred'
                }
            },
        }
    }
</script>

<style scoped>
    .exercise-card {
        max-height: calc(90vh - 16px);
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
