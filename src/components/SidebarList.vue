<template>
<div class="list_sidebar">
    <v-app-bar color="primary" flat>
        <div class="nav-logo">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{username}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ role }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <!-- <img :src="logo_src" alt="logoPlaceholder"> -->
        </div>
    </v-app-bar>

    <v-list nav>
        <v-list-item-group v-model="list_item_wrapper" color="primary">
            <v-list-item v-for="(item, i) in list_item_links" :key="i" v-if="loggedIn_Role === item.show || loggedIn_Role === item.show_emp" :to="item.path" exact exact-active-class="active">
                <div v-if="loggedIn_Role === item.show || loggedIn_Role === item.show_emp">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </div>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</div>
</template>

<script>
export default {
    name: 'sidebarList',
    data: () => {
        return {
            list_item_wrapper: null,
            user: '',
            username: '',
            role: '',
            loggedIn_Role: '',
            list_item_links: [{
                    name: 'الرئيسية',
                    path: '/',
                    icon: 'mdi-home',
                    show: 'ADMIN',
                    show_emp: 'ADMIN'
                },

                {
                    name: 'المستخدمين',
                    path: '/users',
                    icon: 'mdi-account-group',
                    show: 'ADMIN',
                    show_emp: 'ADMIN'
                },

                {
                    name: 'الفروع',
                    path: '/branchs',
                    icon: 'mdi-domain',
                    show: 'ADMIN',
                    show_emp: 'ADMIN'
                },

                {
                    name: 'الاشعارات',
                    path: '/notifications',
                    icon: 'mdi-bell',
                    show: 'User',
                    show_emp: 'ADMIN'
                }
            ]
        }
    },

    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.username = this.user.fullName;
        this.role = this.user.per

        this.loggedIn_Role = this.user.per;
    }
}
</script>

<style lang="scss">
.list_sidebar {

    .theme--dark.v-list-item--active:before,
    .theme--dark.v-list-item--active:hover:before,
    .theme--dark.v-list-item:focus:before {
        opacity: 1;
    }

    .v-list-item {
        display: block !important;
        text-align: center;

        &:not(:last-child) {
            margin-bottom: 30px;
        }

        .v-list-item__icon {
            margin: 0px !important;

            i {
                font-size: 35px;
                margin-top: 10px;
                color: white !important;
            }
        }

        .v-list-item__content,
        .v-list-item__icon {
            position: relative;
            z-index: 20;
            color: white !important;
        }
    }

    .nav-logo {
        display: block;
        text-align: center;
        width: 100%;

        img {
            display: block;
            width: 50px;
            margin-left: 20px;
            margin: 0 auto;
        }
    }
}
</style>
