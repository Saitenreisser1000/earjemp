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
                            <!--v-card-actions class="pa-0">
                                <v-btn color="deep-purple primary" @click="triggerTone">
                                    <v-icon>play_arrow</v-icon>
                                </v-btn>
                                <v-btn color="deep-purple primary" @click="nextTone">
                                    <v-icon>skip_next</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn-toggle
                                    v-model="chooseOrder"
                                    dense
                                    background-color="primary"
                                    multiple
                                    class="ml-8"
                                    mandatory
                            >

                                <v-btn value="increase">
                                    <v-icon>expand_less</v-icon>
                                </v-btn>

                                <v-btn value="decrease">
                                    <v-icon>expand_more</v-icon>
                                </v-btn>

                                <v-btn value="simultaneous">
                                    <v-icon>unfold_more</v-icon>
                                </v-btn>

                            </v-btn-toggle-->
                        </v-row>
                    </v-col>
                            <interval-input></interval-input>
                    <v-col cols="12" sm="6">
                        <!--v-select
                                v-model="selectInt"
                                :items="intervals"

                                attach
                                chips
                                label="Choose Intervals"
                                multiple
                        ></v-select-->
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

    export default {
        name: "intervallOne",
        data() {
            return {
                toggle_multiple: [1, 2, 3, 4, 5, 6, 7, 8],
                tab: null,
                /*intervals: [
                    {text: '1', value: 0},
                    {text: 'b2', value: 1},
                    {text: '2', value: 2},
                    {text: 'b3', value: 3},
                    {text: '3', value: 4},
                    {text: '4', value: 5},
                    {text: '#4', value: 6},
                    {text: '5', value: 7},
                    {text: 'b6', value: 8},
                    {text: '6', value: 9},
                    {text: 'b7', value: 10},
                    {text: '7', value: 11},
                    {text: '8', value: 12},
                    {text: 'b9', value: 13},
                    {text: '9', value: 14}
                    ],
                selectInt: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],*/
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
            IntervalPlay,
            IntervalInput,
            stave,
        }
    }
</script>

<style scoped>

</style>
