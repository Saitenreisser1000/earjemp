<template>
    <v-app class="app-shell">
        <div v-if="orientationLocked" class="orientation-lock-screen">
            <div class="orientation-lock-card">
                <v-icon size="42" color="primary">mdi-cellphone</v-icon>
                <div class="text-h6 mt-2">Bitte auf Hochformat drehen</div>
                <div class="text-body-2 mt-1">earJEMP ist im Portrait-Modus optimiert.</div>
            </div>
        </div>
        <template v-else>
        <nav class="app-nav">
            <v-toolbar
                    height="5vh"
                    color="primary"
                    class="text-white px-4 app-header"
                    flat
            >
                <v-btn icon variant="text" color="white" class="ml-n2" @click.stop="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title style="float:right">earJEMP</v-toolbar-title>

            </v-toolbar>

        </nav>
        <v-navigation-drawer
                v-model="drawer"
                color="primary"
                theme="dark"
                absolute
                temporary
        >
            <v-list
                    dense
                    nav
                    class="py-0"
            >
                <v-list-item two-line >
                    <v-list-item-title>Menu</v-list-item-title>
                </v-list-item>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :title="item.title"
                        :prepend-icon="item.icon"
                        :to="item.path"
                        link
                />
            </v-list>
        </v-navigation-drawer>
        <v-overlay :model-value="soundLoading" :opacity="0.82" class="align-center justify-center">
            <v-sheet rounded="lg" elevation="8" class="pa-4" min-width="280">
                <div class="text-subtitle-2 mb-2">sound load</div>
                <v-progress-linear indeterminate color="primary"></v-progress-linear>
                <div class="text-caption mt-2">{{ soundStatus }}</div>
            </v-sheet>
        </v-overlay>

            <v-main class="overflow-hidden background app-main">
                <router-view @setSoundLoaded="setSoundLoaded" @setSoundStatus="setSoundStatus"></router-view>
            </v-main>

        <v-footer
                color="primary"
                height="5vh"
                class="px-4 d-flex align-center app-footer"
        >
            <span style="font-size: 14px; margin-right:5px">proudly presented by &copy;</span> <span class="text-white">JEMPCompany</span><span style="font-size: 14px; margin-left:2px">,2026</span>
            <v-spacer></v-spacer>
            <span class="mr-2">v.1.1</span>
        </v-footer>
        </template>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            items: [
                {path: '/', title: 'intervalJEMP', icon: 'mdi-view-dashboard'},
                {path: '/chordJemp', title: 'chordJEMP', icon: 'mdi-format-align-right'},
                {path: '/scaleJemp', title: 'scaleJEMP', icon: 'mdi-chart-line'},
                {path: '/melodyJemp', title: 'melodyJEMP', icon: 'mdi-music-note'}
            ],
            drawer: false,
            soundLoading: false,
            soundStatus: 'loading sounds...',
            orientationLocked: false
        }),
        mounted() {
            this.updateOrientationLock()
            window.addEventListener('resize', this.updateOrientationLock, { passive: true })
            window.addEventListener('orientationchange', this.updateOrientationLock, { passive: true })
            this.tryLockPortrait()
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.updateOrientationLock)
            window.removeEventListener('orientationchange', this.updateOrientationLock)
        },
        methods:{
            setSoundLoaded(loading){
                this.soundLoading = loading
            },
            setSoundStatus(status){
                this.soundStatus = status
            },
            updateOrientationLock() {
                if (typeof window === 'undefined') return
                const isLandscape = window.innerWidth > window.innerHeight
                const isSmallScreen = window.innerWidth <= 1024
                this.orientationLocked = isSmallScreen && isLandscape
            },
            async tryLockPortrait() {
                try {
                    if (screen?.orientation?.lock) {
                        await screen.orientation.lock('portrait')
                    }
                } catch (e) {
                    // Ignored: many browsers restrict orientation lock.
                }
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
    .app-shell {
        height: 100vh;
        overflow: hidden;
    }
    .app-nav,
    .app-header,
    .app-footer {
        height: 6vh !important;
        min-height: 5vh !important;
    }
    .app-main {
        height: 90vh !important;
        min-height: 90vh !important;
        box-sizing: border-box;
        padding-top: 10px;
    }
    .orientation-lock-screen {
        position: fixed;
        inset: 0;
        z-index: 3000;
        background: #eceff1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
    }
    .orientation-lock-card {
        background: #fff;
        border-radius: 12px;
        padding: 20px 18px;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
        max-width: 320px;
        width: 100%;
    }
</style>
