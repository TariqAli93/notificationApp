<template>
<div>
    <v-data-table :loading="tableLoading" :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white" style="margin-top: 30px;">
                <v-toolbar-title>اضافة المستخدمين</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="addUser()" dark class="mb-2">اضافة مستخدم جديد</v-btn>
            </v-toolbar>

            <v-divider></v-divider>
        </template>

        <template v-slot:item.action="{ item }">
            <v-btn small icon color="primary" :to="`/users/edit/${item.id}`">
                <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>

            <v-btn small icon color="" @click="deactivate(item.id)">
                <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'userTable',
    data: () => {
        return {
            tableLoading: true,
            headers: [{
                    text: 'اسم المستخدم',
                    align: 'right',
                    sortable: false,
                    value: 'username',
                },
                {
                    text: 'الاسم الاول',
                    value: 'firstname'
                },
                {
                    text: 'الاسم الثاني',
                    value: 'lastname'
                },
                {
                    text: 'الفرع',
                    value: 'branch_id'
                },
                {
                    text: 'الصلاحية',
                    value: 'per'
                },
                {
                    text: 'تعديل',
                    value: 'action',
                    sortable: false
                },
            ],
            desserts: [],
            page: 1,
            disableNext: false,
            disablePrev: true,
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            let self = this;
            self.axios.post(`account/show?take=1000000&skip=0`)
                .then(response => {
                    console.log(response)
                    self.tableLoading = false;
                    self.desserts = response.data.result.user.reverse();
                })
                .catch(error => {
                    console.log(error);
                    self.tableLoading = false;
                })
        },
        message(title, icon, text) {
            Swal.fire({
                title: title,
                icon: icon,
                text: text
            });
        },

        confirm() {
            return new Promise((resolve, reject) => {
                Swal.fire({
                    title: 'هل انت واثق ؟',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: this.$vuetify.theme.currentTheme.primary,
                    cancelButtonColor: this.$vuetify.theme.currentTheme.error,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'الغاء'
                }).then((result) => {
                    if (result.value) {
                        resolve(result.value)
                    } else if (result.dismiss === 'cancel') {
                        reject(result.dismiss)
                    }
                })
            })
        },

        addUser() {
            this.$router.push({
                path: '/users/add'
            })
        },

        deactivate(id) {
            let self = this;
            this.confirm().then((s) => {
                self.axios.post(`account/delete?id=${id}`)
                    .then(response => {
                        // this.getUsers();
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error)
                    })
                this.message('تأكيد', 'success', 'تم الحذف بنجاح');
            }).catch(err => {
                this.message('الغاء', 'warning', 'تم الغاء الطلب');
                return false;
            })
        },
    }
}
</script>

<style>

</style>
