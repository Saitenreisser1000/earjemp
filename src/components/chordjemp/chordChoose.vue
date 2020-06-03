<template>
    <v-select
            v-model="selectedChords"
            :items="chords"
            small-chips
            deletable-chips
            return-object
            label="choose chord"
            multiple
    ></v-select>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "chordChoose",
        data() {
            return {
                chords: [
                    {text: 'minor',       value: 0 , toneSteps:[3,4],  lineDist:[2,2],   maxRange: 7},
                    {text: 'major',       value: 1 , toneSteps:[4,3],  lineDist:[2,2],   maxRange: 7},
                    {text: 'diminished',  value: 2 , toneSteps:[3,3],  lineDist:[2,2],   maxRange: 6},
                    {text: 'augmented',   value: 3 , toneSteps:[4,4],  lineDist:[2,2],   maxRange: 8},
                    {text: 'sus2',         value: 4 , toneSteps:[2,5],  lineDist:[1,3],   maxRange: 7},
                    {text: 'sus4',         value: 5 , toneSteps:[5,2],  lineDist:[3,1],   maxRange: 7},
                    {text: 'minor7',      value: 6 , toneSteps:[3,4,3],lineDist:[2,2,2], maxRange: 10},
                    {text: 'minorM7',      value: 7 , toneSteps:[3,4,4],lineDist:[2,2,2], maxRange: 11},
                    {text: 'major7',      value: 8 , toneSteps:[4,3,4],lineDist:[2,2,2], maxRange: 10},
                    {text: 'majorM7',      value: 9 , toneSteps:[4,3,3],lineDist:[2,2,2], maxRange: 11},
                    {text: 'halfDim7',     value: 10, toneSteps:[3,3,4],lineDist:[2,2,2], maxRange: 10},
                    {text: 'dim7',  value: 11, toneSteps:[3,3,3],lineDist:[2,2,2], maxRange: 9},
                    {text: 'aug7',   value: 12, toneSteps:[4,4,2],lineDist:[2,2,2], maxRange: 11},

                ],
                selectedChords: [
                    {text: 'minor',       value: 0 , toneSteps:[3,4],  lineDist:[2,2],   maxRange: 7},
                    {text: 'major',       value: 1 , toneSteps:[4,3],  lineDist:[2,2],   maxRange: 7},
                    {text: 'diminished',  value: 2 , toneSteps:[3,3],  lineDist:[2,2],   maxRange: 6},
                    {text: 'augmented',   value: 3 , toneSteps:[4,4],  lineDist:[2,2],   maxRange: 8},
                ]
            }
        },

        methods: {
            ...mapActions(['setSelectedChords']),
        },

        watch: {
            selectedChords: {
                immediate: true,
                handler() {
                    this.setSelectedChords(this.selectedChords)
                }
            }
        }
    }
</script>

<style scoped>

</style>
