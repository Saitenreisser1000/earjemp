<template>
    <div>
        <v-select
                v-model="selectInt"
                :items="intervals"
                mandatory
                small-chips
                deletable-chips
                return-object
                label="Choose Intervals"
                multiple
        ></v-select>
        <v-btn-toggle
                @change="$emit('setPlayOrder', playOrder)"
                class="white--text"
                v-model="playOrder"
                dense
                active-class="primary"
                background-color="secondary"
                multiple
                mandatory
        >
            <v-btn value="increase">
                <span>up</span>
            </v-btn>

            <v-btn value="decrease">
                <span>down</span>
            </v-btn>

            <v-btn value="simultaneous">
                <span>=</span>
            </v-btn>
        </v-btn-toggle>
    </div>

</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "intervalChoose",
        data() {
            return {
                playOrder: 'increase',
                intervals: [
                    {text: 'b2', value: 1 , lineDist:1},
                    {text: '2',  value: 2 , lineDist:1},
                    {text: 'b3', value: 3 , lineDist:2},
                    {text: '3',  value: 4 , lineDist:2},
                    {text: '4',  value: 5 , lineDist:3},
                    {text: '#4', value: 6 , lineDist:3},
                    {text: '5',  value: 7 , lineDist:4},
                    {text: 'b6', value: 8 , lineDist:5},
                    {text: '6',  value: 9 , lineDist:5},
                    {text: 'b7', value: 10, lineDist:6},
                    {text: '7',  value: 11, lineDist:6},
                    {text: '8',  value: 12, lineDist:7},
                    {text: 'b9', value: 13, lineDist:8},
                    {text: '9',  value: 14, lineDist:8}
                ],
                selectInt: [
                    {text: '2',  value: 2, lineDist: 1},
                    {text: 'b3', value: 3, lineDist: 2},
                    {text: '3',  value: 4, lineDist: 2},
                    {text: '4',  value: 5, lineDist: 3},
                    {text: '5',  value: 7, lineDist: 4},
                    {text: '6',  value: 9, lineDist: 5},
                    {text: '7',  value: 11, lineDist: 6},
                    {text: '8',  value: 12, lineDist: 7},
                ]
            }
        },

        methods: {
            ...mapActions(['setSelectedIntervals']),
        },

        watch: {
            selectInt: {
                immediate: true,
                handler() {
                    this.setSelectedIntervals(this.selectInt)
                }
            }
        }
    }
</script>

<style scoped>

    .v-btn{
        text-transform: none !important;
    }
</style>
