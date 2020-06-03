<template>

  <v-app>

    <v-toolbar
    color="primary"
    class="white--text"
    >
      <v-toolbar-title>earJEMP</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
                color="primary"
                v-for="item in menu"
                :key="item.icon"
                :to="item.path"
                depressed
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <!--v-toolbar-side-icon v-slot:"activator="{on}></v-toolbar-side-icon-->
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content class="ma-2">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    menu: [
      { path: '/', title: 'intervalJemp' },
      { path: '/chordJemp',title: 'chordJemp' },
      { path: '/scaleJemp',title: 'scaleJemp' }
    ]
  }),
};
</script>
<style>
  .button{
    text-transform: none !important;
  }
</style>
