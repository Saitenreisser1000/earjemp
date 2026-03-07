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
                </v-card>
            </v-menu>
        </div>
        <div class="between-slot">
            <slot name="between"></slot>
        </div>
        <v-select
                v-model="selectedChords"
                :items="chords"
                item-title="text"
                item-value="value"
                return-object
                label="Select Chords"
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
    import { mapActions } from "vuex";

export default {
        name: "chordChoose",
        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            playOrder: {
                type: Array,
                default: () => ['simultaneous']
            }
        },
        emits: ['update:autoplay', 'update:playOrder'],
        data() {
            return {
                chords: [
                    {text: 'minor',       value: 0 , toneSteps:[3,4],  lineDist:[2,2],   maxRange: 7},
                    {text: 'major',       value: 1 , toneSteps:[4,3],  lineDist:[2,2],   maxRange: 7},
                    {text: 'diminished',  value: 2 , toneSteps:[3,3],  lineDist:[2,2],   maxRange: 6},
                    {text: 'augmented',   value: 3 , toneSteps:[4,4],  lineDist:[2,2],   maxRange: 8},
                    {text: 'sus2',         value: 4 , toneSteps:[2,5],  lineDist:[1,3],   maxRange: 7},
                    {text: 'sus4',         value: 5 , toneSteps:[5,2],  lineDist:[3,1],   maxRange: 7},
                    {text: 'm7',      value: 6 , toneSteps:[3,4,3],lineDist:[2,2,2], maxRange: 10},
                    {text: 'm'+ String.fromCharCode(9651)+'7',      value: 7 , toneSteps:[3,4,4],lineDist:[2,2,2], maxRange: 11},
                    {text: '7',      value: 8 , toneSteps:[4,3,3],lineDist:[2,2,2], maxRange: 10},
                    {text: String.fromCharCode(9651)+'7',      value: 9 , toneSteps:[4,3,4],lineDist:[2,2,2], maxRange: 11},
                    {text: 'halfDim7',     value: 10, toneSteps:[3,3,4],lineDist:[2,2,2], maxRange: 10},
                    {text: 'dim7',  value: 11, toneSteps:[3,3,3],lineDist:[2,2,2], maxRange: 9},
                    {text: 'aug7',   value: 12, toneSteps:[4,4,2],lineDist:[2,2,2], maxRange: 11},

                ],
                selectedChords: [
                    {text: 'minor',       value: 0 , toneSteps:[3,4],  lineDist:[2,2],   maxRange: 7},
                    {text: 'major',       value: 1 , toneSteps:[4,3],  lineDist:[2,2],   maxRange: 7},
                    {text: 'diminished',  value: 2 , toneSteps:[3,3],  lineDist:[2,2],   maxRange: 6},
                    {text: 'augmented',   value: 3 , toneSteps:[4,4],  lineDist:[2,2],   maxRange: 8},
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
            ...mapActions(['setSelectedChords']),
        },

        watch: {
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
