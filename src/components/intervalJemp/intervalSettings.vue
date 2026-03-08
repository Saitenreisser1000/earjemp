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
                </v-card>
            </v-menu>
        </div>
        <div class="between-slot">
            <slot name="between"></slot>
        </div>
        <v-select
                v-model="selectInt"
                :items="intervals"
                mandatory
                item-title="text"
                item-value="value"
                return-object
                label="Select Intervals"
                multiple
                hide-details
        >
            <template #selection="{ item, index }">
                <span v-if="index === 0">{{ item?.title || item?.raw?.text || '' }}</span>
                <span v-else-if="index === 1" class="text-caption">
                    (+{{ selectInt.length - 1 }})
                </span>
            </template>
        </v-select>
        <v-btn-toggle
                @change="$emit('setPlayOrder', playOrder)"
                class="text-white mt-2"
                v-model="playOrder"
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
    import {mapActions} from 'vuex';
    import { createIntervalOptions, createDefaultSelectedIntervals } from "@/domain/music/definitions";
    import { intervalValuesForDifficulty, intervalPlayOrderForDifficulty } from "@/domain/music/difficulty";

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
            }
        },
        emits: ['update:autoplay', 'update:difficulty', 'setPlayOrder'],
        data() {
            return {
                playOrder: 'increase',
                intervals: createIntervalOptions(),
                selectInt: createDefaultSelectedIntervals()
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
                    this.$emit('setPlayOrder', this.playOrder);
                }
            },
            selectInt: {
                immediate: true,
                handler() {
                    this.setSelectedIntervals(this.selectInt)
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
