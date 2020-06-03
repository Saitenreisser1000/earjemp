<template>
    <v-card class="pa-2 mx-auto blue-grey lighten-5" max-width="350" min-height="550" elevation="10">
    <v-card class="mx-auto blue-grey lighten-5 pb-5" max-width="350" min-height="550" :disabled=lockInput flat>
        <scaleChoose></scaleChoose>
            <v-switch
                v-model="autoplay"
                :label="'autoplay'"
                class="ma-0"
            >
            </v-switch>
            <v-switch
                v-model="offsetFirst"
                :label="'1st Tone Offset'"
                class="ma-0"
            >
        </v-switch>
        <response :resp-color="resColor"></response>
        <scalePlay @playAgain="playAgain" @playRandomScale="playRandom"></scalePlay>
        <guess-scale @guessResult="guessResult" :selection="getSelectedScales"></guess-scale>
    </v-card>
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
    import responseMixin from "@/components/mixins/responseMixin";

    export default {
        name: "scaleJemp",
        components: {guessScale, scaleChoose, scalePlay, response},
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
                firstTone: ''
            }
        },
        computed: {
            ...mapGetters(['getToneChain','getSelectedScales']),
        },
        mixins: [toneCalcService, playSounds, responseMixin],
        methods: {

            playRandom() {
                //calc random scale
                let randomRoot = this.randomRangeInt({min: 5, max: 20});
                let randomScale = this.randomRangeInt({min: 0, max: this.getSelectedScales.length});
                randomScale = this.getSelectedScales[randomScale];

                //fetch scale
                this.scale = this.getScale(randomRoot, randomScale.scale);
                this.reducedScale = this.scale.slice(1);

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
                this.firstTone = this.scale[0]
                this.playAudio(this.scale[0].tone)
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
                    }, timeOffset)

                }
            },

            playScale() {
                let start = 200;
                let delay = 350;

                for (let tones of this.reducedScale) {
                    this.setExactTimeout(() => {
                        this.playAudio(tones.tone);
                    }, start, 20);
                    start += delay;
                }

                //reset inputlock
                this.setExactTimeout(() => {
                    this.setInputlock(false)
                }, 3500, 20);
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

</style>
