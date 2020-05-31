<template>
    <v-card class="mx-auto blue-grey lighten-5 pb-5" max-width="350" min-height="300" :disabled=lockInput>
        <scaleChoose></scaleChoose>
        <v-switch
            v-model="autoplay"
            :label="'autoplay'">
        </v-switch>
        <response :resp-color="resColor"></response>
        <scalePlay @playAgain="playAgain" @playRandomScale="playRandomScale"></scalePlay>
        <guess-scale @guessResult="guessResult" :selection="getSelectedScales"></guess-scale>
    </v-card>
</template>

<script>
    import scaleChoose from "@/components/scaleJemp/scaleChoose";
    import scalePlay from "@/components/scaleJemp/scalePlay";
    import guessScale from "@/components/scaleJemp/guessScale";
    import response from "@/components/response";
    import {mapGetters} from 'vuex'
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";

    export default {
        name: "scaleJemp",
        components: {guessScale, scaleChoose, scalePlay, response},
        data() {
            return {
                lockInput: false,
                result: '',
                resColor: '#9DA0A9',

                scale: '',
                autoplay: true,
            }
        },
        computed: {
            ...mapGetters(['getToneChain','getSelectedScales']),
        },
        mixins: [toneCalcService, playSounds],
        methods: {
            playAgain() {
                if (this.scale === '') {
                    this.playRandomScale()
                } else {
                    this.playScale()
                }
            },
            playRandomScale() {
                let randomRoot = this.randomRangeInt({min: 5, max: 20});
                let randomScale = this.randomRangeInt({min: 0, max: this.getSelectedScales.length});
                randomScale = this.getSelectedScales[randomScale];
                this.setResult(randomScale.text)
                this.resetResponse()
                this.scale = this.getScale(randomRoot, randomScale.scale);
                this.playScale();
                this.logger({root: this.scale[0].name, scale: this.scale});
            },

            playScale() {
                let start = 200;
                let delay = 400;
                let self = this;
                this.setInputlock(true)
                for (let tones of this.scale) {


                    this.setExactTimeout(function () {
                        self.playAudio(tones.tone);
                    }, start, 20);
                    start += delay;
                }

                //reset inputlock
                this.setExactTimeout(function () {
                    self.setInputlock(false)
                }, 3500, 20);
            },

            resetResponse(){
                this.resColor = '#9DA0A9'
            },

            setInputlock(locked){
                this.lockInput = locked
            },

            setResult(res) {
                this.result = res
            },
            guessResult(guess) {
                if (guess == this.result) {
                    this.resColor = 'green';
                    if(this.autoplay){this.playNew()}
                } else {
                    this.resColor = 'indianred'
                }
            },

            playNew(){
                const self = this;
                this.setExactTimeout(function(){
                    self.playRandomScale()
                },1000, 20)
            }
        }
    }
</script>

<style scoped>

</style>
