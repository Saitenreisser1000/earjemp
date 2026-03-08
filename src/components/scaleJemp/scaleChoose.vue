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
                    <v-switch
                        v-model="localOffsetFirst"
                        label="1st Tone Offset"
                        class="my-0"
                        density="compact"
                        hide-details
                    />
                </v-card>
            </v-menu>
        </div>
        <div class="between-slot">
            <slot name="between"></slot>
        </div>
        <v-select
                v-model="selectedScales"
                :items="scales"
                mandatory
                item-title="text"
                item-value="value"
                return-object
                label="Select Scales"
                multiple
                hide-details
        >
            <template #selection></template>
        </v-select>
        <v-btn-toggle
                v-model="localPlayOrder"
                class="text-white mt-2"
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
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import { createScaleOptions, createDefaultSelectedScales } from "@/domain/music/definitions";
    import { scaleValuesForDifficulty } from "@/domain/music/difficulty";

export default {
        name: "scaleChoose",
        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            offsetFirst: {
                type: Boolean,
                default: true
            },
            difficulty: {
                type: String,
                default: 'easy'
            },
            playOrder: {
                type: Array,
                default: () => ['increase']
            }
        },
        emits: ['update:autoplay', 'update:offsetFirst', 'update:difficulty', 'update:playOrder'],
        data() {
            return {
                scales: createScaleOptions(),
                selectedScales: createDefaultSelectedScales()
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
            localOffsetFirst: {
                get() {
                    return this.offsetFirst;
                },
                set(value) {
                    this.$emit('update:offsetFirst', value);
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
            }
        },

        methods: {
          ...mapActions(['setSelectedScales']),
        },

        watch: {
          difficulty: {
            immediate: true,
            handler(value) {
              const allowed = scaleValuesForDifficulty(value);
              this.selectedScales = this.scales.filter((item) => allowed.includes(item.value));
            }
          },
          selectedScales: {
            immediate: true,
            handler() {
              this.setSelectedScales(this.selectedScales)
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
    .v-btn{
        text-transform: none !important;
    }
</style>
