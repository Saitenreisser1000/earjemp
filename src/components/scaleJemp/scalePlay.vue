<template>
    <div class="mb-6">
        <v-btn color="deep-purple primary" class="mr-2" width="190" height="50" @click="playAgain">
            <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="deep-purple primary" x-large @click="playScale()">
            <!--v-icon>skip_next</v-icon-->
            <span>new</span>
        </v-btn>
        <br>
    </div>
</template>

<script>
    import toneCalcService from "@/components/mixins/toneCalcService";
    import {mapGetters} from 'vuex';
    export default {
        name: "scalePlay",
        mixins: [toneCalcService],
        computed:{
            ...mapGetters(['getToneChain'])
        },
        methods:{
            playAgain(){

            },
            playScale(){
                console.log("--------------------------")
                let s = this.getScale('E3');
                s.forEach(tone => {
                    console.log(tone.name)
                })
            }
        }
    }
</script>

<style scoped>

</style>
