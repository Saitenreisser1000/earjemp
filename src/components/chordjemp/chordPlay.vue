<template>
    <div class="mb-6">
        <v-btn color="deep-purple primary" class="mr-2" width="190" height="50" @click="playAgain">
            <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="deep-purple primary" x-large @click="chooseRandomChord()">
            <!--v-icon>skip_next</v-icon-->
            <span>new</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "chordPlay",
        data(){
            return{
                randomChord:'',
                reducedList:'',
                rootTone:'',
                secondTone: '',
                thirdTone: ''
            }
        },
        computed: {
            ...mapGetters(['getSelectedChords', 'getToneChain'])
        },
        methods: {
            ...mapActions(['playChords']),

            chooseRandomChord(){
                let rand = this.randomRangeInt({min: 0, max: this.getSelectedChords.length})
                this.randomChord = this.getSelectedChords[rand]
                this.reduceToneList()
            },

            reduceToneList(){
                this.reducedList = this.getToneChain.filter(tone => tone.toneID <= 44-this.randomChord.maxRange && tone.id < 63);
                this.calcFirstTone()
            },

            calcFirstTone(){
                this.rootTone = this.reducedList[this.randomRangeInt({min: 0, max: this.reducedList.length})];
                this.calcChord();
            },

            calcChord(){
                console.log(this.rootTone.name);
                this.secondTone = this.rootTone;
                for(let i = 0; i < this.randomChord.toneSteps[0]; i++){
                    console.log('i')
                    this.secondTone = this.getToneChain[this.secondTone.next];

                }
                this.thirdTone = this.secondTone;
                for(let i = 0; i < this.randomChord.toneSteps[1]; i++){
                    this.thirdTone = this.getToneChain[this.thirdTone.next]
                }

                console.log(this.randomChord.text);
                console.log(this.rootTone.name);
                console.log(this.secondTone.name);
                console.log(this.thirdTone.name);

                this.playChords([this.rootTone, this.secondTone, this.thirdTone])

            },

            randomRangeInt(range){
                let min = Math.ceil(range.min);
                let max = Math.floor(range.max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
        }
    }
</script>

<style scoped>

</style>
