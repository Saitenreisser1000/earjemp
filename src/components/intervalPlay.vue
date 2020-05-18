<template>
    <div class="mb-6">
        <v-btn color="deep-purple primary" class="mr-2" width="190" height="50" @click="playAgain">
            <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="deep-purple primary" x-large @click="calcRandomInterval()">
            <!--v-icon>skip_next</v-icon-->
            <span>new</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "intervalPlay",
        data(){
            return{
                randomInterval:'',
                reducedIncList:'',
                reducedDecList:'',
                firstTone:'',
                secondTone:''
            }
        },
        computed: {
            ...mapGetters(['getToneChain', 'getSelectedIntervals']),

        },
        methods: {
            ...mapActions(['playIntervals']),

            playAgain(){
                if(this.firstTone === ''){
                    this.calcRandomInterval()
                }else{
                    this.playIntervals({firstTone: this.firstTone, secondTone: this.secondTone})
                }
            },

            calcRandomInterval(){
                this.randomInterval = this.randomRangeInt({min: 0, max: this.getSelectedIntervals.length});
                this.randomInterval = this.getSelectedIntervals[this.randomInterval];

                this.reduceToneList();
            },

            reduceToneList(){
                this.reducedIncList = this.getToneChain.filter(tone => tone.toneID <= 44-this.randomInterval.value && tone.id < 63);
                this.calcFirstTone();
            },

            calcFirstTone(){
                this.firstTone = this.reducedIncList[this.randomRangeInt({min: 0, max: this.reducedIncList.length})];

                this.calcInterval();
            },

            calcInterval(){
                this.secondTone = this.firstTone;

                //list crawler
                for(let i = 0; i < this.randomInterval.value; i++){
                    this.secondTone = this.getToneChain[this.secondTone.next]
                }


                //switch to enharmonic equal that matches required lineDist
                if(Math.abs(this.secondTone.linePos - this.firstTone.linePos) !== this.randomInterval.lineDist){
                    console.log('switch');
                    let alternate = this.secondTone.enh;

                    if( Math.abs(this.getToneChain[alternate[0]].linePos - this.firstTone.linePos) === this.randomInterval.lineDist){
                        this.secondTone = this.getToneChain[alternate[0]]
                    }

                    else if(alternate[1] && Math.abs(this.getToneChain[alternate[1]].linePos - this.firstTone.linePos) === this.randomInterval.lineDist){
                        this.secondTone = this.getToneChain[alternate[1]]
                    }
                }

                this.playIntervals({firstTone: this.firstTone, secondTone: this.secondTone})
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
