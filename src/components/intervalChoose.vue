<template>
    <!--v-select
            v-model="selectInt"
            :items="intervals"
            chips
            deletable-chips
            return-object
            label="Choose Intervals"
            multiple
    ></v-select-->
    <div>

        <v-btn-toggle
                class="mb-1 white--text textToLowerCase"
                v-model="toggle_multiple1"
                dense
                active-class="primary"
                multiple
                mandatory
        >
            <v-btn><span>1</span></v-btn>
            <v-btn><span>b2</span></v-btn>
            <v-btn><span>2</span></v-btn>
            <v-btn><span>b3</span></v-btn>
            <v-btn><span>3</span></v-btn>


        </v-btn-toggle>

        <v-btn-toggle
                class="mb-1 white--text textToLowerCase"
                v-model="toggle_multiple2"
                dense
                active-class="primary"
                multiple
                mandatory
        >
            <v-btn><span>4</span></v-btn>
            <v-btn><span>#4</span></v-btn>
            <v-btn><span>5</span></v-btn>
            <v-btn><span>b6</span></v-btn>
            <v-btn><span>6</span></v-btn>

        </v-btn-toggle>

        <v-btn-toggle
                class="mb-1 white--text textToLowerCase"
                v-model="toggle_multiple3"
                dense
                active-class="primary"
                multiple
                mandatory
        >
            <v-btn><span>b7</span></v-btn>
            <v-btn><span>7</span></v-btn>
            <v-btn><span>8</span></v-btn>
            <v-btn><span>b9</span></v-btn>
            <v-btn><span>9</span></v-btn>

        </v-btn-toggle>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "intervalChoose",
        data() {
            return {
                toggle_multiple1: [],
                toggle_multiple2: [],
                toggle_multiple3: [],
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
                selectInt: [
                    {text: '2', value: 2},
                    {text: 'b3', value: 3},
                    {text: '3', value: 4},
                    {text: '4', value: 5},
                    {text: '5', value: 7},
                    {text: '6', value: 9},
                    {text: '7', value: 11},
                    {text: '8', value: 12},
                ]
            }
        },

        methods: {
            ...mapActions(['setSelectIntervals']),
        },

        watch: {
            selectInt: {
                immediate: true,
                handler() {
                    this.setSelectIntervals(this.selectInt)
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
