<template>
        <v-card min-width="360px" height="400" flat>

            <img class=clef src="../assets/clef.svg" height="150">
            <div class="lineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>
            <img class=bass-clef src="../assets/bass-clef.svg" height="80">
            <div class="basslineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>
            <div class="orientationline"></div>

<!-----------------notes---------------------->
            <div  :key="index" v-for="(tone, index) in getAllTones">
                <img
                        class="note"
                        @click="clickTone(tone)"
                        src="../assets/notes/wholeNote.svg"
                        height="20"
                        :style="{ top: tone.yPos + 'px'}"
                        :class="{noteClicked: tone.isActive}"
                >
                <!--div class="flat" v-if="tone.alt">
                    <img src="../assets/notes/b.png" height="25">
                </div-->

                <div class="sharp" v-if="tone.alt && tone.alt[0].isActive" :style="{'top': tone.alt[0].yPos +'px'}">
                    <img src="../assets/notes/hashtag.svg" height="20">
                </div>
            </div>



            <div class="helperlines"></div>

            <v-btn-toggle class="float-right btn-toggle" width="100px"
                mandatory dark active-class="primary"
            >
                <v-btn height="80px">b</v-btn>
                <br>
                <v-btn height="80px">-</v-btn>
                <br>
                <v-btn height="80px">#</v-btn>
            </v-btn-toggle>

        </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "stave",
        data(){
            return {
                isPrime: false,
                isSelected: false,
                firstTone: '',
            }
        },
        methods:{
            clickTone(){
                this.isSelected = !this.isSelected
            },
        },

        computed: {
            ...mapGetters(['getAllPlayedTones', 'getAllTones']),

        }
    }
</script>

<style scoped>

    .orientationline{
        position:absolute;
        opacity: 0.3;
        height:100%;
        left: 123px;
        width: 50px;
        background-color: wheat;
    }

    .lineContainer{
        position:absolute;
        top: 40px;
    }

    .basslineContainer{
        position: absolute;
        top: 172px;
    }

    .line{
        width: 200px;
        margin: 20px;
        height: 2px;
        z-index: 1;
        background-color: black;
    }

    .clef{
        position:absolute;
        left: 15px;
        top: 30px;
    }

    .bass-clef{
        position:absolute;
        left: 15px;
        top: 190px;
    }
    .note{
        position:absolute;
        left: 135px;
        z-index: 1;
        opacity: 0;
    }
    .note:hover{
        z-index: 1;
        opacity: 0.5;
    }
    .noteClicked{
        z-index: 1;
        opacity: 1;
    }
    .secondTone{
        left: 160px;
    }
    .btn-toggle {
        flex-direction: column;
        justify-content: center;
    }
    .helperlines{
        position:absolute;
        width: 35px;
        left: 131px;
        height: 2px;
        background-color: black;
    }
    .sharp{
        position:absolute;
        left: 100px;
    }
    .flat{
        position:absolute;
        left: 100px;
    }
</style>
