<template>
        <v-card min-width="240px" height="320" flat>
            <img class=clef src="../assets/clef.svg" height="150">
            <div class="lineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>
            <img class=bass-clef src="../assets/bass-clef.svg" height="80">
            <div class="basslineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>

            <div v-if="getAllPlayedTones[0]">
                <img class="note" src="../assets/notes/wholeNote.svg" height="20" :style="{ top: getFirstTone }">
            </div>
            <div v-if="getAllPlayedTones[1]">
                <img class="note" src="../assets/notes/wholeNote.svg" height="20" :style="{ top: getSecondTone, left: '180px' }">
            </div>
        </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "stave",
        data(){
            return {
                isPrime: false
            }
        },
        computed: {
            ...mapGetters(['getAllPlayedTones']),
            getFirstTone(){
                return this.getAllPlayedTones[0].yPos + 'px'
            },
            getSecondTone(){
                return this.getAllPlayedTones[1].yPos + 'px'
            }
        }
    }
</script>

<style scoped>
    .lineContainer{
        position:absolute;
        top: 30px;
    }

    .basslineContainer{
        position: absolute;
        top: 162px;
    }

    .line{
        width: 200px;
        margin: 20px;
        height: 2px;
        background-color: black;
    }

    .clef{
        position:absolute;
        left: 15px;
        top: 20px;
    }

    .bass-clef{
        position:absolute;
        left: 15px;
        top: 180px;
    }
    .note{
        position:absolute;
        left: 100px;
    }
    .secondTone{
        left: 160px;
    }
</style>
