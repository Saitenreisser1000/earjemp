<template>
    <div>
        <v-btn :key="index" @click="/*guessInterval(int.value)*/" class="ml-2 mb-2" v-for="(int, index) in getSelectIntervals"
               x-large>{{int.text}}
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "intervalInput",
        computed: {
            ...mapGetters(['getSelectIntervals'])
        }
    }
</script>

<style scoped>

</style>
