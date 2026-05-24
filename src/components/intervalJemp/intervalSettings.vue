<template>
    <div>
        <div class="choose-header">
            <v-btn-toggle
                v-model="localDifficulty"
                class="text-white difficulty-toggle"
                density="compact"
                active-class="primary"
                background-color="secondary"
                mandatory
            >
                <v-btn value="easy" size="small">{{ $t('common.easy') }}</v-btn>
                <v-btn value="advanced" size="small">{{ $t('common.advanced') }}</v-btn>
                <v-btn value="expert" size="small">{{ $t('common.expert') }}</v-btn>
            </v-btn-toggle>
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
                    <v-switch
                        v-model="localAutoplay"
                        :label="$t('common.autoplay')"
                        class="my-0"
                        density="compact"
                        hide-details
                    />
                    <v-select
                        v-model="localResultDisplayMs"
                        :items="resultDisplayOptions"
                        item-title="label"
                        item-value="value"
                        :label="$t('common.resultDisplay')"
                        density="compact"
                        hide-details
                        class="mt-1"
                    />
                </v-card>
            </v-menu>
        </div>
        <div class="between-slot">
            <slot name="between"></slot>
        </div>
        <div class="controls-row mt-2">
            <v-btn-toggle
                    @change="$emit('setPlayOrder', playOrder)"
                    class="text-white play-order-toggle"
                    v-model="playOrder"
                    dense
                    active-class="primary"
                    background-color="secondary"
                    multiple
                    mandatory
            >
                <v-btn value="increase">
                    <span>{{ $t('common.up') }}</span>
                </v-btn>

                <v-btn value="decrease">
                    <span>{{ $t('common.down') }}</span>
                </v-btn>

                <v-btn value="simultaneous">
                    <span>=</span>
                </v-btn>
            </v-btn-toggle>
            <v-select
                    v-model="selectInt"
                    :items="intervals"
                    mandatory
                    item-title="text"
                    item-value="value"
                    return-object
                    :label="$t('common.selectIntervals')"
                    multiple
                    density="compact"
                    hide-details
                    class="interval-inline-select"
            >
                <template #selection></template>
            </v-select>
        </div>
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import { createIntervalOptions, createDefaultSelectedIntervals } from "@/domain/music/definitions";
    import { intervalPlayOrderForDifficulty, intervalValuesForDifficulty } from "@/domain/music/difficulty";

export default {
        name: "intervalChoose",
        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            difficulty: {
                type: String,
                default: 'easy'
            },
            resultDisplayMs: {
                type: Number,
                default: 1500
            }
        },
        emits: ['update:autoplay', 'update:difficulty', 'update:resultDisplayMs', 'setPlayOrder'],
        data() {
            return {
                playOrder: ['increase'],
                intervals: createIntervalOptions(),
                selectInt: createDefaultSelectedIntervals(),
                resultDisplayOptions: [
                    { label: '0.5s', value: 500 },
                    { label: '1.0s', value: 1000 },
                    { label: '1.5s', value: 1500 },
                    { label: '2.0s', value: 2000 },
                    { label: '3.0s', value: 3000 }
                ]
            }
        },
        computed: {
            localAutoplay: {
                get() {
                    return this.autoplay;
                },
                set(value) {
                    this.$emit('update:autoplay', value);
                }
            },
            localDifficulty: {
                get() {
                    return this.difficulty;
                },
                set(value) {
                    this.$emit('update:difficulty', value);
                }
            },
            localResultDisplayMs: {
                get() {
                    return this.resultDisplayMs;
                },
                set(value) {
                    this.$emit('update:resultDisplayMs', value);
                }
            }
        },

        methods: {
            ...mapActions(['setSelectedIntervals']),
        },

        watch: {
            difficulty: {
                immediate: true,
                handler(value) {
                    const allowed = intervalValuesForDifficulty(value);
                    this.selectInt = this.intervals.filter((item) => allowed.includes(item.value));
                    this.playOrder = intervalPlayOrderForDifficulty(value);
                }
            },
            selectInt: {
                immediate: true,
                handler() {
                    this.setSelectedIntervals(this.selectInt)
                }
            },
            playOrder: {
                immediate: true,
                handler(value) {
                    this.$emit('setPlayOrder', value);
                }
            }
        }
    }
</script>

<style scoped>
    .choose-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }
    .difficulty-toggle :deep(.v-btn) {
        text-transform: none !important;
        min-width: 52px;
    }
    .between-slot {
        margin-bottom: 10px;
    }
    .controls-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .play-order-toggle {
        width: 170px;
        min-width: 170px;
    }
    .play-order-toggle :deep(.v-btn) {
        flex: 1 1 0;
        min-width: 0 !important;
        text-align: center;
    }
    .interval-inline-select {
        min-width: 140px;
        max-width: 160px;
        flex: 0 1 160px;
    }
    .interval-inline-select :deep(.v-field) {
        min-height: 38px !important;
    }
    .v-btn{
        text-transform: none !important;
    }
</style>
