<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="350" min-height="500" :disabled=lockInput>
        <interval-choose></interval-choose>
        <v-switch
            v-model="autoplay"
            :label="'autoplay'">
        </v-switch>
        <response :resp-color="resColor"></response>
        <!--stave-double></stave-double-->
        <interval-play @playAgain="playAgain" @playRandomInterval="playRandomInterval"></interval-play>
        <guessInterval @guessResult="guessResult"></guessInterval>
    </v-card>
</template>

<script>
    import IntervalPlay from "@/components/intervalJemp/intervalPlay";
    import IntervalChoose from "@/components/intervalJemp/intervalChoose";
    //import StaveDouble from "@/components/notation/staveDouble";
    import guessInterval from "@/components/intervalJemp/guessInterval";
    import {mapGetters} from 'vuex'
    import Response from "@/components/response";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";

    export default {
        name: "intervallOne",
        data() {
            return {
                lockInput: false,
                result: '',
                resColor: '#9DA0A9',

                randomInterval: '',
                reducedIncList: '',
                reducedDecList: '',
                firstTone: '',
                secondTone: '',
                autoplay: true
            }
        },
        components: {
            Response,
            //StaveDouble,
            IntervalChoose,
            IntervalPlay,
            //IntervalInput,
            guessInterval
        },
        mixins: [toneCalcService, playSounds],
        computed: {
            ...mapGetters(['getToneChain', 'getSelectedIntervals'])
        },

        methods: {
            playAgain(){
                if (this.firstTone === '') {
                    this.playRandomInterval()
                } else {
                    this.playTones()
                }
            },

            playRandomInterval(){
                this.randomInterval = this.randomRangeInt({min: 0, max: this.getSelectedIntervals.length});
                this.randomInterval = this.getSelectedIntervals[this.randomInterval];

                this.setResult(this.randomInterval.text)
                this.resetResponse()

                this.reducedIncList = this.reduceToneList(this.randomInterval.value);

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
                this.setInputlock(true)

                let self = this;
                this.setExactTimeout(function () {
                    self.playAudio(self.firstTone.tone);
                }, 200, 20);
                this.setExactTimeout(function () {
                    self.playAudio(self.secondTone.tone);
                }, 700, 20);

                //reset inputlock
                this.setExactTimeout(function () {
                    self.setInputlock(false)
                }, 1000, 20);
            },

            resetResponse(){
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
                let self = this;
                if (guess == this.result) {
                    this.resColor = 'green'
                    this.setExactTimeout(function(){
                        self.playRandomInterval()
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
