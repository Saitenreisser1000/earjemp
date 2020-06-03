<template>
    <v-card class="pa-2 mx-auto blue-grey lighten-5" max-width="350" min-height="550" elevation="10">
    <v-card class="mx-auto blue-grey lighten-5" max-width="350" min-height="550" :disabled=lockInput flat>
        <interval-settings @setPlayOrder="setPlayOrder"></interval-settings>
        <v-switch
            v-model="autoplay"
            :label="'autoplay'"
            class="mt-4"
        >
        </v-switch>
        <response :resp-color="resColor"></response>
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
    import Response from "@/components/response";
    import toneCalcService from "@/components/mixins/toneCalcService";
    import playSounds from "@/components/mixins/playSounds";
    import responseMixin from "@/components/mixins/responseMixin";

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
                delay: 700
            }
        },
        components: {
            Response,
            IntervalSettings,
            IntervalPlay,
            guessInterval
        },
        mixins: [toneCalcService, playSounds, responseMixin],
        computed: {
            ...mapGetters(['getToneChain', 'getSelectedIntervals'])
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

                    let temp = this.firstTone;
                    this.firstTone = this.secondTone;
                    this.secondTone = temp;

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
                    this.setExactTimeout(() => {
                        this.playRandom()
                    },1000, 20)

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

</style>
