<template>
    <div class="mb-6 mt-6 container">
        <v-btn color="primary" width="62.5%" height="52" class="mr-2 " @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn class="button" color="primary" width="30%" height="52" @click="$emit('playRandomScale')">
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
        padding:0;
    }
</style>
