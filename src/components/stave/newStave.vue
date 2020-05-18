<template>
    <div class="lineContainer">
        <!--div class="barLines" :style="{left:getBars * bar+'%', height:getBarlineHeight + 'px'}"></div-->

        <div class="offsetContainer" :style="{marginLeft: leftOffset+'%', width: 100 - leftOffset + '%'}">
            <!--bar class="bar" :key="i" v-for="(bar, i) in bars" :style="{height: getBarlineHeight + 'px', width: calcBarWidth + '%'}"></bar-->

            <!--div class="barLines" :key="bar" v-for="bar in bars" :style="{left:getBars * bar+'%', height:getBarlineHeight + 'px'}"></div>
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:0%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:12%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:24%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:38%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:50%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:62%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:74%" >
            <img src="../../assets/notes/wholeNote.svg" class="note" style="height:14px; left:86%" -->
        </div>
        <div class=staveLines :key="index" v-for="(str, index) in 5" :style="{top: (str-1) * height/5+'px'}"></div>

        <img v-if="clef === 'treble'" class="clef" src="../../assets/clef.svg" :style="{top:getTrebleY + 'px', height: getTrebleHeight + 'px'}">
        <img v-if="clef === 'bass'" class="clef" src="../../assets/bass-clef.svg" :style="{top:getBassY + 'px', height: getBassHeight + 'px'}">
        <signature></signature>


    </div>
</template>

<script>
    import signature from "@/components/stave/signature";
    //import Bar from "@/components/stave/bar";

    export default {
        name: "newStave",
        components:{signature},
        props: {
            clef: String,
            height: {type: Number, default: 60},
            bars: {type: Number, default: 1},
            clefOffset: {type: Number, default: 8}},

        computed:{

            calcBarWidth(){
                return 100/this.bars
            },

            getBarlineHeight(){
                return this.height-this.height/5
            },

            getBars(){
                return 100/this.bars
            },
            getTrebleHeight(){
                return this.height + this.height/3
            },
            getTrebleY(){
                return (this.height/4 - 2) *-1
            },
            getBassHeight(){
                return this.height - this.height/4
            },
            getBassY(){
                return (this.height/30) *-1
            },
            leftOffset(){
                return this.clefOffset
            }

        }
    }
</script>

<style scoped>
    .lineContainer{
        top: 20px;
        position: relative;
    }

    .offsetContainer{
        position:absolute;
    }

    .barLines{
        position:absolute;
        width: 1px;
        background-color: grey;
    }

    .bar{
        float: left;
    }

    .note{
        position: absolute;
    }

    .staveLines{
        position: absolute;
        width: 100%;
        margin: auto;
        height: 1px;
        background-color: grey;
    }

    .clef{
        position:absolute;
        z-index: 1;
    }
</style>
