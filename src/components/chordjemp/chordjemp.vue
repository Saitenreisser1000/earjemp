<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="500" height="800">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-row>
                            <chordChoose></chordChoose>
                        </v-row>
                        <br>
                        <v-row>
                            <chordPlay></chordPlay>
                        </v-row>
                        <br>
                        <v-row>

                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import {mapGetters, mapActions} from 'vuex';
    import chordChoose from "@/components/chordjemp/chordChoose";
    import chordPlay from "@/components/chordjemp/chordPlay";
    export default {
        name: "chordjemp",
        computed: {
            ...mapGetters(['getToneChain'])
        },
        components: {chordChoose, chordPlay}
    }
</script>

<style scoped>

</style>
