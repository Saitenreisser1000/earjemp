<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark

    >
      <div class="d-flex align-center">
        <div>ear<span style="{size: 26px}">JEMP</span></div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="pa-4 mt-8">
      <br>
      <intervalJemp></intervalJemp>
      <chordjemp></chordjemp>
      <scaleJemp></scaleJemp>
    </v-content>
  </v-app>
</template>

<script>
  import intervalJemp from '@/components/intervalJemp/intervalJemp';
  import Chordjemp from "@/components/chordjemp/chordjemp";
  import scaleJemp from "@/components/scaleJemp/scaleJemp";
export default {
  name: 'App',

  components: {
    Chordjemp,
    intervalJemp,
    scaleJemp
  },

  data: () => ({
    //
  }),
};
</script>
