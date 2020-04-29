<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="1000">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-row>
                            <stave></stave>
                        </v-row>
                        <br>
                        <v-row>
                            <interval-play></interval-play>
                        </v-row>
                    </v-col>
                        <interval-input></interval-input>
                    <v-col cols="12" sm="6">
                        <interval-choose></interval-choose>

                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    import stave from "@/components/stave";
    import { mapActions, mapGetters} from 'vuex';
    import IntervalInput from "@/components/intervalInput";
    import IntervalPlay from "@/components/intervalPlay";
    import IntervalChoose from "@/components/intervalChoose";

    export default {
        name: "intervallOne",
        data() {
            return {

                randomInterval: '',
                randomToneSubtone: '',
                chooseOrder: '',
                playFlag: false
            }
        },

        watch: {
            selectInt: {
                immediate: true,
                handler() {
                    this.setSelectIntervals(this.selectInt)
                },
            },
        },
        computed: {
            ...mapGetters(["getAllTones", "getPlayedInterval"]),
            intervallNames(){
                return this.getPlayedInterval
            }
        },

        methods: {
            ...mapActions(['playTone', 'setSelectIntervals', 'playIntervals', 'setGuess']),
            guessInterval(tone){
                this.setGuess(tone)
            },

            nextTone() {
                if(!this.playFlag) {
                    this.playFlag = true;
                    this.setSelectIntervals(this.selectInt);
                    this.playIntervals(this.chooseOrder);
                }
                setTimeout(() => {this.playFlag = false}, 1500)
            },

            triggerTone() {

            },

            randomRangeInt(range){
                let min = Math.ceil(range.min);
                let max = Math.floor(range.max);
                return Math.floor(Math.random() * (max - min)) + min;
            },
        },
        components:{
            IntervalChoose,
            IntervalPlay,
            IntervalInput,
            stave,
        }
    }
</script>

<style scoped>

</style>
