<template>
    <div>
        <v-btn :key="index" @click="guessInterval(int.value)" class="mb-2 mr-2" v-for="(int, index) in getSelectIntervals"
               x-large>{{int.text}}
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "intervalInput",

        computed: {
            ...mapGetters(['getSelectIntervals']),
            getIntervals(){
                let int;
                int = this.getSelectIntervals;
                return int.sort((a,b) => a.value - b.value)
            }
        },

        methods: {
            ...mapActions(['setGuess']),

            guessInterval(value){
                this.setGuess(value);
            }
        }
    }
</script>

<style scoped>

</style>
