<template>
    <v-app class="app-shell" :class="{ 'is-ready': pageReady }">
        <div v-if="orientationLocked" class="orientation-lock-screen">
            <div class="orientation-lock-card">
                <v-icon size="42" color="primary">mdi-cellphone</v-icon>
                <div class="text-h6 mt-2">Bitte auf Hochformat drehen</div>
                <div class="text-body-2 mt-1">earJEMP ist im Portrait-Modus optimiert.</div>
                <div class="text-caption mt-2">Nach dem Drehen geht es automatisch weiter.</div>
            </div>
        </div>
        <template v-else>
        <nav class="app-nav app-chrome-enter">
            <v-toolbar
                    height="56"
                    color="primary"
                    class="text-white px-4 app-header"
                    flat
            >
                <v-btn
                    icon
                    variant="text"
                    color="white"
                    class="ml-n2"
                    aria-label="Navigation öffnen"
                    @click.stop="drawer = !drawer"
                >
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="app-title">earJEMP</v-toolbar-title>

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
                <v-list-item two-line class="drawer-title-row">
                    <v-list-item-title>Menu</v-list-item-title>
                </v-list-item>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        :title="item.title"
                        :prepend-icon="item.icon"
                        :to="item.path"
                        link
                        class="drawer-link"
                        @click="drawer = false"
                />
            </v-list>
        </v-navigation-drawer>
        <v-overlay :model-value="soundLoading" :opacity="0.82" class="align-center justify-center">
            <v-sheet rounded="lg" elevation="8" class="pa-4 motion-card loading-card" min-width="280">
                <div class="text-subtitle-2 mb-2">Sounds werden geladen</div>
                <v-progress-linear indeterminate color="primary"></v-progress-linear>
                <div class="text-caption mt-2">{{ soundStatus }}</div>
            </v-sheet>
        </v-overlay>

            <v-main class="overflow-hidden background app-main">
                <router-view v-slot="{ Component, route }">
                    <transition name="route-fade-slide" mode="out-in">
                        <component
                            :is="Component"
                            :key="route.fullPath"
                            class="route-frame"
                            @setSoundLoaded="setSoundLoaded"
                            @setSoundStatus="setSoundStatus"
                        />
                    </transition>
                </router-view>
            </v-main>

        <v-footer
                color="primary"
                height="56"
                class="px-4 d-flex align-center app-footer app-chrome-enter"
        >
            <span class="footer-note">proudly presented by &copy;</span>
            <span class="text-white footer-brand">JEMPCompany</span>
            <span class="footer-note">,2026</span>
            <v-spacer></v-spacer>
            <span class="mr-2 footer-version">v.1.1</span>
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
            orientationLocked: false,
            pageReady: false
        }),
        mounted() {
            this.updateOrientationLock()
            window.addEventListener('resize', this.updateOrientationLock, { passive: true })
            window.addEventListener('orientationchange', this.updateOrientationLock, { passive: true })
            this.tryLockPortrait()
            requestAnimationFrame(() => {
                this.pageReady = true
            })
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
                    const orientation = window?.screen?.orientation
                    if (orientation?.lock) {
                        await orientation.lock('portrait')
                    }
                } catch (e) {
                    // Ignored: many browsers restrict orientation lock.
                }
            }
        }
    };
</script>
<style>
    :root {
        --motion-ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
        --motion-ease-exit: cubic-bezier(0.4, 0, 1, 1);
        --motion-ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
        --motion-duration-fast: 140ms;
        --motion-duration-base: 220ms;
        --motion-duration-slow: 320ms;
        --tone-top: #eef4f8;
        --tone-bottom: #d8e6f2;
    }
    html,
    body,
    #app {
        font-family: "Avenir Next", "Nunito Sans", "Segoe UI", sans-serif;
        background: linear-gradient(180deg, var(--tone-top), var(--tone-bottom));
    }
    .button {
        text-transform: none !important;
    }
    .background{
        background-image: url("../pics/webb.png");
        background-repeat: repeat;
    }
    .app-shell {
        height: 100svh;
        overflow: hidden;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity var(--motion-duration-slow) var(--motion-ease-entrance),
        transform var(--motion-duration-slow) var(--motion-ease-entrance);
    }
    .app-shell.is-ready {
        opacity: 1;
        transform: translateY(0);
    }
    .app-nav,
    .app-header,
    .app-footer {
        height: clamp(48px, 6vh, 58px) !important;
        min-height: clamp(48px, 5vh, 58px) !important;
        backdrop-filter: saturate(110%) blur(2px);
        transition: background-color var(--motion-duration-base) var(--motion-ease-standard);
    }
    .app-title {
        letter-spacing: 0.04em;
        font-weight: 700;
    }
    .app-chrome-enter {
        animation: chrome-in var(--motion-duration-slow) var(--motion-ease-entrance);
    }
    .app-main {
        height: calc(100svh - clamp(96px, 12vh, 116px)) !important;
        min-height: calc(100svh - clamp(96px, 12vh, 116px)) !important;
        box-sizing: border-box;
        padding-top: 12px;
    }
    .route-frame {
        will-change: transform, opacity;
    }
    .route-fade-slide-enter-active {
        transition: opacity var(--motion-duration-slow) var(--motion-ease-standard),
        transform var(--motion-duration-slow) var(--motion-ease-standard);
    }
    .route-fade-slide-leave-active {
        transition: opacity var(--motion-duration-fast) var(--motion-ease-exit),
        transform var(--motion-duration-fast) var(--motion-ease-exit);
    }
    .route-fade-slide-enter-from,
    .route-fade-slide-leave-to {
        opacity: 0;
        transform: translateY(10px) scale(0.99);
    }
    .motion-card {
        border: 1px solid rgba(25, 118, 210, 0.1);
        box-shadow: 0 10px 24px rgba(26, 35, 126, 0.16), 0 2px 8px rgba(15, 23, 42, 0.12) !important;
        transform-origin: top center;
        animation: card-in var(--motion-duration-slow) var(--motion-ease-entrance);
        will-change: transform, opacity;
    }
    .loading-card {
        background: linear-gradient(145deg, #f9fcff 0%, #f2f7fb 100%);
        border: 1px solid rgba(25, 118, 210, 0.14);
    }
    .drawer-title-row {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 4px;
    }
    .drawer-link {
        transition: transform var(--motion-duration-fast) var(--motion-ease-standard),
        background-color var(--motion-duration-fast) var(--motion-ease-standard);
    }
    .drawer-link:hover {
        transform: translateX(3px);
    }
    @keyframes card-in {
        from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    @keyframes chrome-in {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .footer-note {
        font-size: 14px;
    }
    .footer-brand {
        margin: 0 2px 0 5px;
        letter-spacing: 0.03em;
        font-weight: 600;
    }
    .footer-version {
        letter-spacing: 0.04em;
    }
    .orientation-lock-screen {
        position: fixed;
        inset: 0;
        z-index: 3000;
        background: radial-gradient(circle at 20% 20%, #f4f8fc 0%, #e2edf6 55%, #d8e6f2 100%);
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
    @media (prefers-reduced-motion: reduce) {
        .app-shell,
        .route-fade-slide-enter-active,
        .route-fade-slide-leave-active,
        .motion-card,
        .app-chrome-enter,
        .app-header,
        .app-footer {
            animation: none !important;
            transition: none !important;
        }
    }
    @media (max-width: 600px) {
        .app-title {
            font-size: 1rem !important;
        }
        .footer-note {
            font-size: 12px;
        }
    }
</style>
