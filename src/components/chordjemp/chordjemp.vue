<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="350" min-height="500" :disabled=lockInput>
        <chordChoose></chordChoose>
        <v-switch
            v-model="autoplay"
            :label="'autoplay'">
        </v-switch>
        <response :resp-color="resColor"></response>
        <chordPlay @playAgain="playAgain" @playRandomChord="playRandomChord" @playArpeggio="playArpeggio"></chordPlay>
        <guessChord @guessResult="guessResult" :selection="getSelectedChords"></guessChord>
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
        mixins: [toneCalcService, playSounds],
        computed: {
            ...mapGetters(['getToneChain','getSelectedChords'])
        },
        methods: {

            playAgain(){
                if(this.firstTone === ''){
                    this.playRandomChord()
                }else{
                    this.playTones()
                }
            },

            playRandomChord(){
                let rand = this.randomRangeInt({min: 0, max: this.getSelectedChords.length});
                this.randomChord = this.getSelectedChords[rand];
                this.setResult(this.randomChord.text)
                this.resetResponse()
                this.reducedList = this.reduceToneList(this.randomChord.maxRange);
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
                let self = this;

                if(this.firstTone){
                    this.setExactTimeout(function(){
                        self.playAudio(self.firstTone.tone);
                    }, 200, 20);

                    this.setExactTimeout(function(){
                        self.playAudio(self.secondTone.tone);
                    }, 600, 20);

                    this.setExactTimeout(function(){
                        self.playAudio(self.thirdTone.tone);
                    }, 1000, 20);
                }
            },

            playTones(){
                this.setInputlock(true)
                let self = this;
                this.setExactTimeout(function () {
                    self.playAudio(self.firstTone.tone);
                    self.playAudio(self.secondTone.tone);
                    self.playAudio(self.thirdTone.tone);
                }, 200, 20);



                //reset inputlock
                this.setExactTimeout(function () {
                    self.setInputlock(false)
                }, 2000, 20);
            },

            resetResponse() {
                this.resColor = '#9DA0A9'
            },

            setInputlock(locked){
                this.lockInput = locked
            },

            setResult(res) {
                console.log(res)
                this.result = res
            },
            guessResult(guess) {
                let self = this
                if (guess == this.result) {
                    this.resColor = 'green'
                    this.setExactTimeout(function(){
                        self.playRandomChord()
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
