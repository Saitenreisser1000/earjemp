<template>
    <div class="mb-6">
        <v-btn color="deep-purple primary" class="mr-2" width="190" height="50" @click="playAgain">
            <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="deep-purple primary" x-large @click="playNextInterval">
            <!--v-icon>skip_next</v-icon-->
            <span>new</span>
        </v-btn>

        <v-btn color="deep-purple primary" x-large @click="pickRandomTone">
            <!--v-icon>skip_next</v-icon-->
            <span>test</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "intervalPlay",
        methods: {
            ...mapActions(['playNextInterval', 'playAgain', 'pickRandomTone']),
        }
    }

</script>

<style scoped>

</style>
