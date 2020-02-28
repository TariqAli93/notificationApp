<template>
<v-app>
    <LoadingComponent v-if="loadingPage" />
    <v-navigation-drawer v-if="loggedIn" v-model="drawer" color="secondary" dark app right class="sidebar_wrapper no-print" width="200">
        <sidebarList />
        <template v-slot:append>
            <div class="pa-4">
                <img :src="logo_src" alt="logoPlaceholder">
            </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar v-if="loggedIn" class="no-print" app elevate-on-scroll color="white">
        <v-btn @click="drawer = !drawer" icon color="secondary">
            <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn v-if="loggedIn" color="secondary" @click="logout()">
            <v-icon color="white">mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>

    <v-content>
        <v-container fluid :class="{'no-padding': !loggedIn, 'small-window': loggedIn}">
            <router-view />
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import sidebarList from '@/components/SidebarList';
import LoadingComponent from '@/components/LoadingComponent'
export default {
    components: {
        sidebarList,
        LoadingComponent
    },
    data() {
        return {
            loadingPage: true,
            drawer: null,
            logo_src: require('@/assets/logo.svg'),
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('LOGOUT');
            this.$router.push('/login')
        }
    },
    mounted() {
        setTimeout(() => {
            this.loadingPage = false;
        }, 2000)
    },

    destroyed() {
        this.loadingPage = true;
    }
}
</script>

<style lang="scss">
.v-application--wrap {
    background-color: #f1f1f1a3;
}

.no-padding {
    padding: 0px !important;
}

.sidebar_wrapper {
    height: 100vh;
    top: unset !important;

    .v-navigation-drawer__content {
        height: 100vh;
    }
}

@media print {

    .no-print,
    .no-print * {
        display: none !important;
    }

    .v-content {
        padding: 0px !important;
    }

    .v-card {
        margin: 0px !important;
        padding: 3px !important;
    }

    .pa-1,
    .pa-2,
    .pa-3,
    .pa-4,
    .pa-5 {
        padding: 0px !important;
    }
    .v-application .pa-3 {
        padding: 0px !important;
    }
}

    // .small-window {
    //     @media (min-width: 960px) {
    //         max-width: 90% !important;
    //     }
    // }
</style>
