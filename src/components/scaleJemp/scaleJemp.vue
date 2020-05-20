<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="500" height="800">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <v-row>
                            <scaleChoose></scaleChoose>
                        </v-row>
                        <br>
                        <v-row>
                            <scalePlay></scalePlay>
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
    import scaleChoose from "@/components/scaleJemp/scaleChoose";
    import scalePlay from "@/components/scaleJemp/scalePlay";

    export default {
        name: "scaleJemp",
        components: {scaleChoose, scalePlay}
    }
</script>

<style scoped>

</style>
