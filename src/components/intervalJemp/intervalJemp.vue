<template>
    <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
    <v-card class="mx-auto bg-blue-grey-lighten-5 d-flex flex-column ga-2" max-width="350" min-height="550" :disabled=lockInput flat>
        <interval-settings v-model:autoplay="autoplay" @setPlayOrder="setPlayOrder">
            <template #between>
                <staff-renderer :notes="notationNotes" :clef="notationClef" :clef-octave="notationClefOctave" :mode="notationMode" :octave-offset="notationOctaveOffset" :feedback-state="notationFeedbackState"></staff-renderer>
            </template>
        </interval-settings>
        <interval-play @playAgain="playAgain" @playRandomInterval="playRandom"></interval-play>
        <guessInterval @guessResult="guessResult"></guessInterval>
    </v-card>
    </v-card>
</template>

<script>
    import IntervalPlay from "@/components/intervalJemp/intervalPlay";
    import IntervalSettings from "@/components/intervalJemp/intervalSettings";
    import guessInterval from "@/components/intervalJemp/guessInterval";
    import {mapGetters} from 'vuex'
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";
    import StaffRenderer from "@/features/notation/components/StaffRenderer";

    export default {
        name: "intervallOne",
        data() {
            return {
                lockInput: false,
                playLock: false, //avoid secondtone starting a playloop
                result: '',
                resColor: '#9DA0A9',

                randomInterval: '',
                reducedIncList: '',
                reducedDecList: '',
                firstTone: '',
                secondTone: '',
                autoplay: true,
                playOrder: ['increase'],
                randomOrder: '',
                decrSwitched:'',
                delay: 700
            }
        },
        components: {
            StaffRenderer,
            IntervalSettings,
            IntervalPlay,
            guessInterval
        },
        mixins: [toneCalcService, playSounds, responseMixin],
        computed: {
            ...mapGetters(['getToneChain', 'getSelectedIntervals']),
            notationNotes() {
                const notes = [];
                if (this.firstTone && this.firstTone.name) notes.push(this.firstTone.name);
                if (this.secondTone && this.secondTone.name) notes.push(this.secondTone.name);
                return notes;
            },
            notationClef() {
                if (!this.notationAdjustedOctaves.length) return 'treble';
                return Math.max(...this.notationAdjustedOctaves) <= 3 ? 'bass' : 'treble';
            },
            notationClefOctave() {
                if (!this.notationAdjustedOctaves.length) return '';
                if (this.notationClef === 'bass') {
                    return Math.min(...this.notationAdjustedOctaves) <= 2 ? '8vb' : '';
                }
                return Math.max(...this.notationAdjustedOctaves) >= 6 ? '8va' : '';
            },
            notationMode() {
                return this.randomOrder === 'simultaneous' ? 'chord' : 'melody';
            },
            notationOctaveOffset() {
                return 1;
            },
            notationAdjustedOctaves() {
                return this.notationNotes
                    .map((n) => /(\d)$/.exec(n))
                    .filter(Boolean)
                    .map((m) => Number(m[1]) + this.notationOctaveOffset);
            },
            notationFeedbackState() {
                if (this.resColor === 'green') return 'success'
                if (this.resColor === 'indianred') return 'error'
                return 'neutral'
            }
        },

        methods: {

            playRandom(){
                //calc intervals
                this.randomInterval = this.randomRangeInt({min: 0, max: this.getSelectedIntervals.length});
                this.randomInterval = this.getSelectedIntervals[this.randomInterval];

                this.reducedIncList = this.reduceToneList(this.randomInterval.value);

                this.randomOrder = this.playOrder[0];
                if(this.playOrder.length > 1){
                    this.randomOrder = this.playOrder[this.randomRangeInt({min: 0, max: this.playOrder.length})]
                }

                this.setResult(this.randomInterval.text)
                this.resetResponse()

                this.decrSwitched = false;

                this.calcFirstTone();
            },

            calcFirstTone() {
                this.firstTone = this.reducedIncList[this.randomRangeInt({min: 0, max: this.reducedIncList.length})];
                this.calcInterval();
            },

            calcInterval() {
                this.secondTone = this.getInterval(this.firstTone, this.randomInterval.value, this.randomInterval.lineDist);
                //this.logger({interval: this.randomInterval.text, firstTone: this.firstTone.name, secondTone: this.secondTone.name});
                this.playTones()
            },

            playTones() {
                this.setInputlock(true);
                this.playLock = false;

                if(this.randomOrder === 'simultaneous'){
                    this.playLock = true;

                    this.setExactTimeout(() => {
                        this.playAudio(this.firstTone.tone);
                        this.playAudio(this.secondTone.tone);
                    }, 200, 20);

                }else if(this.randomOrder === 'decrease'){

                    //switch tones
                    if(!this.decrSwitched){
                        let temp = this.firstTone;
                        this.firstTone = this.secondTone;
                        this.secondTone = temp;
                        this.decrSwitched = true;
                    }


                    this.setExactTimeout(() => {
                        this.playAudio(this.firstTone.tone);
                    }, 200, 20);
                }

                //playOrder = increase
                else{
                    this.setExactTimeout(() => {
                        this.playAudio(this.firstTone.tone);
                    }, 200, 20);
                }
                //reset inputlock
                this.setExactTimeout(() => {
                    this.setInputlock(false)
                }, 1000, 20);
            },

            playSecond(){
                if(!this.playLock){
                    this.setExactTimeout( () => {
                        this.playLock = true;
                        this.playAudio(this.secondTone.tone);
                    }, this.delay, 20);
                }
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
            },

            setPlayOrder(order){
                this.playOrder = order;
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
