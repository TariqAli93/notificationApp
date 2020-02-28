<template>
<v-data-table :search="search" :loading="tableLoading" :headers="headers" :items="desserts" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat color="white" style="margin-top: 30px;">
            <v-toolbar-title>اضافة اشعارات</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark class="mb-2" to="/notifications/add">اضافة اشعار جديد</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container>
            <v-text-field v-model="search"  prepend-inner-icon="mdi-magnify" placeholder="ابحث حسب رقم الاشعار"></v-text-field>
        </v-container>
        <v-divider></v-divider>
    </template>

    <template v-slot:item.date="{ item }">
        {{ formateDate(item.date_one) }}
    </template>

    <template v-if="loggedIn_Role !== 'EMPLOYEE'" v-slot:item.status_slot="{ item }">
        <span v-if="item.status === 0">
            <v-chip label>جديد</v-chip>
        </span>

        <span v-if="item.status === 1">
            <v-chip label color="success">مقبول</v-chip>
        </span>

        <span v-if="item.status === -1">
            <v-chip label color="error">مرفوض</v-chip>
        </span>
    </template>

    <template v-if="loggedIn_Role !== 'User'" v-slot:item.operations="{ item }">
        <v-container>
            <v-btn :disabled="item.status !== 0" small color="primary" @click="confirmNote(item.number_alert)" style="margin-left: 10px;">قبول</v-btn>
            <v-btn :disabled="item.status !== 0" small color="warning" @click="rejectNote(item.number_alert)" style="color: black">رفض</v-btn>
        </v-container>
    </template>

    <template v-if="loggedIn_Role !== 'User'" v-slot:item.action="{ item }">
        <v-container>
            <v-btn :to="`/notifications/show/${item.number_alert}`" small color="secondary">تفاصيل</v-btn>
        </v-container>
    </template>
</v-data-table>
</template>

<script>
import moment from 'moment'
export default {
    name: 'NotisList',
    data() {
        return {
            desserts: [],
            search: '',
            headers: [{
                    text: 'رقم الاشعار',
                    align: 'right',
                    sortable: false,
                    value: 'number_alert',
                },
                {
                    text: 'الفرع',
                    value: 'branch_name_from'
                },
                {
                    text: 'المحافضة',
                    value: 'branch_location'
                },
                {
                    text: 'التاريخ',
                    value: "date",
                    sortable: false,
                },
                {
                    text: 'الحالة',
                    value: 'status_slot'
                },
                {
                    text: 'العمليات',
                    value: 'operations',
                    sortable: false
                },
                {
                    text: 'المزيد',
                    value: 'action',
                    sortable: false
                },
            ],
            tableLoading: true,
            loggedIn_Role: '',
        }
    },

    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.getNotifications();
        this.loggedIn_Role = user.per;
    },

    methods: {
        formateDate(date) {
            return moment(date).format("YYYY-MM-DD")
        },

        getNotifications() {
            let self = this;
            self.axios.post(`alert/showall?take=1000000&skip=0`)
                .then(response => {
                    self.desserts = response.data.result.res;
                    self.tableLoading = false;
                }).catch(error => {
                    console.error(error.response)
                    self.tableLoading = false;
                })
        },

        confirmNote(id) {
            let self = this;
            self.axios.post(`alert/confirmweb`, {
                NoticeNO: id
            }).then(response => {
                console.log(response);
                this.getNotifications();
            }).catch(error => {
                console.error(error)
            })
        },
        
        rejectNote(id) {
            let self = this;
            self.axios.post(`alert/rejectweb`, {
                NoticeNO: id
            }).then(response => {
                console.log(response);
                this.getNotifications();
            }).catch(error => {
                console.error(error.response)
            })
        }
    }
}
</script>

<style>

</style>