<template>
    <v-select
            v-model="selectInt"
            :items="intervals"

            attach
            chips
            label="Choose Intervals"
            multiple
    ></v-select>
</template>

<script>
    export default {
        name: "intervalChoose",
        data() {
            return{
                intervals: [
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
                selectInt: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            }
        }
    }
</script>

<style scoped>

</style>
