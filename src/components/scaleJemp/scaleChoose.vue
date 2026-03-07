<template>
    <div>
        <div class="choose-header">
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
            playOrder: {
                type: Array,
                default: () => ['increase']
            }
        },
        emits: ['update:autoplay', 'update:offsetFirst', 'update:playOrder'],
        data() {
            return {
                scales: [
                    {text: 'major/ionian',          value: 1 , scale: [2,2,1,2,2,2,1],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [2,1,2,2,2,1,2],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [1,2,2,2,1,2,2],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [2,2,2,1,2,2,1],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [2,2,1,2,2,1,2],   maxRange: 7},
                    {text: 'natural-minor',         value: 6 , scale: [2,1,2,2,1,2,2],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [1,2,2,1,2,2,2],   maxRange: 7},
                    {text: 'melodic-minor',         value: 9 , scale: [2,1,2,2,2,2,1],   maxRange: 7},
                    {text: 'harmonic-minor',        value:10 , scale: [2,1,2,2,1,3,1],   maxRange: 7},
                ],
                selectedScales: [
                    {text: 'major|ionian',          value: 1 , scale: [2,2,1,2,2,2,1],   maxRange: 7},
                    {text: 'dorian',                value: 2 , scale: [2,1,2,2,2,1,2],   maxRange: 7},
                    {text: 'phrygian',              value: 3 , scale: [1,2,2,2,1,2,2],   maxRange: 7},
                    {text: 'lydian',                value: 4 , scale: [2,2,2,1,2,2,1],   maxRange: 7},
                    {text: 'mixolydian',            value: 5 , scale: [2,2,1,2,2,1,2],   maxRange: 7},
                    {text: 'minor|aeolian',         value: 6 , scale: [2,1,2,2,1,2,2],   maxRange: 7},
                    {text: 'locrian',               value: 7 , scale: [1,2,2,1,2,2,2],   maxRange: 7},
                    {text: 'melodic-minor',         value: 9 , scale: [2,1,2,2,2,2,1],   maxRange: 7},
                    {text: 'harmonic-minor',        value:10 , scale: [2,1,2,2,1,3,1],   maxRange: 7},
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
            localOffsetFirst: {
                get() {
                    return this.offsetFirst;
                },
                set(value) {
                    this.$emit('update:offsetFirst', value);
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
        justify-content: flex-end;
        margin-bottom: 4px;
    }
    .between-slot {
        margin-bottom: 10px;
    }
    .v-btn{
        text-transform: none !important;
    }
</style>
