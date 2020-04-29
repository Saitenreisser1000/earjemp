<template>
    <div>
        <v-card-actions class="pa-0">
            <v-btn color="deep-purple primary" x-large @click="triggerTone">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn color="deep-purple primary" x-large @click="nextTone">
                <v-icon>skip_next</v-icon>
            </v-btn>
        </v-card-actions>
        <br>
        <v-btn-toggle
                v-model="chooseOrder"
                dense
                dark
                background-color="secondary"
                active-class="primary"
                multiple
                mandatory
        >

            <v-btn value="increase">
                <v-icon>expand_less</v-icon>
            </v-btn>

            <v-btn value="decrease">
                <v-icon>expand_more</v-icon>
            </v-btn>

            <v-btn value="simultaneous">
                <v-icon>unfold_more</v-icon>
            </v-btn>

        </v-btn-toggle>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "intervalPlay",
        data() {
            return{
                chooseOrder: 'increase'
            }
        },
        methods: {
            ...mapActions(['playIntervals']),
            triggerTone(){

            },
            nextTone(){
                this.playIntervals(this.chooseOrder);
            }
        }
    }

</script>

<style scoped>

</style>
