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
                <v-list-item two-line >
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
        <v-overlay :value="soundLoading" :opacity="0.8">loading sounds...</v-overlay>

            <v-content class="ma-2 overflow-hidden background">
                <router-view @setSoundLoaded="setSoundLoaded"></router-view>
            </v-content>

        <v-footer
                color="primary"

        >
            <span style="font-size: 14px; margin-right:5px">proudly presented by &copy;</span> <span class="white--text">JEMPCompany</span><span style="font-size: 14px; margin-left:2px">,2020</span>
        </v-footer>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            items: [
                {path: '/', title: 'intervalJEMP', icon: 'mdi-view-dashboard'},
                {path: '/chordJemp', title: 'chordJEMP', icon: 'format_align_right'},
                {path: '/scaleJemp', title: 'scaleJEMP', icon: 'show_chart'}
            ],
            drawer: false,
            soundLoading: true
        }),
        methods:{
            setSoundLoaded(loading){
                this.soundLoading = loading
            }
        }
    };
</script>
<style>
    .button {
        text-transform: none !important;
    }
    .background{
        background-image: url("../pics/webb.png");
        background-repeat: repeat;
    }
</style>
