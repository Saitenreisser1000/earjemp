<template>
    <v-select
            v-model="selectChords"
            :items="chords"
            chips
            deletable-chips
            return-object
            label="choose scale"
            multiple
    ></v-select>
</template>

<script>
    export default {
        name: "scaleChoose",
        data() {
            return {
                chords: [
                    {text: 'major/ionian',          value: 1 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [{step: 1, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:6, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'aeolian/natural-minor', value: 6 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [{step: 1, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:6, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'superlocrian',          value: 8 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'halftone-wholetone',    value: 9 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:6, dist:4}, {step:8, dist:5}, {step: 9, dist:6}, {step:11, dist:7},{step:12, dist:7}],   maxRange: 7},
                    {text: 'wholetone-halftone',    value: 10 , scale: [{step: 1, dist:1 },{step:3, dist:2}, {step:4, dist:3}, {step:5, dist:4}, {step:7, dist:5}, {step: 8, dist:6}, {step:10, dist:7},{step:11, dist:7}],   maxRange: 7},
                    {text: 'wholetone',             value: 11 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:6, dist:3}, {step:8, dist:4}, {step:10, dist:5}, {step: 12, dist:6}],   maxRange: 7},
                ],
                selectChords: [
                    {text: 'major/ionian',          value: 1 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [{step: 1, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:6, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [{step: 2, dist:1 },{step:4, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'aeolian/natural-minor', value: 6 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [{step: 1, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:6, dist:4}, {step:8, dist:5}, {step: 10, dist:6}, {step:12, dist:7}],   maxRange: 7},
                    {text: 'superlocrian',          value: 8 , scale: [{step: 2, dist:1 },{step:3, dist:2}, {step:5, dist:3}, {step:7, dist:4}, {step:9, dist:5}, {step: 11, dist:6}, {step:12, dist:7}],   maxRange: 7},
                ]
            }
        },
    }
</script>

<style scoped>

</style>
