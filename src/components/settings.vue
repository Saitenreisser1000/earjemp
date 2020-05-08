<template>
    <div>
        <br>
        <v-btn-toggle
                class="white--text"
                v-model="chooseOrder"
                dense
                active-class="primary"
                background-color="secondary"
                multiple
                mandatory
        >

            <v-btn value="increase">
                <span>up</span>
            </v-btn>

            <v-btn value="decrease">
                <span>down</span>
            </v-btn>

            <v-btn value="simultaneous">
                <span>=</span>
            </v-btn>

        </v-btn-toggle>
        <br>
        <br>
        <interval-choose></interval-choose>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import IntervalChoose from "@/components/intervalChoose";

    export default {
        name: "settings",
        components: {IntervalChoose},
        data() {
            return{
                chooseOrder: 'increase'
            }
        },
        computed: {
            ...mapActions(['setOrder']),
        },
        watch:{
            chooseOrder:{
                immediate: true,
                handler(){
                    this.setOrder(this.chooseOrder)
                },
            }
        },
    }
</script>

<style scoped>

    .v-btn{
        text-transform: none !important;
    }

</style>
