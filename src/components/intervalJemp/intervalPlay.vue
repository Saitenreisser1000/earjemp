<template>
    <div class="mb-6 mt-6 container">
        <v-btn color="primary"  width="62.5%" height="52" class="mr-2" @click="$emit('playAgain')">
            <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn class="button" color="primary" width="30%" height="52" @click="$emit('playRandomInterval')">
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
        /*display: flex;
        justify-content: space-evenly;*/
        margin:0;
        padding:0;
    }
</style>
