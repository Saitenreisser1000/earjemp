<template>
    <img src="../../assets/notes/wholeNote.svg" class="note" :style="{top: 13+'%', height:25+'%', left: noteDistance +'%'}" >
</template>

<script>
    export default {
        name: "note",
        props: ['noteDistance']
    }
</script>

<style scoped>
    .note{
        position: absolute;
    }
</style>
