<template>
    <v-card class="pa-2 mx-auto bg-blue-grey-lighten-5 exercise-card" max-width="350" elevation="10">
        <v-card
            class="mx-auto bg-blue-grey-lighten-5 d-flex flex-column ga-2 exercise-card-body"
            max-width="350"
            :disabled="disabled"
            flat
        >
            <div class="intro-copy">
                <slot name="intro"></slot>
            </div>
            <slot></slot>
        </v-card>
    </v-card>
</template>

<script>
    export default {
        name: 'ExerciseCard',
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .exercise-card {
        max-height: calc(var(--app-main-height) - (var(--app-main-vertical-gap) * 2));
        overflow-y: auto;
        overflow-x: hidden;
    }
    .exercise-card-body {
        min-height: min(550px, calc(var(--app-main-height) - (var(--app-main-vertical-gap) * 2) - 16px));
    }
    .intro-copy {
        color: rgba(0, 0, 0, 0.78);
        font-size: 1.22rem;
        font-weight: 700;
        line-height: 1.2;
        padding: 4px 4px 6px;
        text-align: center;
    }
</style>
