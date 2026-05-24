<template>
    <div>
        <v-btn :key="index" @click="$emit('guessResult', item.text)" class="mb-2 mr-2 btn depth-btn" color="primary" v-for="(item, index) in getSelectedScales" size="x-large">{{ scaleTitle(item) }}
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "guessScale",
        computed:{
            ...mapGetters(['getSelectedScales'])
        },
        methods: {
            scaleTitle(item) {
                return item && item.labelKey ? this.$t(item.labelKey) : item.text
            }
        }
    }
</script>

<style scoped>
    .btn {
        width: 30%;
        height: 50px;
        font-size: 10px;
        text-transform: none !important;
    }
    .depth-btn {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.28);
        filter: brightness(0.96);
    }
</style>
