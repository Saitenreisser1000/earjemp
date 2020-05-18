<template>
    <div class="test">
        <note :noteDistance="getNoteDistance"></note>
        <!--img src="../../assets/notes/wholeNote.svg" class="note" :style="{height:14 +'px', left: getNoteDistance +'%'}" -->
        <div class="barLines"></div>
    </div>

</template>

<script>
    import note from "@/components/stave/note";
    export default {
        name: "bar",
        props: {
            signature: {type: String, default: null},
            noteAmount: {type: Number, default: 8}
        },
        computed: {
            getNoteDistance(){
                return 100/this.noteAmount
            }
        },
        components:{
            note
        }
    }
</script>

<style scoped>

    .barLines{
        position:relative;
        top: 0;
        height: 100%;
        left: 100%;
        width: 2px;
        background-color: grey;
    }
    .note{
        position: absolute;
    }
</style>
