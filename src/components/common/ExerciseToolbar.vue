<template>
    <div class="exercise-toolbar">
        <v-menu location="bottom start" :close-on-content-click="false">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="text"
                    size="small"
                    color="primary"
                    prepend-icon="mdi-tune-variant"
                >
                    {{ $t('app.level') }}
                </v-btn>
            </template>
            <v-card min-width="220" class="pa-2">
                <slot name="level"></slot>
            </v-card>
        </v-menu>

        <v-menu location="bottom end" :close-on-content-click="false">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="text"
                    size="small"
                    color="primary"
                    prepend-icon="mdi-cog"
                >
                    {{ $t('common.options') }}
                </v-btn>
            </template>
            <v-card min-width="220" class="pa-2">
                <slot name="options"></slot>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: 'ExerciseToolbar'
    }
</script>

<style scoped>
    .exercise-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 36px;
    }
</style>
