<template>
    <div>
        <v-btn :key="index" @click="$emit('guessResult', item.text)" class="mb-2 mr-2 btn" v-for="(item, index) in getSelectedChords" x-large>{{item.text}}
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "guessChord",
        computed:{
            ...mapGetters(['getSelectedChords'])
        }
    }
</script>

<style scoped>
    .btn{
        width: 30%;
        height: 50px;
        font-size: 10px;
        text-transform: none !important;
    }
</style>
