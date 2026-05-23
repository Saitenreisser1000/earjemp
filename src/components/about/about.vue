<template>
    <v-container class="about-page">
        <v-sheet class="about-panel pa-5" elevation="2">
            <v-icon size="40" color="primary" class="mb-3">mdi-ear-hearing</v-icon>
            <h1 class="text-h5 mb-4">about earJEMP</h1>
            <p class="text-body-1 mb-3">
                This software was designed to train musical listening skills.
            </p>
            <p class="text-body-1 mb-3">
                The app is still in development.
            </p>
            <p class="text-body-1 mb-0">
                earJEMP is optimized for mobile devices in portrait mode.
            </p>
            <p class="text-caption mt-5 mb-0">
                JEMPCompany &copy;, 2026
            </p>
        </v-sheet>
    </v-container>
</template>

<script>
    export default {
        name: 'about'
    }
</script>

<style scoped>
    .about-page {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
    }

    .about-panel {
        width: 100%;
        max-width: 420px;
        border-radius: 8px;
    }
</style>
