<template>
    <div class="mb-6 mt-6 container">
        <v-btn color="success"  width="62.5%" height="52" class="mr-2 depth-btn" @click="$emit('playAgain')">
            <v-icon v-if="started" size="24">mdi-replay</v-icon>
            <span v-else>{{ $t('common.start') }}</span>
        </v-btn>
        <v-btn class="button depth-btn" color="error" width="30%" height="52" :disabled="!started" @click="$emit('playRandomInterval')">
            <v-icon size="24">mdi-skip-next</v-icon>
        </v-btn>
        <br>
    </div>
</template>

<script>
    export default {
        name: "intervalPlay",
        props: {
            started: {
                type: Boolean,
                default: false
            }
        }
    }

</script>

<style scoped>
.container{
        /*display: flex;
        justify-content: space-evenly;*/
        padding:0;
    }
.depth-btn {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.28);
        filter: brightness(0.96);
    }
</style>
