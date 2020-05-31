<template>
    <div class="container">
        <v-btn color="primary" class="" width="50%" height="52" @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn color="primary" width="20%" height="52" @click="$emit('playRandomChord')">
            <span>next</span>
        </v-btn>
        <v-btn color="primary" width="20%" height="52" @click="$emit('playArpeggio')">
            <span>Arp</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    export default {
        name: "chordPlay",
    }
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: space-evenly;
    }
</style>
