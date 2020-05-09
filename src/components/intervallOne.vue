<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="500">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-row>
                            <note-display></note-display>
                        </v-row>
                        <br>
                        <v-row>
                            <display></display>
                        </v-row>
                        <br>
                        <v-row>
                            <interval-play></interval-play>
                            <interval-input></interval-input>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    import IntervalInput from "@/components/intervalInput";
    import IntervalPlay from "@/components/intervalPlay";
    import NoteDisplay from "@/components/noteDisplay";
    import Display from "@/components/display";

    export default {
        name: "intervallOne",

        components:{
            Display,
            NoteDisplay,
            IntervalPlay,
            IntervalInput,
        }
    }
</script>

<style scoped>

</style>
