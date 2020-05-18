<template>
    <v-expansion-panels focusable>
        <v-expansion-panel
                v-model="panel">
            <v-expansion-panel-header>settings</v-expansion-panel-header>
            <v-expansion-panel-content
                eager
            >
                <settings></settings>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>notation</v-expansion-panel-header>
            <v-expansion-panel-content>
               <newStave :clef="'treble'"></newStave>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import newStave from "@/components/stave/newStave";
    import Settings from "@/components/settings";
    export default {
        name: "noteDisplay",
        data(){
            return{
                panel: 0,
            }
        },

        components: {Settings, newStave}
    }
</script>

<style scoped>

</style>
