<template>
    <div>
        <v-card flat class="pa-3" width="190" height="50" :class="{wrong: getResponse, right: !getResponse}">
                <v-icon v-if="getResponse">done_outline</v-icon>
                <v-icon v-if="!getResponse">close</v-icon>
            {{response}}
        </v-card>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "display",
        computed: {
            ...mapGetters(["getResponse"]),
            response(){
                // eslint-disable-next-line no-unused-vars
                let message;
                    message = "press play-button to start";

                if(this.getResponse){
                    message = 'Yes, well done !'
                }
                if(!this.getResponse){
                    message = 'sorry, try again'
                }
                return message
            }
        }
    }

</script>

<style scoped>
    .v-card{
        font-size: 16px;
    }
    .wrong{
        background-color: green;
        color: white
    }
    .right{
        background-color: orangered;
    }

</style>
