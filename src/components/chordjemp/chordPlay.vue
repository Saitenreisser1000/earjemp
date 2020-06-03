<template>
    <div class="mb-6 mt-6 container">
        <v-btn color="primary" class="mr-2" width="50%" height="52" @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn color="primary" class="mr-2 button" width="20%" height="52" @click="$emit('playRandomChord')">
            <span>next</span>
        </v-btn>
        <v-btn color="primary" class="button" width="20%" height="52" @click="$emit('playArpeggio')">
            <span>arp</span>
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
        padding:0;
    }
</style>
