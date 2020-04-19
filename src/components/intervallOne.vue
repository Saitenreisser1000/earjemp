<template>
    <v-card class="mx-auto blue-grey lighten-5" max-width="1000">

        <v-card-text >
            <v-container>
                <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-card width="100%" height="120" flat>lorem...</v-card>
                    </v-row>
                    <br>
                    <v-row>
                        <v-card-actions class="pa-0">
                            <v-btn color="deep-purple primary">
                                <v-icon>play_arrow</v-icon>
                            </v-btn>
                            <v-btn color="deep-purple primary">
                                <v-icon>skip_next</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn-toggle
                                v-model="chooseOrder"
                                dense
                                background-color="primary"
                                multiple
                                class="ml-8"
                        >

                            <v-btn>
                                <v-icon>expand_less</v-icon>
                            </v-btn>

                            <v-btn>
                                <v-icon>expand_more</v-icon>
                            </v-btn>

                            <v-btn>
                                <v-icon>unfold_more</v-icon>
                            </v-btn>

                        </v-btn-toggle>
                    </v-row>
                </v-col>

                <v-col class="ml-4">
                    <v-row>
                        <v-btn :key="index" v-for="(b, index) in items" class="ml-2 mb-2">{{b}}</v-btn>
                    </v-row>

                </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="value"
                                :items="items"
                                attach
                                chips
                                label="Choose Interval"
                                multiple
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

    </v-card>
</template>

<script>
    export default {
        name: "intervallOne",
        data() {
            return {
                toggle_multiple: [1, 2, 3, 4, 5, 6, 7, 8],
                tab: null,
                items: ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8', 'b9', '9'
                ],
            }
        }
    }
</script>

<style scoped>

</style>
