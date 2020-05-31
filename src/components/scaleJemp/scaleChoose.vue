<template>
    <v-select
            v-model="selectedScales"
            :items="scales"
            small-chips
            deletable-chips
            return-object
            label="choose scale"
            multiple
    ></v-select>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "scaleChoose",
        data() {
            return {
                scales: [
                    {text: 'major/ionian',          value: 1 , scale: [2,2,1,2,2,2,1],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [2,1,2,2,2,1,2],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [1,2,2,2,1,2,2],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [2,2,2,1,2,2,1],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [2,2,1,2,2,1,2],   maxRange: 7},
                    {text: 'natural-minor',         value: 6 , scale: [2,1,2,2,1,2,2],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [1,2,2,1,2,2,2],   maxRange: 7},
                    {text: 'melodic-minor',         value: 9 , scale: [2,1,2,2,2,2,1],   maxRange: 7},
                    {text: 'harmonic-minor',        value:10 , scale: [2,1,2,2,1,3,1],   maxRange: 7},
                ],
                selectedScales: [
                    {text: 'major|ionian',          value: 1 , scale: [2,2,1,2,2,2,1],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [2,1,2,2,2,1,2],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [1,2,2,2,1,2,2],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [2,2,2,1,2,2,1],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [2,2,1,2,2,1,2],   maxRange: 7},
                    {text: 'minor|aeolian',         value: 6 , scale: [2,1,2,2,1,2,2],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [1,2,2,1,2,2,2],   maxRange: 7},
                    {text: 'melodic-minor',         value: 9 , scale: [2,1,2,2,2,2,1],   maxRange: 7},
                    {text: 'harmonic-minor',        value:10 , scale: [2,1,2,2,1,3,1],   maxRange: 7},
                ]
            }
        },

        methods: {
          ...mapActions(['setSelectedScales']),
        },

        watch: {
          selectedScales: {
            immediate: true,
            handler() {
              this.setSelectedScales(this.selectedScales)
            }
          }
        }
    }
</script>

<style scoped>

</style>
