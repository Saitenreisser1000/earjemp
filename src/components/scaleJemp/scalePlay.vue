<template>
    <div class="container">
        <v-btn color="primary" class="mr-0" width="190" height="51" @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn color="primary" x-large @click="$emit('playRandomScale')">
            <span>next</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    export default {
        name: "scalePlay",
    }
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: space-evenly;
    }
</style>
