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
                <v-btn value="easy" size="small">easy</v-btn>
                <v-btn value="advanced" size="small">advanced</v-btn>
                <v-btn value="expert" size="small">expert</v-btn>
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
                        options
                    </v-btn>
                </template>
                <v-card min-width="220" class="pa-2">
                    <v-switch
                        v-model="localAutoplay"
                        label="autoplay"
                        class="my-0"
                        density="compact"
                        hide-details
                    />
                    <v-select
                        v-model="localResultDisplayMs"
                        :items="resultDisplayOptions"
                        item-title="label"
                        item-value="value"
                        label="result display"
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
                    v-model="localPlayOrder"
                    class="text-white play-order-toggle"
                    dense
                    active-class="primary"
                    background-color="secondary"
                    multiple
                    mandatory
            >
                <v-btn value="increase">
                    <span>up</span>
                </v-btn>
                <v-btn value="decrease">
                    <span>down</span>
                </v-btn>
                <v-btn value="simultaneous">
                    <span>=</span>
                </v-btn>
            </v-btn-toggle>
            <v-select
                    v-model="selectedChords"
                    :items="chords"
                    item-title="text"
                    item-value="value"
                    return-object
                    label="Select Chords"
                    multiple
                    density="compact"
                    hide-details
                    class="chord-inline-select"
            >
                <template #selection></template>
            </v-select>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import { createChordOptions, createDefaultSelectedChords } from "@/domain/music/definitions";
    import { chordValuesForDifficulty } from "@/domain/music/difficulty";

export default {
        name: "chordChoose",
        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            difficulty: {
                type: String,
                default: 'easy'
            },
            playOrder: {
                type: Array,
                default: () => ['simultaneous']
            },
            resultDisplayMs: {
                type: Number,
                default: 1500
            }
        },
        emits: ['update:autoplay', 'update:difficulty', 'update:playOrder', 'update:resultDisplayMs'],
        data() {
            return {
                chords: createChordOptions(),
                selectedChords: createDefaultSelectedChords(),
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
            localPlayOrder: {
                get() {
                    return this.playOrder;
                },
                set(value) {
                    this.$emit('update:playOrder', value);
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
            ...mapActions(['setSelectedChords']),
        },

        watch: {
            difficulty: {
                immediate: true,
                handler(value) {
                    const allowed = chordValuesForDifficulty(value);
                    this.selectedChords = this.chords.filter((item) => allowed.includes(item.value));
                }
            },
            selectedChords: {
                immediate: true,
                handler() {
                    this.setSelectedChords(this.selectedChords)
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
    .chord-inline-select {
        min-width: 136px;
        max-width: 160px;
        flex: 0 1 160px;
    }
    .chord-inline-select :deep(.v-field) {
        min-height: 38px !important;
    }
    .v-btn{
        text-transform: none !important;
    }
</style>
