<template>
    <div>
        <div v-if="tone === 'C3'" class="helperlines" :style="{top: 170+'px'}"></div>
        <div v-if="tone === 'E1'" class="helperlines" :style="{top: 302+'px'}"></div>
        <div v-if="tone === 'A4'" class="helperlines" :style="{top: 38+'px'}"></div>
        <div v-if="tone === 'B4'" class="helperlines" :style="{top: 38+'px'}"></div>
        <div v-if="tone === 'C5'" class="helperlines" :style="{top: 38+'px'}"></div>
        <div v-if="tone === 'C5'" class="helperlines" :style="{top: 16+'px'}"></div>
    </div>
</template>

<script>
    export default {
        props: ['tone'],
        name: "helperLines",
    }
</script>

<style scoped>
    .helperlines{
        position:absolute;
        width: 35px;
        left: 131px;
        height: 2px;
        background-color: black;
    }
</style>
