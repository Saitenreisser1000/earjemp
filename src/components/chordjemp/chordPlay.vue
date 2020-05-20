<template>
    <div class="mb-6">
        <v-btn color="deep-purple primary" class="mr-2" width="190" height="50" @click="playAgain()">
            <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="deep-purple primary" class="mr-2" x-large @click="chooseRandomChord()">
            <!--v-icon>skip_next</v-icon-->
            <span>new</span>
        </v-btn>

        <v-btn color="deep-purple primary" x-large @click="arpeggiateChord()">
            <!--v-icon>skip_next</v-icon-->
            <span>Arp</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import toneCalcService from "../mixins/toneCalcService";

    export default {
        name: "chordPlay",

        data(){
            return{
                randomChord:'',
                reducedList:'',
                rootTone:'',
                secondTone: '',
                thirdTone: '',
            }
        },
        mixins: [toneCalcService],
        computed: {
            ...mapGetters(['getSelectedChords', 'getToneChain'])
        },
        methods: {
            ...mapActions(['playChords', 'playTone']),

            playAgain(){
                if(this.rootTone === ''){
                    this.chooseRandomChord()
                }else{
                    this.playChords([this.rootTone, this.secondTone, this.thirdTone])
                }
            },

            chooseRandomChord(){
                let rand = this.randomRangeInt({min: 0, max: this.getSelectedChords.length});
                this.randomChord = this.getSelectedChords[rand];
                this.reducedList = this.reduceToneList(this.randomChord.maxRange);
                this.calcFirstTone()
            },

            calcFirstTone(){
                this.rootTone = this.reducedList[this.randomRangeInt({min: 0, max: this.reducedList.length})];
                this.calcChord();
            },

            calcChord(){

                this.secondTone = this.getInterval(this.rootTone, this.randomChord.toneSteps[0], this.randomChord.lineDist[0]);
                this.thirdTone = this.getInterval(this.rootTone, this.randomChord.toneSteps[0] + this.randomChord.toneSteps[1], this.randomChord.lineDist[0]+this.randomChord.lineDist[1]);
                //this.logger({chord: this.randomChord.text, firstTone: this.rootTone.name, secondTone: this.secondTone.name, thirdTone: this.thirdTone.name});

                this.playChords([this.rootTone, this.secondTone, this.thirdTone])

            },

            arpeggiateChord(){
                this.playTone(this.rootTone);
                setTimeout(() => {
                    this.playTone(this.secondTone);
                }, 300),

                setTimeout(() => {
                    this.playTone(this.thirdTone);
                }, 600)
            },
        }
    }
</script>

<style scoped>

</style>
