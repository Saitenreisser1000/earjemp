<template>
    <div>
        <v-btn :key="index" @click="$emit('guessResult', item.text)" class="mb-2 mr-2 btn" v-for="(item, index) in orderedList" >{{item.text}}
        </v-btn>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";
    import _ from 'lodash';

    export default {
        name: "guessInterval",
        computed:{
            ...mapGetters(['getSelectedIntervals']),
            orderedList: function(){
                return _.orderBy(this.getSelectedIntervals, 'value')
            }
        },
    }
</script>

<style scoped>
    .btn{
        width: 30%;
        height: 50px;
        font-size: 10px;
        text-transform: none !important;
    }
</style>
