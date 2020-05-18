<template>
    <div>
        <img v-if="upSign" class="signature" :style="{left: '50px'}" :src="require(`../../assets/notes/signatures/sign${this.upSign}.svg`)">
        <img v-if="downSign" class="signature" :style="{top: '30px', left: '50px'}" :src="require(`../../assets/notes/signatures/sign${this.downSign}.svg`)">
    </div>
</template>

<script>
    export default {
        name: "signature",
        props:['upSign', 'downSign'],
    }
</script>

<style scoped>
    .signature{
        position:absolute;
        height: 27px;
    }

</style>
