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
    import toneCalcService from "./mixins/toneCalcService";


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
        mixins: [toneCalcService],
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

                this.reducedIncList = this.reduceToneList(this.randomInterval.value);
                this.calcFirstTone();
            },

            calcFirstTone(){
                this.firstTone = this.reducedIncList[this.randomRangeInt({min: 0, max: this.reducedIncList.length})];

                this.calcInterval();
            },

            calcInterval(){
                this.secondTone = this.getInterval(this.firstTone, this.randomInterval.value, this.randomInterval.lineDist);
                this.logger({interval: this.randomInterval.text, firstTone: this.firstTone.name, secondTone: this.secondTone.name});

                this.playIntervals({firstTone: this.firstTone, secondTone: this.secondTone})
            },
        }
    }

</script>

<style scoped>

</style>
