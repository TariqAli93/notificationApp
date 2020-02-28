<template>
<v-data-table :loading="tableLoading" :search="search" :headers="headers" :items="desserts" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat color="white" style="margin-top: 30px;">
            <v-toolbar-title>اضافة فروع</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark class="mb-2" to="/branchs/add">اضافة فرع جديد</v-btn>
        </v-toolbar>

        <v-divider></v-divider>
        <v-container>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" placeholder="ابحث حسب رقم الفرع"></v-text-field>
        </v-container>
        <v-divider></v-divider>
    </template>
    <template v-slot:item.action="{ item }">
        <v-btn small icon color="primary" :to="`/branchs/edit/${item.id}`">
            <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>

        <v-btn small icon color="secondary" @click="deactivate(item.id, item)">
            <v-icon color="error">mdi-delete</v-icon>
        </v-btn>
    </template>
</v-data-table>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'branchsList',
    data: () => {
        return {
            tableLoading: true,
            search: '',
            headers: [{
                    text: 'اسم الفرع',
                    align: 'right',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'رقم الفرع',
                    value: 'number_branch'
                },
                {
                    text: 'المحافظة',
                    value: 'location'
                },
                {
                    text: 'تعديل',
                    value: 'action',
                    sortable: false
                },
            ],
            desserts: [],
        }
    },

    mounted() {
        this.getNotis();
    },

    methods: {
        getNotis() {
            let self = this;
            self.axios.post(`branch/show`)
                .then(response => {
                    self.tableLoading = false;
                    self.desserts = response.data.result.branch.reverse();
                })
                .catch(error => {
                    self.tableLoading = false;
                    console.error(error)
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

        deactivate(id, index) {
            let self = this;
            this.confirm().then((s) => {
                self.axios.post(`branch/delete?id=${id}`)
                    .then(response => {
                        this.getNotis();
                    })
                    .catch(error => {
                        console.error(error)
                    })
                this.message('تأكيد', 'success', 'تم الحذف بنجاح');
            }).catch(err => {
                this.message('الغاء', 'warning', 'تم الغاء الطلب');
                return false;
            })
        }
    }
}
</script>
