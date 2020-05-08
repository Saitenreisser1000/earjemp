<template>
    <div>
        <v-card-actions >
            <v-btn color="deep-purple primary" width="180" height="50" @click="playAgain">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn color="deep-purple primary" width="50" height="50" @click="playNextInterval">
                <v-icon>skip_next</v-icon>
            </v-btn>
        </v-card-actions>
        <br>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "intervalPlay",
        methods: {
            ...mapActions(['playNextInterval', 'playAgain']),
        }
    }

</script>

<style scoped>

</style>
