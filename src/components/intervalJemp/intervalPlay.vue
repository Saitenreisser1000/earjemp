<template>
    <div class="mb-6 container">
        <v-btn color="primary" class="mr-2" width="190" height="52" @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn color="primary" x-large @click="$emit('playRandomInterval')">
            <span>next</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    export default {
        name: "intervalPlay",
    }

</script>

<style scoped>
    .container{
        display: flex;
        justify-content: space-evenly;
    }
</style>
