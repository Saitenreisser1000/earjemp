<template>
        <v-card min-width="250px" height="350" flat>

            <img class=clef src="../assets/clef.svg" height="150">
            <div class="lineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>
            <img class=bass-clef src="../assets/bass-clef.svg" height="80">
            <div class="basslineContainer">
                <div class="line" :key="index" v-for="index in 5"></div>
            </div>

<!-----------------notes---------------------->

            <div v-if="firstTone()">
                <img class="note"
                     src="../assets/notes/wholeNote.svg"
                     :style="{top: firstTone().yPos+'px'}"
                     height="20">
                <img v-if="firstFlat" class="flat" src="../assets/notes/b.png"
                     :style="{top: firstTone().yPos-18+'px'}"
                     height="40px">
                <img v-if="firstSharp" class="sharp" src="../assets/notes/sharp.png"
                     :style="{top: firstTone().yPos-10+'px'}"
                     height="40px">
            </div>

            <div v-if="secondTone() && show">
                <img class="note"
                     src="../assets/notes/wholeNote.svg"
                     :class="{seconds: isSecond(), prime: isPrime()}"
                     :style="{top: secondTone().yPos+'px'}"
                     height="20">
                <img v-if="secondFlat" class="flat" src="../assets/notes/b.png"
                     :style="{top: secondTone().yPos-18+'px'}"
                     :class="{accSeconds: isSecond()}"
                     height="40px">
                <img v-if="secondSharp" class="sharp" src="../assets/notes/sharp.png"
                     :style="{top: secondTone().yPos-10+'px'}"
                     :class="{accSeconds: isSecond()}"
                     height="40px">
            </div>

            <!--div :key="index" v-for="(helper, index) in firstTonehelperlines()" class="helperlines" :style="{top:170+'px'}"></div-->
            <helper-lines v-if="firstTone()"  :tone="firstTone().tone"></helper-lines>
            <helper-lines v-if="secondTone()" :tone="secondTone().tone"></helper-lines>

            <!--v-btn @click="clickTone">ShowSecond</v-btn-->

        </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import HelperLines from "@/components/helperLines";

    export default {
        name: "stave",
        components: {HelperLines},
        data(){
            return {
                show: true,
                first: '',
                second: '',

                randomAcc: 1,

                firstFlat: false,
                firstSharp: false,

                secondFlat: false,
                secondSharp: false,


                notes: [
                    {id:0,  tone: 'E1', yPos:293,},
                    {id:1,  tone: 'F1', yPos:282,},
                    {id:2,  tone: 'G1', yPos:271,},
                    {id:3,  tone: 'A1', yPos:260,},
                    {id:4,  tone: 'B1', yPos:249,},
                    {id:5,  tone: 'C2', yPos:238,},
                    {id:6,  tone: 'D2', yPos:227,},
                    {id:7,  tone: 'E2', yPos:216,},
                    {id:8,  tone: 'F2', yPos:205,},
                    {id:9,  tone: 'G2', yPos:194,},
                    {id:10, tone: 'A2', yPos:183,},
                    {id:11, tone: 'B2', yPos:172,},
                    {id:12, tone: 'C3', yPos:161,},
                    {id:13, tone: 'D3', yPos:150,},
                    {id:14, tone: 'E3', yPos:139,},
                    {id:15, tone: 'F3', yPos:128,},
                    {id:16, tone: 'G3', yPos:117,},
                    {id:17, tone: 'A3', yPos:106,},
                    {id:18, tone: 'B3', yPos:95, },
                    {id:19, tone: 'C4', yPos:84, },
                    {id:20, tone: 'D4', yPos:73, },
                    {id:21, tone: 'E4', yPos:62, },
                    {id:22, tone: 'F4', yPos:51, },
                    {id:23, tone: 'G4', yPos:40, },
                    {id:24, tone: 'A4', yPos:29, },
                    {id:25, tone: 'B4', yPos:18, },
                    {id:26, tone: 'C5', yPos:7,  },
             ],

        }
        },
        methods:{

           isSecond(){
              return Math.abs(this.firstTone().id - this.secondTone().id) === 1;
           },
           isPrime(){
               return Math.abs(this.firstTone().id - this.secondTone().id) === 0;
           },
            firstTone() {
                if(this.getFirstTone.accidental !== undefined){
                    this.first = this.getFirstTone.accidental[this.getRandomAcc];
                    if(this.getRandomAcc === 1){
                        this.firstFlat = true;
                    }else{
                        this.firstSharp = true;
                    }
                }
                else{
                    this.first = this.getFirstTone.tone;
                    this.firstFlat = false;
                    this.firstSharp = false;
                }
                return this.notes.find(note => note.tone === this.first)
            },
            secondTone() {
                if(this.getSecondTone.accidental !== undefined){
                    this.second = this.getSecondTone.accidental[this.getRandomAcc];
                    if(this.getRandomAcc === 1){
                        this.secondFlat = true;
                    }
                    else{
                        this.secondSharp = true;
                    }
                }
                else{
                    this.second = this.getSecondTone.tone;
                    this.secondFlat = false;
                    this.secondSharp = false;
                }

                return this.notes.find(note => note.tone === this.second)
            },
        },

        computed: {
            ...mapGetters(['getAllPlayedTones', 'getAllTones', 'getFirstTone', 'getSecondTone', 'getRandomAcc']),
        }
    }
</script>

<style scoped>

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
    }

    .prime{
        left: 164px;
    }

    .seconds{
        left: 158px
    }

    .btn-toggle {
        flex-direction: column;
        justify-content: center;
    }

    .sharp{
        position:absolute;
        left: 115px;
    }

    .accSeconds{
        left: 110px;
    }
    .flat{
        position:absolute;
        left: 100px;
    }
</style>
