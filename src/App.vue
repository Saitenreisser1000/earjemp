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
      <intervallOne></intervallOne>
    </v-content>
  </v-app>
</template>

<script>
  import intervallOne from "@/components/intervallOne";

export default {
  name: 'App',

  components: {
    intervallOne
  },

  data: () => ({
    //
  }),
};
</script>
