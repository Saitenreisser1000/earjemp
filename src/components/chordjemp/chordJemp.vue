<template>
    <v-card class="pa-2 mx-auto blue-grey lighten-5" max-width="350" min-height="550" elevation="10">
        <v-card class="mx-auto blue-grey lighten-5" max-width="350" min-height="550" :disabled=lockInput flat>
            <chordChoose></chordChoose>
            <v-switch
                    v-model="autoplay"
                    :label="'autoplay'"
                    class="ma-0"
            >
            </v-switch>
            <response :resp-color="resColor"></response>
            <chordPlay @playAgain="playAgain" @playRandomChord="playRandom" @playArpeggio="playArpeggio"></chordPlay>
            <guessChord @guessResult="guessResult" :selection="getSelectedChords"></guessChord>
        </v-card>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex';
    import chordChoose from "@/components/chordjemp/chordChoose";
    import chordPlay from "@/components/chordjemp/chordPlay";
    import guessChord from "@/components/chordjemp/guessChord";
    import response from "@/components/response";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";

    export default {
        name: "chordjemp",
        components: {chordChoose, chordPlay, guessChord, response},
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

                autoplay: true
            }
        },
        mixins: [toneCalcService, playSounds, responseMixin],
        computed: {
            ...mapGetters(['getToneChain','getSelectedChords'])
        },
        methods: {

            playRandom(){
                //calc random chord
                let rand = this.randomRangeInt({min: 0, max: this.getSelectedChords.length});
                this.randomChord = this.getSelectedChords[rand]

                this.reducedList = this.reduceToneList(this.randomChord.maxRange);

                //set response
                this.setResult(this.randomChord.text)
                this.resetResponse()

                this.calcFirstTone()
            },

            calcFirstTone(){
                this.firstTone = this.reducedList[this.randomRangeInt({min: 0, max: this.reducedList.length})];
                this.calcChord();
            },

            calcChord(){
                this.secondTone = this.getInterval(this.firstTone, this.randomChord.toneSteps[0], this.randomChord.lineDist[0]);
                this.thirdTone = this.getInterval(this.secondTone, this.randomChord.toneSteps[1], this.randomChord.lineDist[1]);
                //this.logger({chord: this.randomChord.text, firstTone: this.firstTone.name, secondTone: this.secondTone.name, thirdTone: this.thirdTone.name});
                this.playTones();
            },

            playArpeggio(){
                if(this.firstTone){
                    this.setExactTimeout(() => { this.playAudio(this.firstTone.tone); }, 200, 20);
                    this.setExactTimeout(() => { this.playAudio(this.secondTone.tone); }, 600, 20);
                    this.setExactTimeout(() => { this.playAudio(this.thirdTone.tone); }, 1000, 20);
                }
            },

            playTones(){
                this.setInputlock(true)

                this.setExactTimeout(() => {
                    this.playAudio(this.firstTone.tone);
                    this.playAudio(this.secondTone.tone);
                    this.playAudio(this.thirdTone.tone);
                }, 200, 20);

                //reset inputlock
                this.setExactTimeout(() => { this.setInputlock(false) }, 1000, 20);
            },

            guessResult(guess) {
                if (guess == this.result) {
                    this.resColor = 'green'
                    this.setExactTimeout(() => {
                        this.playRandom()
                    },1000, 20)
                } else {
                    this.resColor = 'indianred'
                }
            }
        }
    }
</script>

<style scoped>

</style>
