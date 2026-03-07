<template>
        <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
        <v-card class="mx-auto bg-blue-grey-lighten-5 d-flex flex-column ga-2" max-width="350" min-height="550" :disabled=lockInput flat>
            <chordChoose v-model:autoplay="autoplay" v-model:play-order="playOrder">
                <template #between>
                    <staff-renderer :notes="notationNotes" :clef="notationClef" :clef-octave="notationClefOctave" mode="chord" :octave-offset="notationOctaveOffset" :feedback-state="notationFeedbackState"></staff-renderer>
                </template>
            </chordChoose>
            <chordPlay @playAgain="playAgain" @playRandomChord="playRandom"></chordPlay>
            <guessChord @guessResult="guessResult" :selection="getSelectedChords"></guessChord>
        </v-card>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex';
    import chordChoose from "@/components/chordjemp/chordChoose";
    import chordPlay from "@/components/chordjemp/chordPlay";
    import guessChord from "@/components/chordjemp/guessChord";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";
    import StaffRenderer from "@/features/notation/components/StaffRenderer";

    export default {
        name: "chordjemp",
        components: {chordChoose, chordPlay, guessChord, StaffRenderer},
        data() {
            return {
                lockInput: false,
                result: '',
                resColor: '#9DA0A9',

                randomChord:'',
                reducedList:'',
                firstTone:'',
                secondTone: '',
                thirdTone: '',
                fourthTone: '',

                autoplay: true,
                playOrder: ['simultaneous'],
                randomOrder: 'simultaneous'
            }
        },
        mixins: [toneCalcService, playSounds, responseMixin],
        computed: {
            ...mapGetters(['getToneChain','getSelectedChords']),
            notationNotes() {
                const tones = [this.firstTone, this.secondTone, this.thirdTone, this.fourthTone]
                return tones.filter((tone) => tone && tone.name).map((tone) => tone.name)
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

            playRandom(){
                if (!Array.isArray(this.getSelectedChords) || this.getSelectedChords.length === 0) {
                    this.setResult('choose at least one chord');
                    this.resColor = 'indianred';
                    return;
                }

                //calc random chord
                let rand = this.randomRangeInt({min: 0, max: this.getSelectedChords.length});
                this.randomChord = this.getSelectedChords[rand]

                this.reducedList = this.reduceToneList(this.randomChord.maxRange);
                this.randomOrder = this.playOrder[0] || 'simultaneous';
                if (this.playOrder.length > 1) {
                    this.randomOrder = this.playOrder[this.randomRangeInt({min: 0, max: this.playOrder.length})]
                }

                //set response
                this.setResult(this.randomChord.text)
                this.resetResponse()

                this.calcFirstTone()
            },

            calcFirstTone(){
                this.firstTone = this.reducedList[this.randomRangeInt({min: 15, max: this.reducedList.length})];
                this.calcChord();
            },

            calcChord(){
                this.secondTone = this.getInterval(this.firstTone, this.randomChord.toneSteps[0], this.randomChord.lineDist[0]);
                this.thirdTone = this.getInterval(this.secondTone, this.randomChord.toneSteps[1], this.randomChord.lineDist[1]);
                if(this.randomChord.toneSteps.length === 3){
                    this.fourthTone = this.getInterval(this.thirdTone, this.randomChord.toneSteps[2], this.randomChord.lineDist[2])
                }
                //this.logger({chord: this.randomChord.text, firstTone: this.firstTone.name, secondTone: this.secondTone.name, thirdTone: this.thirdTone.name});
                this.playTones();
            },

            playArpeggio(){
                if(this.firstTone){
                    this.setExactTimeout(() => { this.playAudio(this.firstTone.tone); }, 200, 20);
                    this.setExactTimeout(() => { this.playAudio(this.secondTone.tone); }, 600, 20);
                    this.setExactTimeout(() => { this.playAudio(this.thirdTone.tone); }, 1000, 20);
                    if(this.randomChord.toneSteps.length === 3) {
                        this.setExactTimeout(() => {this.playAudio(this.fourthTone.tone);}, 1400, 20)
                    }
                }
            },

            playTones(){
                this.setInputlock(true)
                const chordTones = [this.firstTone, this.secondTone, this.thirdTone];
                if (this.randomChord.toneSteps.length === 3) chordTones.push(this.fourthTone);

                if (this.randomOrder === 'simultaneous') {
                    this.setExactTimeout(() => {
                        for (const tone of chordTones) this.playAudio(tone.tone);
                    }, 200, 20);
                    this.setExactTimeout(() => { this.setInputlock(false) }, 1000, 20);
                    return;
                }

                const ordered = this.randomOrder === 'decrease' ? chordTones.slice().reverse() : chordTones;
                let start = 200;
                const delay = 350;
                for (const tone of ordered) {
                    this.setExactTimeout(() => { this.playAudio(tone.tone); }, start, 20);
                    start += delay;
                }
                this.setExactTimeout(() => { this.setInputlock(false) }, start + 200, 20);
            },

            guessResult(guess) {
                if (guess == this.result) {
                    this.resColor = 'green'
                    if (this.autoplay) {
                        this.setExactTimeout(() => {
                            this.playRandom()
                        },1000, 20)
                    }
                } else {
                    this.resColor = 'indianred'
                }
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
</style>
