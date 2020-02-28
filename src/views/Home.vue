<template>
<div class="home-page">
  <NotisList v-if="loggedIn_Role === 'User'" />
  <userTable v-if="loggedIn_Role === 'ADMIN'" />
</div>
</template>

<script>
import NotisList from '@/views/notifications/List'
import userTable from '@/views/employees/List'
export default {
    name: 'HomePage',
    components: {
        NotisList,
        userTable
    },
    data() {
        return {
            loggedIn_Role: '',
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.loggedIn_Role = user.per;
    }
}
</script>

<style>

</style>
