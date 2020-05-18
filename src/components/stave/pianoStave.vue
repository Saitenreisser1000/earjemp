<template>
    <div>
        <newStave :clef="'treble'"></newStave>
        <newStave :clef="'bass'"></newStave>
    </div>
</template>

<script>
    import newStave from "@/components/stave/newStave";
    export default {
        name: "pianoStave",
        components:{
            newStave
        }
    }
</script>

<style scoped>

</style>
