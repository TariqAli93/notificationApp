<template>
<v-card elevation>
    <template>
        <v-app-bar color="transparent" elevation="0">
            <span>تحديث مستخدم</span>
            <v-spacer></v-spacer>
            <v-btn color="secondary" icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
    </template>

    <v-form v-model="update_editUserForm" :loading="formLoading" ref="update_editUserForm" @submit.prevent="update(uid)">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="update_input_rule" v-model="update_username_value" value="update_username_value" required label="اسم المستخدم" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="update_input_rule" v-model="update_first_name_value" value="update_first_name_value" required label="الاسم الاول" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field :rules="update_input_rule" v-model="update_last_name_value" value="update_last_name_value" required label="الاسم الثاني" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-select :rules="update_input_rule" v-model="update_role_value" :items="update_role_list_value" item-text="name" item-value="id" required label="الصلاحيات" :value="update_role_value"></v-select>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-select :rules="update_input_rule" v-model="update_branch_value" :items="update_branch_list_value" item-text="name" item-value="id" required label="الفرع" :value="update_branch_value"></v-select>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field type="password" :rules="update_input_rule" v-model="new_password_value" value="new_password_value" required label="كلمة المرور الجديدة" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field type="password" :rules="update_input_rule" v-model="old_password_value" value="old_password_value" required label="كلمة المرور القديمة" clearable></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-btn color="secondary" type="submit" block @click.prevent="update(uid)">
                        تحديث
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</v-card>
</template>

<script>;
export default {
    data() {
        return {
            uid: this.$route.params.id,
            update_editUserForm: '',
            update_username_value: '',
            update_first_name_value: '',
            update_last_name_value: '',
            new_password_value: '',
            old_password_value: '',
            update_branch_value: '',
            update_branch_list_value: [],
            update_role_value: '',
            update_role_list_value: [{
                    id: 'ADMIN',
                    name: 'ادمن'
                },
                {
                    id: 'User',
                    name: 'موظف فرع'
                },
                {
                    id: 'EMPLOYEE',
                    name: 'موظف فرع رئيسي'
                }
            ],
            update_input_rule: [
                v => !!v || 'حقل مطلوب ! يرجى عدم ترك هذا الحقل فارغ'
            ],
            formLoading: true
        };
    },

    mounted() {
        let self = this;
        self.axios.post(`account/show`)
        .then(response => {
            console.log(response)
            let filterUser = response.data.result.user.find(user => user.id === self.uid);
            self.update_username_value = filterUser.username;
            self.update_first_name_value = filterUser.firstname;
            self.update_last_name_value = filterUser.lastname;
        }).catch(error => {
            console.error(error);
        });

        self.axios.post(`branch/show`)
        .then(response => {
            self.update_branch_list_value = response.data.result.branch;
        }).catch(error => {
            console.error(error);
            this.message('خطأ في جلب البيانات', 'warning', 'حدث خطأ في جلب البيانات');
        })
    },

    methods: {
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
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        resolve(result.value);
                    } else if (result.dismiss === 'cancel') {
                        reject(result.dismiss);
                    }
                });
            });
        },

        update(id) {
            let user_id = id;
            let self = this;
            let object = {
                Username: self.update_username_value,
                NewPassword: self.new_password_value,
                OldPassword: self.old_password_value,
                FirstName: self.update_first_name_value,
                LastName: self.update_last_name_value,
                Permissions: [self.update_role_value],
                branch_id: self.update_branch_value,
            };

            console.log(object)
            self.axios.post(`account/edit?id=${id}`, object, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                this.message('تمت الاضافة', 'success', 'تم اضافة المستخدم بنجاح');
                this.$refs.update_editUserForm.reset();
            }).catch(error => {
                console.error(error);
                if(error.response.data.code === 400.2) {
                    this.message('خطأ في الاضافة', 'warning', 'اسم المستخدم موجود مسبقا');
                }
            });
        }
    }
}
</script>

<style>

</style>
