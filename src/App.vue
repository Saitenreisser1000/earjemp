<template>
    <v-app>
        <nav>
            <v-toolbar
                    bar
                    dense
                    color="primary"
                    class="white--text"
                    flat
            >
                <v-icon dark @click.stop="drawer = !drawer">menu</v-icon>
                <v-spacer></v-spacer>
                <v-toolbar-title style="float:right">earJEMP</v-toolbar-title>

            </v-toolbar>

        </nav>
        <v-navigation-drawer
                v-model="drawer"
                color="primary"
                absolute
                temporary
                dark
        >
            <v-list
                    dense
                    nav
                    class="py-0"
            >
                <v-list-item two-line :class="px-0">
                    <v-list-item-content>
                        <v-list-item-title>Menu</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :to="item.path"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content class="ma-2 overflow-hidden">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            items: [
                {path: '/', title: 'intervalJEMP', icon: 'mdi-view-dashboard'},
                {path: '/chordJemp', title: 'chordJEMP', icon: 'mdi-image'},
                {path: '/scaleJemp', title: 'scaleJEMP', icon: 'mdi-help-box'}
            ],
            drawer: false
        }),
    };
</script>
<style>
    .button {
        text-transform: none !important;
    }
</style>
