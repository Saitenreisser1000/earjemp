<template>
    <div style="width:100%; height: 30px" :style="{backgroundColor:respColor}"></div>
</template>

<script>
    export default {
        name: "response",
        props: {
            respColor: {
                default: '#9DA0A9'
            }
        },
	}
</script>

<style scoped>

</style>
