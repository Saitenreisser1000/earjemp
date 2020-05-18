<template>
    <v-select
            v-model="selectChords"
            :items="chords"
            chips
            deletable-chips
            return-object
            label="Choose Intervals"
            multiple
    ></v-select>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "chordChoose",
        data() {
            return {
                chords: [
                    {text: 'minor-3',       value: 0 , toneSteps:[3,4], firstDist:2, secondDist:2, maxRange: 7},
                    {text: 'major-3',       value: 1 , toneSteps:[4,3], firstDist:2, secondDist:2, maxRange: 7},
                    {text: 'diminished-3',  value: 2 , toneSteps:[3,3], firstDist:2, secondDist:2, maxRange: 6},
                    {text: 'augmented-3',   value: 3 , toneSteps:[4,4], firstDist:2, secondDist:2, maxRange: 8},
                    {text: 'sus-2',         value: 4 , toneSteps:[2,5], firstDist:1, secondDist:3, maxRange: 7},
                    {text: 'sus-4',         value: 5 , toneSteps:[5,2], firstDist:3, secondDist:1, maxRange: 7},
                    {text: 'minor-b7',      value: 6 , toneSteps:[3,4,3], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 10},
                    {text: 'minor-m7',      value: 7 , toneSteps:[3,4,4], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 11},
                    {text: 'major-b7',      value: 8 , toneSteps:[4,3,4], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 10},
                    {text: 'major-m7',      value: 9 , toneSteps:[4,3,3], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 11},
                    {text: 'halfDim-7',     value: 10, toneSteps:[3,3,4], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 10},
                    {text: 'diminished-7',  value: 11, toneSteps:[3,3,3], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 9},
                    {text: 'augmented-7',   value: 12, toneSteps:[4,4,2], firstDist:2, secondDist:2, thirdDist: 2, maxRange: 11},

                ],
                selectChords: [
                    {text: 'minor-3',       value: 0 , toneSteps:[3,4], firstDist:2, secondDist:2, maxRange: 7},
                    {text: 'major-3',       value: 1 , toneSteps:[4,3], firstDist:2, secondDist:2, maxRange: 7},
                    {text: 'diminished-3',  value: 2 , toneSteps:[3,3], firstDist:2, secondDist:2, maxRange: 6},
                    {text: 'augmented-3',   value: 3 , toneSteps:[4,4], firstDist:2, secondDist:2, maxRange: 8},
                ]
            }
        },

        methods: {
            ...mapActions(['setSelectedChords']),
        },

        watch: {
            selectChords: {
                immediate: true,
                handler() {
                    this.setSelectedChords(this.selectChords)
                }
            }
        }
    }
</script>

<style scoped>

</style>
